'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './SocialCinemaIntro.module.css'

export default function SocialCinemaIntro() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={`${styles.imageWrapper} animate-fade-in`}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/social_cinema_intro.png"
                        alt="Social Cinema Casting - Diverse group of talent"
                        width={600}
                        height={400}
                        className={styles.image}
                        priority
                    />
                </motion.div>

                <motion.div
                    className={styles.content}
                >
                    <h2 className={styles.title}>What is Social Cinema Star Casting</h2>

                    <div className={styles.description}>
                        <p className="mb-4">
                            Social Cinema™ Star Casting is an open casting platform for:
                        </p>
                        <ul className={styles.highlightList}>
                            <li className={styles.highlightItem}>Actors</li>
                            <li className={styles.highlightItem}>Models</li>
                            <li className={styles.highlightItem}>Performers</li>
                            <li className={styles.highlightItem}>Fresh faces</li>
                        </ul>
                        <p className="mt-4 font-medium text-lg">
                            Real people with real presence.
                        </p>

                        <p className="mt-6">
                            Here, talent is not judged by followers.
                            It is recognized by expression, authenticity, and screen presence.
                        </p>

                        <div className={styles.emphasis}>
                            We cast people, not profiles.
                        </div>

                        <p>
                            Whether you’re trained or untrained,
                            experienced or just beginning —
                            if you can feel the story, we want to see you.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
