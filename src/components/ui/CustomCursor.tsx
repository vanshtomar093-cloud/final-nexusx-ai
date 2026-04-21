'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { EASING, DURATION } from '@/lib/motion.config'

gsap.registerPlugin(CustomEase)

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    CustomEase.create('gentle', EASING.gentle.join(','))

    // Quick setters for performance
    const xToDot = gsap.quickTo(dot, 'x', { duration: DURATION.instant, ease: 'none' })
    const yToDot = gsap.quickTo(dot, 'y', { duration: DURATION.instant, ease: 'none' })
    
    // Large ring has 0.08 lag factor (simulated via duration)
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.08, ease: 'none' })
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.08, ease: 'none' })

    const moveCursor = (e: MouseEvent) => {
      xToDot(e.clientX)
      yToDot(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    const hoverElements = document.querySelectorAll('[data-cursor="hover"]')
    
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 1.5,
        duration: DURATION.fast,
        ease: 'gentle'
      })
      gsap.to(dot, {
        opacity: 0,
        duration: DURATION.fast,
        ease: 'gentle'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        duration: DURATION.fast,
        ease: 'gentle'
      })
      gsap.to(dot, {
        opacity: 1,
        duration: DURATION.fast,
        ease: 'gentle'
      })
    }

    window.addEventListener('mousemove', moveCursor)
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  })

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  )
}
