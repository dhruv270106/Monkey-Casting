'use client'

import styles from './about.module.css'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Check, Star, Video, Camera, Users, Target, Zap } from 'lucide-react'
import Link from 'next/link'

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

export default function About() {
    return (
        <div className={styles.aboutPage}>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <motion.div
                    className={styles.heroContent}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={fadeInUp} className={styles.heroSubline}>Monkey CASTING By Monkey Studios</motion.p>
                    <motion.h1 variants={fadeInUp} className={styles.heroHeadline}>
                        “Screen dekhte rehna hai?<br />
                        Ya screen ka hissa banna hai?”
                    </motion.h1>
                    <motion.div variants={fadeInUp}>
                        <Link href="/register" className={styles.glowBtn}>
                            Apply for Monkey Casting <ArrowRight />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Intro Section */}
            <section className={`${styles.section} ${styles.darkSection}`}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <h2 className={styles.sectionTitle} style={{ color: '#1f295c' }}>Cinematic Talent. Real Opportunities.</h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '30px', color: '#555' }}>
                            Monkey Studios presents Casting — a professional casting gateway for actors, models & performers who want real, camera-facing opportunities.
                        </p>
                        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', display: 'inline-block', background: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: 0, color: '#333', fontWeight: 600 }}>
                                This is not a random audition platform. Not a social media contest. Not influencer scouting.<br />
                                <span style={{ color: '#ffbe0b' }}>This is casting for cinematic and commercial storytelling.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is Monkey Casting */}
            <section className={styles.section} style={{ background: '#f5f5f5', color: '#333' }}>
                <div className="container">
                    <div className={styles.monkeyCastingRow}>
                        <motion.div
                            style={{ flex: '1 1 400px' }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className={`${styles.sectionTitle} ${styles.centerOnMobile}`} style={{ textAlign: 'left' }}>What is Monkey Casting?</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '20px' }}>
                                Monkey Casting is a central talent onboarding platform where aspiring and professional talents submit their profiles to be considered for:
                            </p>
                            <ul className={styles.castingList}>
                                {['Brand films', 'Ad commercials', 'Social Cinema™ projects', 'Music videos', 'Digital & web content', 'Story-driven productions'].map((item, i) => (
                                    <li key={i} className={styles.castingItem}>
                                        <Video size={20} color="#1f295c" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{ padding: '40px', background: '#1f295c', borderRadius: '30px', color: 'white', maxWidth: '400px' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Monkey Studios Talent Pool</h3>
                                <p>Your profile becomes part of our exclusive pool — accessible directly to our creative, casting & production teams.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works & Who Can Apply */}
            <section className={`${styles.section} ${styles.darkSection}`}>
                <div className="container">
                    <motion.div
                        className={styles.cardGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Box 1 */}
                        <motion.div className={styles.featureCard} variants={fadeInUp}>
                            <Target size={40} className={styles.cardIcon} />
                            <h3 className={styles.cardTitle}>How This Casting Works</h3>
                            <p className={styles.cardText} style={{ marginBottom: '20px' }}>We believe casting should be transparent and opportunity-driven.</p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['No paid auditions', 'No fake promises', 'No influencer bias', 'Only profile-based casting'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: '#333' }}>
                                        <Check size={20} color="#ffbe0b" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Box 2 */}
                        <motion.div className={styles.featureCard} variants={fadeInUp}>
                            <Users size={40} className={styles.cardIcon} />
                            <h3 className={styles.cardTitle}>Who Can Apply?</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Actors (fresh & experienced)', 'Models (print, video, lifestyle)', 'Performers with expressive presence', 'Creators transitioning into films', 'Individuals with unique screen appeal'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: '#333' }}>
                                        <Check size={20} color="#ffbe0b" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <p style={{ marginTop: '20px', color: '#ffbe0b', fontWeight: 'bold' }}>If you can face the camera with confidence — you can apply.</p>
                        </motion.div>

                        {/* Box 3 */}
                        <motion.div className={styles.featureCard} variants={fadeInUp}>
                            <Camera size={40} className={styles.cardIcon} />
                            <h3 className={styles.cardTitle}>What We Look For</h3>
                            <p className={styles.cardText} style={{ marginBottom: '20px' }}>Mapping screen suitability over follower count.</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['Natural expressions', 'Emotional connect', 'Camera confidence', 'Voice & body language', 'Originality'].map((item, i) => (
                                    <span key={i} style={{ background: '#f0f0f0', color: '#333', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid #ddd' }}>{item}</span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* The Process */}
            <section className={styles.section} style={{ background: '#fff' }}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>The Casting Process</h2>
                    <p className={styles.sectionSubtitle}>Simple, transparent, and professional.</p>

                    <div className={styles.processContainer}>
                        {[
                            { step: '01', title: 'Profile Submission', desc: 'Fill the Star Casting Form with your basic information, photos, video intro, and experience.' },
                            { step: '02', title: 'Internal Review', desc: 'Our casting & creative teams review profiles based on role and project needs.' },
                            { step: '03', title: 'Talent Pool Inclusion', desc: 'Suitable profiles are added to Monkey Studios Talent Pool for future matching.' },
                            { step: '04', title: 'Project-Based Reach Out', desc: 'When a role matches your profile, our team connects with you directly.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={styles.processStep}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <div className={styles.stepNumber}>{item.step}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', color: '#1f295c', marginBottom: '10px' }}>{item.title}</h3>
                                    <p style={{ color: '#555' }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Monkey Studios & Note */}
            <section className={`${styles.section} ${styles.darkSection}`} style={{ textAlign: 'center' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto 80px' }}>
                        <h2 className={styles.sectionTitle} style={{ color: '#ffbe0b' }}>Why Monkey Studios?</h2>
                        <div className={styles.whyGrid}>
                            {['Backed by Monkey Ads creative ecosystem', 'Experience across ads, films & digital', 'Clear communication & ethical casting', 'Story-driven, not trend-driven', 'Respect for talent & professionalism', 'We create real creative opportunities'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Star size={20} color="#ffbe0b" fill="#ffbe0b" />
                                    <span style={{ fontSize: '1.1rem' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        style={{ padding: '50px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '30px', background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                    >
                        <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: '#1f295c' }}>A Note for Aspiring Talent</h3>
                        <p style={{ fontSize: '1.4rem', fontStyle: 'italic', marginBottom: '30px', color: '#555' }}>
                            "You don’t need to be famous to be cast. You need to be ready."
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', color: '#ffbe0b', fontWeight: 'bold' }}>
                            <span>Ready to learn.</span>
                            <span>•</span>
                            <span>Ready to perform.</span>
                            <span>•</span>
                            <span>Ready to grow.</span>
                        </div>
                        <p style={{ fontSize: '1.2rem', color: '#333' }}>If you believe the camera belongs to you — start here.</p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 900, color: '#fff' }}>Your talent deserves the right opportunity.</h2>
                        <p style={{ fontSize: '1.5rem', marginBottom: '50px', color: '#ccc' }}>Get considered for real projects across Monkey Studios & its productions.</p>

                        <Link href="/register" className={styles.glowBtn}>
                            Submit Your Casting Profile <Zap fill="black" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}
