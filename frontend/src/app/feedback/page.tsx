'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import VideoFeedbackItem from '@/components/feedback/VideoFeedbackItem'
import { Loader2 } from 'lucide-react'

// Define the Video interface
interface Video {
    id: string
    video_url: string
}

export default function FeedbackPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [videos, setVideos] = useState<Video[]>([])
    const [pageLoading, setPageLoading] = useState(true)
    const [error, setError] = useState('')

    // Auth Protection
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    // Fetch Videos
    useEffect(() => {
        if (user) {
            fetchVideos()
        }
    }, [user])

    const fetchVideos = async () => {
        try {
            // Fetch active videos from the new table
            const { data, error } = await supabase
                .from('feedback_videos')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: true }) // Put oldest first or order by a display_order column if added

            if (error) {
                // Determine if it's a "table not found" error
                if (error.code === '42P01') { // undefined_table
                    console.warn("Table feedback_videos not found. Falling back to admin_settings compatibility mode or showing empty.");
                }
                throw error;
            }

            if (data && data.length > 0) {
                setVideos(data)
            } else {
                // Fallback or just empty
                // If we want to support the old method temporarily (via admin_settings):
                // We'd have to synthesise IDs. But let's assume usage of the new system.
            }

        } catch (err: any) {
            console.error('Error fetching videos:', err)
            // setError('Unable to load feedback videos. Please try again later.')
        } finally {
            setPageLoading(false)
        }
    }

    if (loading || pageLoading) {
        return <div className="h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin" size={40} /></div>
    }

    if (!user) return null

    if (videos.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center text-white flex-col gap-4">
                <h2 className="text-2xl font-bold">No Videos Available</h2>
                <p className="text-gray-400">There are currently no videos open for feedback.</p>
            </div>
        )
    }

    return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {videos.map((video) => (
                <VideoFeedbackItem
                    key={video.id}
                    video={video}
                    userId={user.id}
                />
            ))}
        </div>
    )
}
