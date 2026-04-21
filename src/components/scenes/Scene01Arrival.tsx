'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, SCROLL } from '@/lib/motion.config'
import VideoBackground from '@/components/ui/VideoBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Scene01Arrival() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const words = ["We", "automate", "the", "future."]

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current) return

    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: DURATION.normal, ease: 'power3.out' },
      0
    )

    const wordSpans = headlineRef.current.querySelectorAll('.word-inner')
    tl.fromTo(wordSpans,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: DURATION.cinematic, stagger: 0.08, ease: 'power4.out' },
      0.2
    )

    tl.fromTo(sublineRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DURATION.slow, ease: 'power3.out' },
      0.8
    )

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DURATION.slow, ease: 'power3.out' },
      1.0
    )

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: SCROLL.scrub,
      animation: gsap.to(headlineRef.current, { y: 120, ease: "none" })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      ref={containerRef} 
      id="arrival" 
      className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <VideoBackground src="/videos/scene01-arrival.mp4" opacity={0.55} />

      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-0">
        
        <div 
          ref={badgeRef}
          className="flex items-center gap-2 mb-8 opacity-0"
        >
          <div className="h-4 w-0.5 bg-accent" />
          <span className="font-mono text-sm text-accent uppercase tracking-widest">
            Nexus X AI — Automation Agency
          </span>
        </div>

        <h1 
          ref={headlineRef}
          className="font-display text-4xl md:text-6xl lg:text-display-2xl text-white font-bold leading-tight mb-6"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden mr-3 lg:mr-5 last:mr-0">
              <span className="word-inner inline-block translate-y-[110%] opacity-0">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p 
          ref={sublineRef}
          className="max-w-2xl text-lg md:text-xl text-neutral-300 mb-10 opacity-0"
        >
          AI systems that work while you sleep. Automation that scales without friction. Your business, operating at machine speed.
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 opacity-0"
        >
          <button className="px-8 py-4 bg-accent text-white font-medium hover:bg-accent-hover transition-colors">
            See Our Work
          </button>
          <button className="px-8 py-4 border border-white text-white font-medium hover:bg-white/10 transition-colors">
            Start a Project
          </button>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="font-mono text-xs tracking-[0.2em] text-white mb-2">SCROLL</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}