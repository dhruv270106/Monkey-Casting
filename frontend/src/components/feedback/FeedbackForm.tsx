'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Send, CheckCircle, Edit2, Loader2 } from 'lucide-react'
import styles from './Feedback.module.css'

interface FeedbackFormProps {
    videoId: string
    userId: string
}

export default function FeedbackForm({ videoId, userId }: FeedbackFormProps) {
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return

        setIsSubmitting(true)
        setMessage('')

        try {
            const feedbackData = {
                user_id: userId,
                video_id: videoId,
                comment: comment,
                video_url: 'deprecated'
            }

            const { error } = await supabase
                .from('video_feedback')
                .insert([feedbackData])

            if (error) throw error

            setComment('') // Clear the form
            setMessage('Feedback saved successfully!')
            setTimeout(() => setMessage(''), 3000)

        } catch (err: any) {
            console.error('Error saving feedback:', err)
            if (typeof err === 'object' && err !== null) {
                console.error('Error Details:', JSON.stringify(err, null, 2));
            }
            setMessage('Error: ' + (err.message || 'Unknown error occurred'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Your Feedback</h3>
            <p className={styles.question}>
                According to you, what improvements or changes can be made to make this better?
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                    className={styles.textarea}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    disabled={isSubmitting}
                />

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting || !comment.trim()}
                    >
                        {isSubmitting ? 'Saving...' : 'Submit Feedback'}
                        {!isSubmitting && <Send size={16} className="ml-2" />}
                    </button>
                </div>

                {message && (
                    <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}
