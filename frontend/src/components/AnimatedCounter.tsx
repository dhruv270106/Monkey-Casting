'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function AnimatedCounter({ from = 0, to }: { from?: number, to: number }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
    const spring = useSpring(from, { mass: 0.8, stiffness: 75, damping: 15 })
    const display = useTransform(spring, (current) => Math.round(current))

    useEffect(() => {
        if (inView) {
            spring.set(to)
        }
    }, [inView, spring, to])

    return <motion.span ref={ref}>{display}</motion.span>
}
