'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, EASING, STAGGER } from '@/lib/motion.config'
import VideoBackground from '@/components/ui/VideoBackground'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: "01",
    title: "AI Workflow Automation",
    description: "We map your most time-consuming processes and replace them with AI-powered systems that run 24/7. Lead qualification, data processing, reporting — automated.",
    tags: ["n8n", "Make", "Zapier", "Custom API"]
  },
  {
    number: "02",
    title: "Intelligent Data Pipelines",
    description: "From raw data to actionable insight — automatically. We build pipelines that clean, structure, analyze and surface what matters to your team in real time.",
    tags: ["Python", "Langchain", "Pinecone", "BigQuery"]
  },
  {
    number: "03",
    title: "AI Agent Development",
    description: "Custom AI agents that handle your customer support, sales outreach, research, and internal operations — trained on your data, tuned for your voice.",
    tags: ["GPT-4o", "Claude", "Gemini", "Fine-tuning"]
  },
  {
    number: "04",
    title: "Systems Architecture",
    description: "We design the full automation stack — from CRM to delivery. Every component connected, every workflow optimized, every bottleneck eliminated.",
    tags: ["Architecture", "Integration", "Scaling", "Monitoring"]
  }
]

export default function Scene03Services() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !headingRef.current || !cardsContainerRef.current) return

    const headingEl = headingRef.current
    const cardEls = cardsRef.current.filter(Boolean)

    // Heading Reveal
    gsap.fromTo(headingEl,
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: DURATION.slow, 
        ease: 'power3.out', // using basic easing as EASING object contains arrays which ScrollTrigger handles conditionally, but let's use standard GSAP string representations for safety
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Cards Reveal
    if (cardEls.length > 0) {
      gsap.fromTo(cardEls,
        { 
          opacity: 0, 
          y: 60,
          clipPath: 'inset(0 0 100% 0)'
        },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: 'inset(0 0 0% 0)',
          duration: DURATION.slow, 
          stagger: STAGGER.normal,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current || t.vars.trigger === cardsContainerRef.current) {
          t.kill()
        }
      })
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      id="services"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-32 px-4 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <VideoBackground src="/videos/scene03-services.mp4" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Top Header */}
        <div className="flex flex-col gap-12">
          {/* Section label row */}
          <div className="flex items-center gap-6">
            <span className="text-accent font-mono text-sm tracking-widest uppercase">
              03 / Services
            </span>
            <div className="h-[1px] flex-grow bg-accent/20" />
          </div>

          {/* Heading */}
          <h2 ref={headingRef} className="font-display text-5xl md:text-7xl lg:text-display-xl text-white font-bold leading-none">
            What we<br />
            <span className="text-accent italic font-normal">build for you</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 rounded-xl overflow-hidden border border-white/10 p-[1px]">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              className="group relative bg-[#0A0A0A] hover:bg-[#111111] transition-colors duration-500 p-8 md:p-12 min-h-[400px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-text-tertiary text-sm">
                  {service.number}
                </span>
                
                {/* Arrow Icon */}
                <svg 
                  width="24" height="24" viewBox="0 0 24 24" fill="none" 
                  className="text-white/30 group-hover:text-accent transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h3 className="font-display text-2xl lg:text-3xl text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-base lg:text-lg mb-8 max-w-md">
                  {service.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="px-3 py-1 font-mono text-xs text-white/70 border border-white/10 rounded-full bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
