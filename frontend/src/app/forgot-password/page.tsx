'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import styles from '@/components/Form.module.css'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            // Use explicitly defined site URL if available, otherwise fallback to current origin
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${siteUrl}/reset-password`,
            })

            if (error) {
                // Determine if it's a rate limit or other error
                if (error.message.includes('Rate limit')) {
                    throw new Error('Too many requests. Please try again later.')
                }
                throw error
            }

            setMessage('Password reset link has been sent to your email.')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <div className={styles.card} style={{ maxWidth: '400px', width: '100%' }}>
                <Link href="/login" className="btn btn-outline btn-sm" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', border: 'none', paddingLeft: 0 }}>
                    <ArrowLeft size={16} style={{ marginRight: '5px' }} /> Back to Login
                </Link>

                <h1 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '10px' }}>Forgot Password?</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Enter your registered email address and we'll send you a link to reset your password.
                </p>

                {error && <div style={{ color: '#ef4444', marginBottom: '15px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}
                {message && <div style={{ color: '#10b981', marginBottom: '15px', padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>{message}</div>}

                <form onSubmit={handleReset}>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                        {loading ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    )
}
