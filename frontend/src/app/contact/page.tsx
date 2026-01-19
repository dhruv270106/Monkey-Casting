'use client'

import styles from '@/components/Form.module.css'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function Contact() {
    const [submitting, setSubmitting] = useState(false);

    return (
        <>
            <div style={{ width: '100%', height: '600px', marginBottom: '60px' }}>
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Monkey%20Ads%2C%20A-607%20Swastik%20Universal%2C%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="Office Location"
                ></iframe>
            </div>

            <div className="container section" style={{ paddingBottom: '100px' }}>
                <div className={styles.card} style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--secondary)' }}>Get in Touch</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                        Have questions? We'd love to hear from you.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>

                        <div style={{ flex: '1 1 400px' }}>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const formData = new FormData(form);

                                    const name = formData.get('name') as string;
                                    const email = formData.get('email') as string;
                                    const mobile = formData.get('mobile') as string;
                                    const message = formData.get('message') as string;
                                    const honeypot = formData.get('_honeypot') as string;

                                    if (honeypot) return; // Silent fail for bots

                                    setSubmitting(true);

                                    try {
                                        // 1. Save to Database (backup)
                                        const { error: dbError } = await supabase
                                            .from('contact_submissions')
                                            .insert([{ name, email, mobile, message }]);

                                        if (dbError) console.error("DB Save Error", dbError);

                                        // 2. Send via API
                                        const res = await fetch('/api/contact', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name, email, mobile, message })
                                        });

                                        const data = await res.json();

                                        if (res.ok && data.ok) {
                                            alert("Message sent successfully!");
                                            form.reset();
                                        } else {
                                            throw new Error(data.error || "Failed to send message");
                                        }

                                    } catch (err: any) {
                                        console.error(err);
                                        alert("Error: " + err.message);
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {/* Honeypot Field */}
                                <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                                <div className={styles.formGroup}>
                                    <label>Name</label>
                                    <input name="name" type="text" placeholder="Your Name" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mobile No</label>
                                    <input name="mobile" type="tel" placeholder="Your Mobile Number" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input name="email" type="email" placeholder="Your Email" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Message</label>
                                    <textarea name="message" rows={5} placeholder="How can we help?" required></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Office Address</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    A-607, Swastik Universal, Besides Valentine Multiplex, <br />
                                    Opp. Rahul Raj Mall, Surat-Dumas Road, Piplod,<br />
                                    Surat - 395007 India<br />
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Contact Info</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Email: grow@monkeyads.in<br />
                                    Phone: +91 98255 17260<br />
                                    Phone2: +91 90164 75421
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Working Hours</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Mon - Fri: 10:00 AM - 7:00 PM<br />
                                    Sat - sun: Closed
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
