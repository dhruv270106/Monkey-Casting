'use client'
import Link from 'next/link'
import styles from '@/app/page.module.css'
import { motion } from 'framer-motion'
import { AnimatedCounter } from './AnimatedCounter'

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroOverlay} />
            <div className={styles.heroAmbient} />
            <motion.div
                className={`container ${styles.heroContent}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Discover the <span className="gold-text">Stars</span> of Tomorrow
                </motion.h1>

                <motion.p
                    className={styles.heroSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Monkey Casting is the premier platform connecting top production houses with exceptional talent across the globe.
                </motion.p>

                <motion.div
                    className={styles.heroButtons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link href="/register" className="btn btn-primary">Join Monkey Casting</Link>
                    <Link href="/about" className="btn btn-secondary">Learn More</Link>
                </motion.div>

                <div className={styles.counters}>
                    <div className={styles.counterItem}>
                        <span className={styles.counterNumber}>
                            <AnimatedCounter to={150} />+
                        </span>
                        <span className={styles.counterLabel}>Successful Castings</span>
                    </div>
                    <div className={styles.counterItem}>
                        <span className={styles.counterNumber}>
                            <AnimatedCounter to={55} />+
                        </span>
                        <span className={styles.counterLabel}>Brands</span>
                    </div>
                    <div className={styles.counterItem}>
                        <span className={styles.counterNumber}>
                            <AnimatedCounter to={63} />+
                        </span>
                        <span className={styles.counterLabel}>Productions</span>
                    </div>
                    <div className={styles.counterItem}>
                        <span className={styles.counterNumber}>
                            <AnimatedCounter to={22} />+
                        </span>
                        <span className={styles.counterLabel}>Projects</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
