'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from '@/components/Form.module.css'
import { supabase } from '@/lib/supabaseClient'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // States
    const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE')
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cooldown, setCooldown] = useState(0)

    // Timer for resend cooldown
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [cooldown])

    // Helper: Mask Mobile
    const getMaskedMobile = (num: string) => {
        if (!num || num.length < 4) return num
        // Shows "+91 •••• ••1234" style
        // Assuming min length 10. 
        const visibleEnd = num.slice(-4)
        const visibleStart = num.slice(0, 3) // e.g. +91
        return `${visibleStart} •••• ••${visibleEnd}`
    }

    const validateMobile = (num: string) => {
        // Basic check: must be at least 10 digits
        // If user didn't add country code, we will duplicate it for sending but keep input clean?
        // Let's normalize to E.164
        let cleaned = num.replace(/\D/g, '') // remove non-digits

        // Assumption: If length is 10, add 91 (India default per project context)
        if (cleaned.length === 10) {
            return `+91${cleaned}`
        }
        // If length is 12 and starts with 91
        if (cleaned.length === 12 && cleaned.startsWith('91')) {
            return `+${cleaned}`
        }
        // If it's something else, return with + and hope it's right or fail
        return `+${cleaned}`
    }

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const formattedMobile = validateMobile(mobile)

            // Supabase Sign In with OTP
            const { error } = await supabase.auth.signInWithOtp({
                phone: formattedMobile,
            })

            if (error) throw error

            // Success
            setStep('OTP')
            setCooldown(60) // 60 seconds cooldown
            setError(null)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to send OTP')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const formattedMobile = validateMobile(mobile)

            const { data, error } = await supabase.auth.verifyOtp({
                phone: formattedMobile,
                token: otp,
                type: 'sms'
            })

            if (error) throw error

            // Login Scucess
            router.push('/dashboard')
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Invalid OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (cooldown > 0) return

        // Re-trigger send
        // Note: We simulate the event
        handleSendOtp({ preventDefault: () => { } } as React.FormEvent)
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    {step === 'MOBILE' ? 'Welcome Back' : 'Verify OTP'}
                </h1>
                <p className={styles.subtitle}>
                    {step === 'MOBILE'
                        ? 'Enter your mobile number to login'
                        : `Enter the OTP sent to ${getMaskedMobile(validateMobile(mobile))}`
                    }
                </p>

                {error && <div className={styles.error}>{error}</div>}

                {step === 'MOBILE' ? (
                    <form onSubmit={handleSendOtp}>
                        <div className={styles.formGroup}>
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                style={{ fontSize: '1.2rem', padding: '12px' }}
                            />
                            <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '5px' }}>
                                We will send a one-time password to this number.
                            </small>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className={styles.formGroup}>
                            <label>One-Time Password</label>
                            <input
                                type="text"
                                placeholder="123456"
                                maxLength={6}
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                style={{ fontSize: '1.5rem', letterSpacing: '8px', textAlign: 'center', padding: '12px' }}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            {cooldown > 0 ? (
                                <span style={{ color: 'var(--text-muted)' }}>Resend OTP in {cooldown}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={() => { setStep('MOBILE'); setOtp(''); setError(null); }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                Change Mobile Number
                            </button>
                        </div>
                    </form>
                )}

                <div className={styles.footer}>
                    Don't have an account? <Link href="/register" className={styles.link}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}
