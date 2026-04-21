'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, EASING } from '@/lib/motion.config'
import VideoBackground from '@/components/ui/VideoBackground'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 40000, suffix: "+", label: "Hours automated", desc: "for our clients" },
  { value: 97, suffix: "%", label: "Client retention", desc: "year over year" },
  { value: 48, suffix: "h", label: "Average build", desc: "time to first automation live" },
  { value: 3, suffix: "x", label: "Average ROI", desc: "within 90 days" }
]

export default function Scene05Story() {
  const containerRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current) return

    // Left column animation
    gsap.fromTo(leftColRef.current,
      { opacity: 0, y: 80 },
      { 
        opacity: 1, 
        y: 0, 
        duration: DURATION.cinematic, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 65%',
        }
      }
    )

    // Numbers counter animation
    const numEls = numbersRef.current.filter(Boolean)
    if (numEls.length > 0) {
      ScrollTrigger.create({
        trigger: numEls[0], // Trigger on the first number card
        start: 'top 80%',
        once: true,
        onEnter: () => {
          numEls.forEach((el) => {
            const targetStr = el?.getAttribute('data-target') || "0"
            const targetVal = parseInt(targetStr, 10)

            gsap.to(el, {
              innerHTML: targetVal,
              duration: 2.0,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function() {
                if(el) {
                  // Format large numbers with commas
                  el.innerHTML = Number(Math.round(this.targets()[0].innerHTML)).toLocaleString()
                }
              }
            })
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      id="story"
      className="relative min-h-screen w-full bg-black py-32 px-4 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <VideoBackground src="/videos/scene05-story.mp4" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col gap-24">
        
        {/* Section label */}
        <div className="flex items-center gap-6">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            05 / Why Nexus X AI
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN */}
          <div ref={leftColRef} className="flex flex-col gap-12">
            <h2 className="font-display text-5xl md:text-6xl lg:text-display-xl text-white font-bold leading-tight">
              We started because<br />
              <span className="text-accent italic font-normal">the tools existed.</span><br />
              The expertise didn't.
            </h2>
            
            <div className="flex flex-col gap-6 text-text-secondary text-lg leading-relaxed max-w-xl">
              <p>
                Every business we talked to had the same problem: they knew AI could help them, but they didn't know where to start — or who to trust.
              </p>
              <p>
                Nexus X AI was built to close that gap. We're not a SaaS tool. We're not a consultancy that leaves you with a deck. We build, we implement, and we stay until it works.
              </p>
              <p>
                <b className="text-white font-medium">Our systems have automated</b> over 40,000 hours of manual work for our clients — and counting.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/5 p-[1px] rounded-xl overflow-hidden">
            {STATS.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-[#0A0A0A] p-8 min-h-[220px] flex flex-col justify-center gap-4"
              >
                <div className="font-display text-5xl md:text-6xl text-white font-bold flex items-end">
                  <span 
                    ref={el => { numbersRef.current[idx] = el }}
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="text-accent ml-1 text-4xl">{stat.suffix}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm uppercase tracking-widest text-text-secondary">
                    {stat.label}
                  </span>
                  <span className="text-text-tertiary text-xs">
                    {stat.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
