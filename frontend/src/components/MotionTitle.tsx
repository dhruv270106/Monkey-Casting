'use client'
import React, { useEffect, useRef } from 'react'
import anime from 'animejs'

export function MotionTitle({ text, className }: { text: string, className?: string }) {
    const textRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        // Wrap text in spans logic could go here, or simple element animation
        // For a sophisticated look, let's just animate the word slightly

        const anim = anime({
            targets: textRef.current,
            opacity: [0, 1],
            translateY: [20, 0],
            translateX: [-100, 0],
            scale: [0.9, 1],
            rotate: [-5, 0],
            easing: 'easeOutElastic(1, .8)',
            duration: 2000,
            delay: 500
        })

        return () => anim.pause()
    }, [text])

    // Split text for individual letter animation if desired, but block animation is often cleaner for titles
    return (
        <h2 ref={textRef} className={className} style={{ display: 'inline-block', transformOrigin: '0 50%' }}>
            {text}
        </h2>
    )
}
