'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const MANIFESTO_LINES = [
  { text: "Most agencies sell you tools.", style: "large-white" },
  { text: "We sell you", style: "large-white" },
  { text: "transformation.", style: "large-accent" },
  { text: "AI that learns your business.", style: "medium-white" },
  { text: "Automation that replaces friction.", style: "medium-white" },
  { text: "Systems that compound over time.", style: "medium-white" },
  { text: "This is what", style: "medium-white" },
  { text: "Nexus X AI", style: "medium-accent" },
  { text: "does.", style: "medium-white" },
]

export default function Scene02Manifesto() {
  const containerRef = useRef<HTMLElement>(null)
  const linesContainerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !linesContainerRef.current) return

    // Pinning the section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%', // 300vh scroll distance
      pin: true,
      anticipatePin: 1,
    })

    // Animate lines based on scroll progress
    const lines = linesRef.current.filter(Boolean)
    
    // We animate each line from 0.08 to 1 opacity as it comes into view
    // Using a stagger or individual scroll triggers. Individual makes more sense for "reveal based on scroll progress" linearly across the pinned duration.
    
    // Create a timeline linked to the whole pinned duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: true,
      }
    })

    // Calculate duration for each line so they evenly appear over the scroll
    const step = 1 / lines.length
    
    lines.forEach((line, index) => {
      tl.fromTo(line, 
        { opacity: 0.08 },
        { 
          opacity: 1,
          duration: step,
          ease: 'none', // linear for scrub
        },
        index * step * 0.8 // slight overlap
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const getLineClasses = (style: string) => {
    switch (style) {
      case 'large-white':
        return 'text-4xl md:text-6xl lg:text-7xl font-display text-white font-bold mb-4'
      case 'large-accent':
        return 'text-4xl md:text-6xl lg:text-7xl font-display text-accent italic font-bold mb-8'
      case 'medium-white':
        return 'text-2xl md:text-4xl lg:text-5xl font-display text-white mb-3'
      case 'medium-accent':
        return 'text-2xl md:text-4xl lg:text-5xl font-display text-accent italic inline-block mx-2 mb-3'
      default:
        return 'text-xl text-white'
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center"
    >
      {/* Thin accent vertical line on left side */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-[1px] bg-accent/30 hidden md:block">
        <div className="w-full h-1/4 bg-accent/80" />
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10 w-full max-w-7xl">
        <div 
          ref={linesContainerRef}
          className="max-w-4xl"
        >
          {MANIFESTO_LINES.map((item, index) => {
            // Need special handling for inline medium/accent combination visually
            
            // Just simple block elements for most, but allowing inline-like flow for the last few if needed.
            // Based on instructions, they are "lines".
            return (
              <p
                key={index}
                ref={(el) => { linesRef.current[index] = el }}
                className={`${getLineClasses(item.style)} opacity-[0.08] leading-tight`}
              >
                {item.text}
              </p>
            )
          })}
        </div>
      </div>

      {/* Corner label bottom right */}
      <div className="absolute bottom-8 right-8 text-white/50 font-mono text-sm uppercase tracking-widest hidden md:block">
        02 / Manifesto
      </div>
    </section>
  )
}
