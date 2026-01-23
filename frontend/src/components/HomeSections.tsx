'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { Play, Star, Film, MonitorPlay, Users, Camera, Clapperboard, CheckCircle, Video, UserCheck, Heart, ArrowRight, ShieldCheck, Mail, Sparkles, TrendingUp, Globe, Mic } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeSections.module.css';

// --- Shared Components ---

const FadeIn = ({ children, delay = 0, className = "", style }: { children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={`${styles.fadeIn} ${className}`}
        style={style}
    >
        {children}
    </motion.div>
);

const SectionTitle = ({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "left" | "center" | "right" }) => (
    <div className={`${styles.sectionTitle} ${align === "left" ? styles.alignLeft : align === "right" ? styles.alignRight : ""}`}>
        {subtitle && (
            <FadeIn>
                <span className={styles.subtitle}>
                    {subtitle}
                </span>
            </FadeIn>
        )}
        <FadeIn delay={0.2}>
            <h2 className={styles.title}>
                {title}
            </h2>
        </FadeIn>
    </div>
);

// --- Sections ---

export const HeroSection = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const lines = [
        "If you believe your story has dum",
        "If you believe your face can carry emotion",
        "If you believe you were meant for the camera —"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLine((prev) => (prev < lines.length ? prev + 1 : prev));
        }, 1500);
        return () => clearInterval(timer);
    }, [lines.length]);

    return (
        <section className={styles.heroSection}>
            {/* Background - Cinematic Texture */}
            <div className={styles.bgOverlay}></div>
            <div className={styles.grainOverlay}></div>

            <div className={styles.heroContent}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className={styles.heroHeadline}>
                        “Keval screen dekhna hai?<br />
                        Ya screen par aana hai?”
                    </h1>
                </motion.div>

                <div className={styles.scrollingTextContainer}>
                    {lines.map((text, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: index < currentLine ? 1 : index === currentLine ? 1 : 0, y: 0 }}
                            style={{ position: 'absolute' }}
                            className={`${styles.scrollingText} ${index === currentLine ? styles.highlightText : ''}`}
                        >
                            {text}
                        </motion.p>
                    ))}
                    {currentLine >= lines.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ marginTop: '1rem' }}
                        >
                            <p className={styles.welcomeText}>
                                Welcome to Hoop Casting.
                            </p>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.5, duration: 1 }}
                    className={styles.heroFooter}
                >
                    <div className={styles.disclaimer}>
                        <span>Not a talent hunt</span>
                        <span className={styles.highlightText}>•</span>
                        <span>Not a random audition</span>
                        <span className={styles.highlightText}>•</span>
                        <span>This is a casting gateway</span>
                    </div>

                    <Link href="/register" className={styles.primaryBtn}>
                        <span style={{ marginRight: '0.5rem' }}>Apply for Hoop Casting</span>
                        <Play size={20} fill="currentColor" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={styles.heroScrollIndicator}
            >
                <div className={styles.scrollLine}></div>
            </motion.div>
        </section>
    );
};

export const WhatIsHoopCasting = () => {
    return (
        <section className={styles.whatWeDoSection} style={{ padding: '6rem 0' }}>
            <div className={styles.container}>
                <div className={styles.gridSplit}>
                    <div className={styles.visualAbstract}>
                        {/* Visual Abstract */}
                        <div className={styles.iconPlaceholder}>
                            <Film size={128} color="rgba(212, 175, 55, 0.1)" strokeWidth={0.5} />
                        </div>
                        <div className={styles.abstractCaption}>
                            <p className={styles.abstractText}>We cast people,<br />not profiles.</p>
                        </div>
                    </div>

                    <div>
                        <SectionTitle title="Not Just Another Casting Platform." subtitle="Who We Are" align="left" />

                        <FadeIn delay={0.2} className="">
                            <p style={{ fontSize: '1.125rem', color: '#d1d5db', lineHeight: 1.6 }}>Hoop Casting is an open casting platform for: Actors, Models, Performers, Fresh faces, and Real people with real presence.</p>

                            <ul className={styles.listGroup}>
                                {["Talent is not judged by followers.", "Recognized by expression.", "Valued for authenticity.", "Chosen for screen presence."].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className={styles.listItem}
                                    >
                                        <div className={styles.dot} />
                                        <span style={{ fontWeight: 500 }}>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const WhyDifferent = () => {
    const cards = [
        { icon: Film, title: "Cinematic Films", desc: "Feature length & short films" },
        { icon: Mic, title: "Brand Stories", desc: "Narratives that sell emotion" },
        { icon: Sparkles, title: "Music Videos", desc: "Visual storytelling for sound" },
        { icon: MonitorPlay, title: "Web Series", desc: "Digital narratives & episodic" },
        { icon: Globe, title: "Campaigns", desc: "High-impact commercial ads" },
        { icon: Heart, title: "Social Impact", desc: "Stories that matter" },
    ];

    return (
        <section className={styles.whyDifferentSection}>
            <div className={styles.container}>
                <SectionTitle title="Cinema-Grade Storytelling." subtitle="Why Us" />

                <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 4rem', color: '#9ca3af' }}>
                    <p>This is not casting for ads alone. This is where your journey doesn't end at one shoot—it begins with visibility.</p>
                </div>

                <div className={styles.cardsGrid}>
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={styles.card}
                        >
                            <card.icon size={40} className={styles.highlightText} style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>{card.title}</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const WhoCanApply = () => {
    const checklist = [
        "An aspiring or professional actor",
        "A model with strong screen presence",
        "A performer who can express emotion naturally",
        "A creator transitioning into cinema",
        "Someone with a unique look, voice, or story",
        "A first-timer who believes “mere andar dum hai”"
    ];

    return (
        <section className={styles.whoCanApplySection}>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }} className="md:flex-row">
                    <div style={{ flex: 1 }}>
                        <SectionTitle title="No Barriers. Just Talent." subtitle="Who Can Apply" align="left" />
                        <div className={styles.checklist}>
                            {checklist.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={styles.checkItem}
                                >
                                    <CheckCircle size={24} className={styles.highlightText} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                    <span style={{ fontSize: '1.125rem', color: '#e5e7eb' }}>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className={styles.highlightBox}
                        >
                            <h3 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Talent is Universal</h3>
                            <p style={{ color: '#9ca3af', marginBottom: '2rem', lineHeight: 1.6 }}>Age, language, city, background — no barriers.</p>
                            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', opacity: 0.5 }}></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const WhatWeLookFor = () => {
    const attributes = [
        { icon: UserCheck, label: "Expressive Face" },
        { icon: Heart, label: "Emotional Depth" },
        { icon: Camera, label: "Confidence" },
        { icon: Star, label: "Natural Performance" },
        { icon: Sparkles, label: "Originality" },
        { icon: TrendingUp, label: "Hunger to Grow" },
    ];

    return (
        <section className={styles.whatWeLookForSection}>
            <div className={styles.container}>
                <SectionTitle title="Presence Over Perfection." subtitle="What We Look For" />

                <div className={styles.attributesGrid}>
                    {attributes.map((attr, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={styles.attributeItem}
                        >
                            <div className={styles.iconCircle}>
                                <attr.icon size={32} />
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: 500, color: '#d1d5db' }}>{attr.label}</span>
                        </motion.div>
                    ))}
                </div>

                <FadeIn delay={0.5}>
                    <blockquote className={styles.quote}>
                        "Sometimes, the most powerful performers are the ones never discovered yet."
                    </blockquote>
                </FadeIn>
            </div>
        </section>
    );
};

export const CastingProcess = () => {
    const steps = [
        { title: "Submit Profile", desc: "Basic details, photos, and intro video." },
        { title: "Talent Evaluation", desc: "Reviewed by creative team for cinematic suitability." },
        { title: "Shortlisting", desc: "Selected profiles added to Hoop Casting Talent Pool." },
        { title: "Opportunities", desc: "We connect directly when a project matches." },
    ];

    return (
        <section className={styles.castingProcessSection}>
            <div className={styles.container}>
                <SectionTitle title="The Casting Process" subtitle="How It Works" />

                <div className={styles.timeline}>
                    {/* Line */}
                    <div className={styles.timelineLine}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px" }}
                                className={`${styles.stepRow} ${idx % 2 === 0 ? styles.stepRowReverse : ''}`}
                            >
                                <div className={styles.stepContent}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{step.title}</h3>
                                    <p style={{ color: '#9ca3af' }}>{step.desc}</p>
                                </div>

                                {/* Dot */}
                                <div className={styles.stepNumber}>
                                    {idx + 1}
                                </div>

                                <div className={styles.stepSpacer}></div>
                            </motion.div>
                        ))}
                    </div>

                    <FadeIn delay={0.6} className="" style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <p style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>No false promises. Only real opportunities.</p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export const WhyTrust = () => {
    return (
        <section className={styles.section} style={{ backgroundColor: '#000000', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className={styles.container} style={{ textAlign: 'center' }}>
                <SectionTitle title="Why Trust Hoop Casting?" />

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        "Professional Process", "Experienced Creative Team", "Ethical Practices", "Story-First Culture", "Long-term Vision"
                    ].map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '9999px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <ShieldCheck size={20} className={styles.highlightText} />
                            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e5e7eb' }}>{badge}</span>
                        </motion.div>
                    ))}
                </div>

                <FadeIn>
                    <h3 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white' }}>We don’t chase trends. <span style={{ color: '#6b7280' }}>We build stories that last.</span></h3>
                </FadeIn>
            </div>
        </section>
    );
};

export const MessageForDreamers = () => {
    return (
        <section className={styles.dreamersSection}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={styles.dreamersContent}
                >
                    <p className={styles.dreamerHeadline} style={{ fontSize: '1.25rem', color: '#9ca3af' }}>Everyone dreams of being seen on screen.<br />Very few get the right platform.</p>

                    <div style={{ padding: '2rem 0' }}>
                        <h2 className={styles.question}>Here, we don’t ask —</h2>
                        <p className={styles.answer}>"kitne followers hain?"</p>
                    </div>

                    <div style={{ padding: '2rem 0' }}>
                        <h2 className={styles.question}>We ask —</h2>
                        <p className={`${styles.answer} ${styles.highlightAnswer}`}>"Kya screen tumhe yaad rakhegi?"</p>
                    </div>

                    <div className={styles.divider}></div>

                    <p style={{ fontSize: '1.125rem', color: 'white', fontWeight: 500 }}>If the answer feels like yes — <span className={styles.highlightText} style={{ borderBottom: '1px solid var(--primary)' }}>don’t overthink.</span></p>
                </motion.div>
            </div>
        </section>
    );
};

export const FinalCTA = () => {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaNoise}></div>

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={styles.ctaContent}
                >
                    <h2 className={styles.ctaHeadline}>
                        Your story deserves the right frame.<br />
                        Your talent deserves the right camera.
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
                        <Link href="/register" className={styles.blackBtn}>
                            <Play fill="currentColor" size={20} />
                            Apply for Hoop Casting
                        </Link>
                    </div>

                    <p className={styles.linkText}>
                        👉 Submit Your Hoop Casting Profile Now
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
