'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import styles from '../admin.module.css'
import { Save, ExternalLink, Trash2, Plus, MonitorPlay, Video } from 'lucide-react'

export default function AdminFeedbackPage() {
    const [videos, setVideos] = useState<any[]>([])
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [newVideoUrl, setNewVideoUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [addingVideo, setAddingVideo] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        await Promise.all([fetchVideos(), fetchFeedbacks()])
        setLoading(false)
    }

    const fetchVideos = async () => {
        const { data } = await supabase
            .from('feedback_videos')
            .select('*')
            .order('created_at', { ascending: true })

        if (data) setVideos(data)
    }

    const fetchFeedbacks = async () => {
        // Get Feedbacks with user details AND video details
        const { data: fbData, error } = await supabase
            .from('video_feedback')
            .select(`
                *,
                users (
                    name,
                    email,
                    mobile,
                    talent_profiles (
                        id,
                        category
                    )
                ),
                feedback_videos (
                    video_url
                )
            `)
            .order('created_at', { ascending: false })

        if (fbData) setFeedbacks(fbData)
        if (error) {
            console.error("Error fetching feedbacks:", error)
            if (typeof error === 'object' && error !== null) {
                console.error("Error Details:", JSON.stringify(error, null, 2));
            }
        }
    }

    const handleAddVideo = async () => {
        if (!newVideoUrl.trim()) return;
        setAddingVideo(true)

        const { error } = await supabase
            .from('feedback_videos')
            .insert([{ video_url: newVideoUrl.trim() }])

        if (error) {
            alert(`Error adding video: ${error.message}`)
        } else {
            setNewVideoUrl('')
            fetchVideos() // Refresh list
        }
        setAddingVideo(false)
    }

    const handleDeleteVideo = async (id: string) => {
        if (!confirm('Are you sure? This will delete the video and potentially hide its feedback from the main view.')) return;

        const { error } = await supabase
            .from('feedback_videos')
            .delete()
            .eq('id', id)

        if (error) {
            alert(`Error deleting video: ${error.message}`)
        } else {
            fetchVideos()
        }
    }

    const handleDeleteFeedback = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feedback permanently?')) return;

        const { error } = await supabase
            .from('video_feedback')
            .delete()
            .eq('id', id)

        if (error) {
            alert(`Error deleting feedback: ${error.message}`)
        } else {
            setFeedbacks(prev => prev.filter(item => item.id !== id))
        }
    }

    // Helper to get thumbnail
    const getThumbnail = (url: string) => {
        if (!url) return null;
        try {
            let videoId = '';
            if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
            else if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
            else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0];

            if (videoId) return `https://img.youtube.com/vi/${videoId}/default.jpg`;
        } catch (e) { }
        return null; // or default placeholder
    }

    if (loading) return <div className={styles.mainContent}>Loading...</div>

    return (
        <div style={{ paddingBottom: '40px' }}>
            <div className={styles.header}>
                <h1 className={styles.title}>Feedback Management</h1>
            </div>

            {/* Video Management Section */}
            <div className={styles.card} style={{ marginBottom: '2rem' }}>
                <h2 className={styles.cardLabel} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MonitorPlay size={20} /> Manage Feedback Videos
                </h2>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        placeholder="Add new YouTube URL..."
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minWidth: '300px' }}
                    />
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAddVideo} disabled={addingVideo}>
                        <Plus size={18} /> {addingVideo ? 'Adding...' : 'Add Video'}
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {videos.map(video => {
                        const thumb = getThumbnail(video.video_url);
                        return (
                            <div key={video.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', background: '#f9fafb' }}>
                                <div style={{ height: '120px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    {thumb ? (
                                        <img src={thumb} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <Video size={30} color="#fff" />
                                    )}
                                    <a href={video.video_url} target="_blank" rel="noreferrer" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: '#fff', opacity: 0, transition: 'opacity 0.2s' }} className="hover:opacity-100">
                                        <ExternalLink />
                                    </a>
                                </div>
                                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                                        {video.video_url}
                                    </span>
                                    <button onClick={() => handleDeleteVideo(video.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Feedback List Table */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <div className={styles.tableTitle}>All Feedback Submissions ({feedbacks.length})</div>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Video Context</th>
                            <th>User Name</th>
                            <th>Category</th>
                            <th>Feedback</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(fb => {
                            const userTP = fb.users?.talent_profiles;
                            const talentProfile = Array.isArray(userTP) ? userTP[0] : userTP;
                            const talentId = talentProfile?.id;
                            const category = talentProfile?.category || 'N/A';

                            // Handling video details from join or fallback
                            const videoUrl = fb.feedback_videos?.video_url || fb.video_url; // Fallback to flat column if join empty
                            const thumb = getThumbnail(videoUrl);

                            return (
                                <tr key={fb.id}>
                                    <td style={{ width: '120px' }}>
                                        {thumb ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <img src={thumb} alt="REF" style={{ width: '80px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: '0.8rem', color: '#999' }}>No Video</span>
                                        )}
                                        {videoUrl && <a href={videoUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', display: 'block', marginTop: '4px', color: '#4f46e5' }}>View Video</a>}
                                    </td>
                                    <td>
                                        {talentId ? (
                                            <a href={`/talent/${talentId}`} target="_blank" className={styles.link} style={{ fontWeight: 700, color: '#4f46e5', textDecoration: 'underline' }}>
                                                {fb.users?.name || 'Unknown'}
                                            </a>
                                        ) : (
                                            <div style={{ fontWeight: 600 }}>{fb.users?.name || 'Unknown'}</div>
                                        )}
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{fb.users?.mobile}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{fb.users?.email}</div>
                                    </td>
                                    <td>
                                        <span className={styles.badge}>{category}</span>
                                    </td>
                                    <td>
                                        <div style={{
                                            whiteSpace: 'pre-wrap',
                                            maxWidth: '400px',
                                            fontSize: '0.9rem',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'anywhere',
                                            backgroundColor: '#f9fafb',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #e5e7eb'
                                        }}>
                                            {fb.comment}
                                        </div>
                                    </td>
                                    <td>
                                        {new Date(fb.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteFeedback(fb.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        {feedbacks.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No feedback found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
