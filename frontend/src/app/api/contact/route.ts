import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic in-memory rate limiter (not persistent across restarts/lambdas)
const rateLimitMap = new Map<string, { count: number; lastTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, mobile, message, _honeypot } = body;

        // 1. Anti-Spam: Honeypot
        if (_honeypot) {
            // Silently fail (pretend success) to fool bots
            return NextResponse.json({ ok: true });
        }

        // 2. Validation
        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
        }

        // 3. Rate Limiting (IP based - rudimentary)
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const userRate = rateLimitMap.get(ip) || { count: 0, lastTime: now };

        if (now - userRate.lastTime > RATE_LIMIT_WINDOW) {
            // Reset if window passed
            userRate.count = 1;
            userRate.lastTime = now;
        } else {
            userRate.count++;
        }
        rateLimitMap.set(ip, userRate);

        if (userRate.count > MAX_REQUESTS) {
            return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
        }

        // 4. Send Admin Email
        const adminEmail = process.env.ADMIN_CONTACT_EMAIL || 'dhruv.monkeyads@gmail.com';

        await resend.emails.send({
            from: 'Monkey Casting Contact <onboarding@resend.dev>', // Use validated domain if available, else default resend test domain
            to: adminEmail,
            subject: `New Contact Form: ${name}`,
            html: `
                <h2>New Contact Inquiry</h2>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr><td width="30%"><strong>Name</strong></td><td>${name}</td></tr>
                    <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                    <tr><td><strong>Mobile</strong></td><td>${mobile || 'N/A'}</td></tr>
                    <tr><td><strong>Message</strong></td><td>${message}</td></tr>
                </table>
            `
        });

        // 5. Send User Auto-Reply
        await resend.emails.send({
            from: 'Monkey Casting <onboarding@resend.dev>',
            to: email, // If using Resend "Free" tier, you can only send to your own verified email. This might fail for random users unless domain is verified.
            subject: 'We received your message!',
            html: `
                <h3>Hi ${name},</h3>
                <p>Thank you for reaching out to Monkey Casting.</p>
                <p>We have received your message and will get back to you shortly.</p>
                <br/>
                <p>Best regards,<br/>Monkey Casting Team</p>
            `
        });

        return NextResponse.json({ ok: true });

    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Server error' }, { status: 500 });
    }
}
