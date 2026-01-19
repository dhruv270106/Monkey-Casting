import { useRef, useState, useEffect } from 'react'

export function useScrollAnimation(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.unobserve(element) // Trigger once
            }
        }, { threshold })

        observer.observe(element)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, isVisible }
}
