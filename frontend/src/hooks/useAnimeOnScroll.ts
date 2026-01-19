import { useEffect, useRef } from 'react'
import anime from 'animejs'

export function useAnimeOnScroll(animationParams: anime.AnimeParams, threshold = 0.2) {
    const elementRef = useRef<any>(null) // Can be div, section, etc.
    const hasAnimated = useRef(false)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true

                    // Run the animation
                    anime({
                        targets: element,
                        ...animationParams
                    })

                    observer.unobserve(element)
                }
            },
            { threshold }
        )

        observer.observe(element)

        return () => {
            if (element) observer.unobserve(element)
        }
    }, [animationParams, threshold])

    return elementRef
}
