import styles from './Feedback.module.css'
import FeedbackForm from './FeedbackForm'

interface Video {
    id: string
    video_url: string
}

interface VideoFeedbackItemProps {
    video: Video
    userId: string
}

export default function VideoFeedbackItem({ video, userId }: VideoFeedbackItemProps) {

    // Helper to get embed URL
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('embed')) return url;

        // Handle various youtube formats
        let id = '';
        if (url.includes('youtu.be/')) {
            id = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('v=')) {
            id = url.split('v=')[1].split('&')[0];
        }

        if (id) {
            return `https://www.youtube.com/embed/${id}`;
        }
        return url;
    }

    const embedUrl = getEmbedUrl(video.video_url);

    return (
        <div className={styles.itemContainer}>
            {/* Left: Video 75% */}
            <div className={styles.videoWrapper}>
                <iframe
                    src={`${embedUrl}?modestbranding=1&rel=0&showinfo=0&controls=0`}
                    title="Feedback Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                />
            </div>

            {/* Right: Feedback Form 25% */}
            <div className={styles.formWrapper}>
                <FeedbackForm videoId={video.id} userId={userId} />
            </div>
        </div>
    )
}
