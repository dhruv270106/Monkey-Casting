'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { Play, Star, Film, MonitorPlay, Users, Camera, Clapperboard, CheckCircle, Video, UserCheck, Heart, ArrowRight, ShieldCheck, Mail, Sparkles, TrendingUp, Globe, Mic } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- Shared Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const SectionTitle = ({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "left" | "center" | "right" }) => (
    <div className={`mb-12 ${align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right"}`}>
        {subtitle && (
            <FadeIn>
                <span className="inline-block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
                    {subtitle}
                </span>
            </FadeIn>
        )}
        <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text leading-tight">
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
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background - Cinematic Texture */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-60"></div>
                {/* Animated Grain Overlay would go here */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale"></div>
            </div>

            <div className="z-10 container mx-auto px-6 text-center relative max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        “Keval screen dekhna hai?<br />
                        Ya screen par aana hai?”
                    </h1>
                </motion.div>

                <div className="h-32 md:h-24 mb-8 flex flex-col items-center justify-center space-y-2">
                    {lines.map((text, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: index < currentLine ? 1 : index === currentLine ? 1 : 0, y: 0 }}
                            className={`text-lg md:text-xl font-light tracking-wide text-gray-300 ${index === currentLine ? 'text-primary' : ''}`}
                        >
                            {text}
                        </motion.p>
                    ))}
                    {currentLine >= lines.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="mt-4"
                        >
                            <p className="text-2xl md:text-3xl font-heading font-semibold text-white mt-4">
                                Welcome to Hoop Casting.
                            </p>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.5, duration: 1 }}
                    className="flex flex-col items-center space-y-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400 font-light tracking-widest uppercase">
                        <span>Not a talent hunt</span>
                        <span className="hidden md:inline text-primary">•</span>
                        <span>Not a random audition</span>
                        <span className="hidden md:inline text-primary">•</span>
                        <span>This is a casting gateway</span>
                    </div>

                    <Link href="/register" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-300 bg-primary rounded-full hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-glow">
                        <span className="mr-2">Apply for Hoop Casting</span>
                        <Play className="w-5 h-5 fill-current" />
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 animate-pulse"></div>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </motion.div>
        </section>
    );
};

export const WhatIsHoopCasting = () => {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                    {/* Visual Abstract */}
                    <div className="aspect-square relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-surface-highlight to-black">
                        {/* Placeholder for cinematic image/video */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Film className="w-32 h-32 text-primary/10" strokeWidth={0.5} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <p className="text-white font-heading text-3xl">We cast people,<br />not profiles.</p>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <SectionTitle title="Not Just Another Casting Platform." subtitle="Who We Are" align="left" />

                    <FadeIn delay={0.2} className="space-y-6 text-lg text-gray-300">
                        <p>Hoop Casting is an open casting platform for Actors, Models, Performers, Fresh faces, and Real people with real presence.</p>

                        <ul className="space-y-4 py-6">
                            {["Talent is not judged by followers.", "Recognized by expression.", "Valued for authenticity.", "Chosen for screen presence."].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-white font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </FadeIn>
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
        <section className="py-32 bg-black text-white">
            <div className="container mx-auto px-6">
                <SectionTitle title="Cinema-Grade Storytelling." subtitle="Why Us" />

                <div className="text-center max-w-2xl mx-auto mb-16 text-gray-400">
                    <p>This is not casting for ads alone. This is where your journey doesn't end at one shoot—it begins with visibility.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-surface border border-white/5 p-8 rounded-xl hover:border-primary/50 transition-colors group cursor-default"
                        >
                            <card.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                            <p className="text-gray-400 text-sm">{card.desc}</p>
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
        <section className="py-24 bg-surface-highlight relative">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16">
                <div className="md:w-1/2">
                    <SectionTitle title="No Barriers. Just Talent." subtitle="Who Can Apply" align="left" />
                    <div className="space-y-6">
                        {checklist.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <span className="text-lg text-gray-200">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 flex items-center justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center p-12 border border-primary/20 rounded-2xl bg-black/50 backdrop-blur-sm"
                    >
                        <h3 className="text-3xl font-heading font-bold text-white mb-6">Talent is Universal</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">Age, language, city, background — no barriers.</p>
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    </motion.div>
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
        <section className="py-24 bg-black text-center">
            <div className="container mx-auto px-6">
                <SectionTitle title="Presence Over Perfection." subtitle="What We Look For" />

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
                    {attributes.map((attr, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center gap-4 w-32 md:w-40"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary">
                                <attr.icon className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            <span className="text-sm md:text-base font-medium text-gray-300">{attr.label}</span>
                        </motion.div>
                    ))}
                </div>

                <FadeIn delay={0.5}>
                    <blockquote className="text-2xl md:text-3xl font-heading italic text-gray-500 max-w-3xl mx-auto">
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
        <section className="py-24 bg-surface">
            <div className="container mx-auto px-6">
                <SectionTitle title="The Casting Process" subtitle="How It Works" />

                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 md:translate-x-0 hidden md:block"></div>

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px" }}
                                className={`flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center gap-8 relative`}
                            >
                                <div className="flex-1 md:text-right w-full md:w-auto pl-12 md:pl-0 pr-0 md:pr-12 md:rtl">
                                    <div className={`${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-0 top-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-surface border-2 border-primary z-10 flex items-center justify-center text-primary font-bold text-sm">
                                    {idx + 1}
                                </div>

                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>

                    <FadeIn delay={0.6} className="text-center mt-16">
                        <p className="text-primary font-semibold tracking-wider uppercase text-sm">No false promises. Only real opportunities.</p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export const WhyTrust = () => {
    return (
        <section className="py-24 bg-black border-y border-white/5">
            <div className="container mx-auto px-6 text-center">
                <SectionTitle title="Why Trust Hoop Casting?" />

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {[
                        "Professional Process", "Experienced Creative Team", "Ethical Practices", "Story-First Culture", "Long-term Vision"
                    ].map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 px-6 py-3 rounded-full border border-white/10 flex items-center gap-3"
                        >
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-200">{badge}</span>
                        </motion.div>
                    ))}
                </div>

                <FadeIn>
                    <h3 className="text-3xl font-heading font-bold text-white">We don’t chase trends. <span className="text-gray-500">We build stories that last.</span></h3>
                </FadeIn>
            </div>
        </section>
    );
};

export const MessageForDreamers = () => {
    return (
        <section className="py-32 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                {/* Parallax elements could go here */}
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <p className="text-xl text-gray-400">Everyone dreams of being seen on screen.<br />Very few get the right platform.</p>

                    <div className="py-8">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">Here, we don’t ask —</h2>
                        <p className="text-3xl md:text-5xl font-heading font-bold text-gray-600">"kitne followers hain?"</p>
                    </div>

                    <div className="py-8">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">We ask —</h2>
                        <p className="text-3xl md:text-5xl font-heading font-bold text-primary">"Kya screen tumhe yaad rakhegi?"</p>
                    </div>

                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-12 mb-8"></div>

                    <p className="text-lg text-white font-medium">If the answer feels like yes — <span className="text-primary border-b border-primary">don’t overthink.</span></p>
                </motion.div>
            </div>
        </section>
    );
};

export const FinalCTA = () => {
    return (
        <section className="py-32 bg-primary relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-multiply"></div>

            <div className="container mx-auto px-6 text-center relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-black mb-6">
                        Your story deserves the right frame.<br />
                        Your talent deserves the right camera.
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                        <Link href="/register" className="w-full md:w-auto px-10 py-5 bg-black text-primary font-bold text-xl rounded-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3">
                            <Play className="fill-current w-5 h-5" />
                            Apply for Hoop Casting
                        </Link>
                    </div>

                    <p className="mt-8 text-black/70 font-medium cursor-pointer hover:text-black transition-colors">
                        👉 Submit Your Hoop Casting Profile Now
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
