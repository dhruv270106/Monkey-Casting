'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import styles from '../admin.module.css'
import { Trash2, Loader2, Mail } from 'lucide-react'

interface ContactSubmission {
    id: string
    name: string
    mobile: string
    email: string
    message: string
    created_at: string
}

export default function ContactSubmissionsPage() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSubmissions()
    }, [])

    const fetchSubmissions = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching submissions:', error)
        } else if (data) {
            setSubmissions(data)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this submission?')) return

        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Error deleting submission')
            console.error(error)
        } else {
            setSubmissions(prev => prev.filter(s => s.id !== id))
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /> Loading...</div>

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Contact Form Submissions</h1>
            </div>

            <div className={styles.tableContainer}>
                {submissions.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                        No submissions yet.
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th style={{ width: '40%' }}>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => (
                                    <tr key={sub.id}>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            {new Date(sub.created_at).toLocaleString()}
                                        </td>
                                        <td>{sub.name}</td>
                                        <td>{sub.mobile || '-'}</td>
                                        <td>
                                            <a href={`mailto:${sub.email}`} className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Mail size={14} /> {sub.email}
                                            </a>
                                        </td>
                                        <td>
                                            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                {sub.message}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
