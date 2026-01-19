'use client'
import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './StaggerGrid.module.css'

export default function StaggerGridBackground() {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!gridRef.current) return

        // Calculate grid layout - 20x10 roughly or responsive
        // For simplicity, we just render a fixed number of dots and let flex/grid handle it
        // Then we animate them.

        const animation = anime({
            targets: `.${styles.dot}`,
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            delay: anime.stagger(200, { grid: [20, 10], from: 'center' }),
            loop: true,
            direction: 'alternate'
        })

        return () => animation.pause()
    }, [])

    // Create array of 200 items (20x10)
    const dots = Array.from({ length: 200 })

    return (
        <div className={styles.gridContainer} ref={gridRef}>
            {dots.map((_, i) => (
                <div key={i} className={styles.dot} />
            ))}
        </div>
    )
}
