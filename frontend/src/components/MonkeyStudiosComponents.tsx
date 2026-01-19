'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './MonkeyStudios.module.css'
import { Check, X, Film, Music, Camera, Video, Clapperboard, MonitorPlay, Zap, ArrowRight, ShieldCheck, Heart, MessageCircle, Eye, Shield } from 'lucide-react'
import AestheticCameraScene from './AestheticCameraScene'
import { MotionTitle } from './MotionTitle'
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

// --- Animation Variants ---

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

const revealText: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
}

// --- Components ---

export function StudioIntro() {
    return (
        <section className={`${styles.section} ${styles.darkBg}`}>
            <div className={`${styles.ambientGlow} ${styles.ambientGlowTopLeft}`} />
            <div className={`container ${styles.introContainer}`} style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    className={styles.introText}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp}>
                        <MotionTitle text="Where Talent Meets the Camera" className={styles.introTitle} />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '2rem' }}>
                            Monkey Studios is a creative production studio built on one simple belief:
                            <br />
                            <motion.span
                                style={{ display: 'inline-block', color: 'var(--primary)', fontWeight: 600 }}
                                animate={{ opacity: [1, 0.7, 1], scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Talent deserves the right platform, not just the right luck.
                            </motion.span>
                        </p>
                    </motion.div>
                    <motion.p variants={fadeInUp} style={{ color: '#888', marginBottom: '2rem', lineHeight: 1.8 }}>
                        We are the casting and production arm of the Monkey ecosystem, creating cinematic and commercial content for brands, stories, and people.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link href="/register" className="btn btn-primary">Join the Studio</Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.introImageWrapper}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '500px' }} // Ensure a fixed height or responsive height for filling
                >
                    <motion.div
                        className={styles.introImage}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Image
                            src="/monkey_studio_intro.png"
                            alt="Monkey Studios Interior"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export function WhyCreated() {
    return (
        <section className={styles.whySection}>
            <div className={styles.spotlightBeam} />
            <div className={styles.whyOverlay} />
            <div className={`${styles.whyContent} container`}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700, color: '#fff' }}>Why We Created Star Casting</h2>
                    <p style={{ color: '#ccc', fontSize: '1.1rem' }}>The industry is full of talent — but opportunities often reach only a few.</p>
                </motion.div>

                <div className={styles.whyContainer}>
                    {/* The Gap */}
                    <motion.div
                        className={styles.gapColumn}
                        initial={{ opacity: 0, x: -150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)" }}
                    >
                        <h3 className={styles.phaseTitle}>
                            <X size={32} color="#ef4444" /> <span style={{ color: '#fff' }}>The Gap</span>
                        </h3>
                        <motion.ul className={styles.list} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            {['Talented actors didn’t know where to apply', 'Casting was unstructured', 'Judged by followers, not skill'].map((item, i) => (
                                <motion.li key={i} className={styles.listItem} variants={fadeInUp} style={{ color: '#fff' }}>
                                    <X size={20} color="#ef4444" style={{ marginTop: '4px' }} /> {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div
                        className={styles.solutionColumn}
                        initial={{ opacity: 0, x: 150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(34,197,94,0.1)" }}
                    >
                        <h3 className={styles.phaseTitle}>
                            <Check size={32} color="#4ade80" /> <span style={{ color: '#fff' }}>The Solution</span>
                        </h3>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e0e7ff' }}>
                            We built a professional, transparent casting gateway.
                        </p>
                        <p style={{ color: '#ccc' }}>
                            Where aspiring and experienced talent can be discovered based on screen suitability, not social validation.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function TiltCard({ children, variants }: { children: React.ReactNode, variants?: Variants }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        x.set(clientX - left - width / 2)
        y.set(clientY - top - height / 2)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

    return (
        <motion.div
            variants={variants}
            className={styles.lightingCard}
            style={{ perspective: 1000, transformStyle: "preserve-3d", cursor: 'pointer' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={styles.cardContent}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export function WhatWeDo() {
    const services = [
        { icon: <Film size={40} />, title: "Brand Films & Ads" },
        { icon: <Clapperboard size={40} />, title: "Cinematic Storytelling" },
        { icon: <Video size={40} />, title: "Social Cinema™" },
        { icon: <Music size={40} />, title: "Music Videos" },
        { icon: <MonitorPlay size={40} />, title: "Digital Content" },
        { icon: <Camera size={40} />, title: "Feature Films" },
    ]

    return (
        <section className={`${styles.section} ${styles.darkBg}`}>
            <div className={`${styles.ambientGlow} ${styles.ambientGlowBottomRight}`} style={{ bottom: '-300px', right: '-300px' }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1f295c' }}>What We Do</h2>
                    <p style={{ color: '#000', fontSize: '1.1rem' }}>Matching the right face to the right story.</p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((s, i) => (
                        <TiltCard key={i} variants={scaleIn}>
                            <div className={styles.iconWrapper} style={{ transform: "translateZ(30px)" }}>{s.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, transform: "translateZ(20px)" }}>{s.title}</h3>
                        </TiltCard>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export function Philosophy() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]) // Parallax effect

    return (
        <section className={styles.philosophySection} ref={ref}>
            <motion.div className={styles.philosophyBg} style={{ y }} />
            <div className={styles.philosophyOverlay} />

            <motion.div
                className={`container ${styles.philosophyContent}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.h2 variants={fadeInUp} style={{ fontSize: '3.5rem', marginBottom: '20px', color: '#fff' }}>Our Casting Philosophy</motion.h2>
                <motion.p variants={fadeInUp} style={{ fontSize: '1.5rem', color: '#ddd', fontStyle: 'italic', marginBottom: '50px', fontWeight: 300 }}>
                    "We don’t believe in selling dreams. <br /> We believe in <span style={{ color: 'var(--primary)' }}>building readiness</span>."
                </motion.p>

                <motion.div className={styles.philGrid} variants={staggerContainer}>
                    {['No paid auditions', 'No fake guarantees', 'No influencer bias', 'No shortcuts'].map((item, i) => (
                        <motion.div key={i} className={styles.philItem} variants={scaleIn} whileHover={{ scale: 1.1 }}>
                            <Check size={20} color="var(--primary)" /> {item}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    style={{ marginTop: '60px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                    <h3 style={{ color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Casting happens when:</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', fontWeight: 500, listStyleType: 'disc', listStylePosition: 'inside', paddingLeft: 0 }}>
                        <li style={{ color: '#fff', fontSize: '1.2rem' }}>A project demands presence</li>
                        <li style={{ color: '#fff', fontSize: '1.2rem' }}>A profile fits the role</li>
                        <li style={{ color: '#fff', fontSize: '1.2rem' }}>Talent is ready for camera</li>
                    </ul>
                </motion.div>
            </motion.div>
        </section>
    )
}

export function Ecosystem() {
    return (
        <section className={`${styles.section} ${styles.lightBg}`}>
            <div className="container">
                <div className={styles.ecoContainer}>
                    <motion.h2
                        style={{ fontSize: '3rem' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Part of a Larger Creative Ecosystem
                    </motion.h2>
                    <p style={{ color: '#888', marginTop: '10px' }}>Monkey Studios works closely with:</p>

                    <div className={styles.ecoVisual}>
                        <div className={styles.animatedBorderCard}>
                            <div className={styles.animatedBorderInner}>
                                <motion.div
                                    className={styles.ecoCard}
                                    style={{ border: 'none', background: 'transparent' }}
                                    initial={{ x: -100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 50 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Zap size={40} color="var(--primary)" style={{ marginBottom: '30px' }} />
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Monkey Ads</h3>
                                    <p style={{ color: '#888', fontSize: '1rem' }}>For brand campaigns & television commercials.</p>
                                </motion.div>
                            </div>
                        </div>

                        <div className={styles.animatedBorderCard}>
                            <div className={styles.animatedBorderInner}>
                                <motion.div
                                    className={styles.ecoCard}
                                    style={{ border: 'none', background: 'transparent' }}
                                    initial={{ x: 100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 50 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Film size={40} color="var(--primary)" style={{ marginBottom: '30px' }} />
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Social Cinema™</h3>
                                    <p style={{ color: '#888', fontSize: '1rem' }}>For cinematic, story-driven films and original content.</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function PromiseCTA() {
    return (
        <section className={`${styles.section} ${styles.ctaSection}`}>
            <div className="container">
                <div className={styles.promiseBox}>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div style={{ display: 'inline-flex', padding: '20px', background: 'rgba(255, 190, 11, 0.1)', borderRadius: '50%', marginBottom: '30px' }}>
                            <ShieldCheck size={48} color="#ffbe0b" />
                        </div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 800, color: '#ffbe0b' }}>Our Promise to Talent</h2>
                        <p style={{ color: '#ccc', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 50px' }}>
                            We are building a sanctuary for artists. Here is what you can expect from us.
                        </p>

                        <div className={styles.promiseGrid}>
                            {[
                                { icon: <Heart size={40} color="#ffbe0b" />, title: 'Respect for Craft', desc: 'We value your time and talent above all else.' },
                                { icon: <MessageCircle size={40} color="#ffbe0b" />, title: 'Clear Communication', desc: 'No ghosting. Transparent feedback loops.' },
                                { icon: <Shield size={40} color="#ffbe0b" />, title: 'Ethical Casting', desc: 'Safe environments and verified opportunities.' },
                                { icon: <Eye size={40} color="#ffbe0b" />, title: 'Long-term Vision', desc: 'We invest in careers, not just gigs.' }
                            ].map((item, i) => (
                                <motion.div key={i} className={styles.promiseCard} whileHover={{ y: -5 }}>
                                    <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: '#fff' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#aaa', lineHeight: 1.6 }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function FinalWord() {
    return (
        <section className={`${styles.section}`} style={{ backgroundColor: '#fff' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    className={styles.finalWord}
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ margin: '0 auto', maxWidth: '800px', backgroundColor: '#1f295c', color: '#fff' }} // Explicit styling for the separate box
                >
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 800 }}>A Final Word</h3>
                    <p style={{ fontSize: '1.35rem', marginBottom: '40px', color: '#ccc', lineHeight: 1.6 }}>
                        You don’t need to be famous to be cast. <br />
                        You need to be <span style={{ color: '#ffbe0b', fontWeight: 600 }}>prepared, expressive, and authentic.</span>
                    </p>
                    <Link href="/register" className={`${styles.finalBtn} btn btn-primary`}>
                        Apply. Get seen. Be ready. <ArrowRight className="ml-2" size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
