'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION, STAGGER } from '@/lib/motion.config'

gsap.registerPlugin(ScrollTrigger)

const RESULTS = [
  {
    metric: "95%",
    metricLabel: "time reduction",
    client: "E-commerce Brand",
    industry: "Retail / D2C",
    result: "Reduced order processing time from 4 hours to 12 minutes.",
    tags: ["n8n", "Shopify API", "Custom Agent"]
  },
  {
    metric: "200+",
    metricLabel: "leads/day automated",
    client: "B2B SaaS Company",
    industry: "Software",
    result: "Automated entire lead qualification pipeline — 200+ leads per day, zero human hours.",
    tags: ["AI SDR", "CRM Integration", "Scoring Model"]
  },
  {
    metric: "85%",
    metricLabel: "no-show reduction",
    client: "Healthcare Clinic Network",
    industry: "Healthcare",
    result: "Patient follow-up reminders, rebooking and intake forms — fully automated.",
    tags: ["HIPAA Compliant", "Calendar API", "SMS Automation"]
  }
]

export default function Scene06Proof() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cardsContainerRef.current) return

    const cardEls = cardsRef.current.filter(Boolean)

    // Cards sequence animation
    if (cardEls.length > 0) {
      gsap.fromTo(cardEls,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, // Requirements asked for 0.1, we will use raw value since it differs from motion.config loose=0.1. Wait, loose is 0.1 in motion.config. Let's use STAGGER.loose
          duration: DURATION.slow, // 1.2
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 70%',
          }
        }
      )
    }

    // Blockquote animation
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: DURATION.cinematic, // 1.6
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%'
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      id="work"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-32 md:py-40 flex flex-col justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12 lg:px-24 w-full max-w-[1400px] flex flex-col gap-20">
        
        {/* Top Header */}
        <div className="flex flex-col gap-12">
          {/* Section label row */}
          <div className="flex items-center gap-6">
            <span className="text-accent font-mono text-sm tracking-widest uppercase whitespace-nowrap">
              06 / Results
            </span>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-5xl md:text-7xl lg:text-display-xl text-white font-bold leading-none">
            The work<br />
            <span className="text-accent italic font-normal">speaks clearly.</span>
          </h2>
        </div>

        {/* Results Stack */}
        <div ref={cardsContainerRef} className="flex flex-col gap-[1px] bg-white/5 p-[1px] rounded-xl overflow-hidden">
          {RESULTS.map((item, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              className="group bg-black border border-white/5 hover:border-accent/20 transition-all duration-500 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
                
                {/* Left Metric Column */}
                <div className="flex flex-col gap-2">
                  <span className="font-display text-6xl md:text-7xl lg:text-8xl text-accent group-hover:text-white transition-colors duration-500 font-bold leading-none">
                    {item.metric}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-widest text-text-secondary">
                    {item.metricLabel}
                  </span>
                </div>

                {/* Right 2 Columns (Client Info & Result) */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pl-0 lg:pl-12 lg:border-l lg:border-white/10">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-xl font-medium">{item.client}</h4>
                      <span className="text-text-tertiary text-sm">{item.industry}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx}
                          className="px-3 py-1 font-mono text-xs text-white/70 border border-white/10 rounded-full bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {item.result}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Blockquote */}
        <div 
          ref={quoteRef}
          className="mt-12 md:mt-24 max-w-4xl mx-auto border-l-2 border-accent pl-6 md:pl-10"
        >
          <blockquote className="flex flex-col gap-8">
            <p className="font-display text-3xl md:text-4xl lg:text-display-md text-white italic leading-tight">
              "Nexus X AI didn't just automate our workflow. They showed us what our business could look like if we stopped doing things manually."
            </p>
            <footer className="font-mono text-text-tertiary text-sm tracking-widest uppercase">
              — CEO, Series B SaaS Company
            </footer>
          </blockquote>
        </div>

      </div>
    </section>
  )
}
