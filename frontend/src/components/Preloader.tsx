'use client'

import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { usePathname } from 'next/navigation'
import animationData from '../../public/preloader.json'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../public/logo.png' // Import logo to get dimensions if needed, or just use string path
// Note: We'll use /logo.png for string path to avoid import issues with Next.js specific image handling if not enabled
// but here we just need styling. 

export default function GlobalPreloader() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    // Handle Route Changes
    // Next.js App Router (Next 13+) navigates instantly on client. 
    // To simulate a "page transition" loader, we trigger it on pathname change.
    useEffect(() => {
        // When path changes, show loader
        setLoading(true)

        // Artificial delay (or wait for something?)
        // Since Next.js is fast, a small delay gives the "premium" feel 
        // without blocking too long.
        // We can check document.readyState but on client nav it's always complete.

        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500) // 1.5s display time min - adjust as needed for "premium" feel

        return () => clearTimeout(timer)
    }, [pathname])

    // Initial Load
    useEffect(() => {
        const handleLoad = () => {
            // For initial load, we might want to wait a bit more or until ready
            setTimeout(() => setLoading(false), 2000)
        }

        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)
            return () => window.removeEventListener('load', handleLoad)
        }
    }, [])

    // Lock scrolling when loading
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [loading])

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#0a0a0a', // Dark theme background
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Lottie Animation Background/Ring */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                            <Lottie animationData={animationData} loop={true} />
                        </div>

                        {/* Center Logo */}
                        {/* 
                           "Animate the logo with a 0% to 100% color fill"
                           We can approximate this "fill" effect or "reveal" effect using clip-path or opacity.
                           Here we use a motion opacity + scale reveal. 
                        */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: 'grayscale(0%)',
                                transition: {
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }
                            }}
                            style={{
                                zIndex: 2,
                                width: '120px',
                                height: 'auto'
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="Loading..."
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
