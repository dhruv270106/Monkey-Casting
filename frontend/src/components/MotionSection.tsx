'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface MotionSectionProps {
    children: ReactNode
    className?: string
    delay?: number
}

export default function MotionSection({ children, className = '', delay = 0 }: MotionSectionProps) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '-50px'
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // Custom ease for "luxury" feel
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
