'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    phase: "Discovery",
    number: "01",
    headline: "We learn your business\nfaster than you think.",
    body: "A single deep-dive session. We map every process, identify every bottleneck, quantify every opportunity. By the end, we know where your time goes — and where it should go instead.",
    duration: "1 week",
    deliverable: "Automation Audit Report"
  },
  {
    phase: "Architecture",
    number: "02",
    headline: "We design the system\nbefore we build anything.",
    body: "Every automation is a decision. We design your full system architecture first — workflows, triggers, integrations, failsafes. You approve every node before we write a single line.",
    duration: "1 week",
    deliverable: "System Architecture Blueprint"
  },
  {
    phase: "Build",
    number: "03",
    headline: "We build fast.\nWe build right.",
    body: "2-3 week build sprints. Daily updates. You see progress every day, not at the end. Real systems being built in real time, tested against real scenarios.",
    duration: "2-3 weeks",
    deliverable: "Live staging environment"
  },
  {
    phase: "Launch",
    number: "04",
    headline: "We hand over power,\nnot dependency.",
    body: "Full handover. Your team trained. Documentation complete. And we stay available — not because you need us, but because we want to see what you build with it.",
    duration: "1 week",
    deliverable: "Production deployment + training"
  }
]

export default function Scene04Process() {
  const containerRef = useRef<HTMLElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return

    const tl = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Animate the progress bar width based on scroll
        gsap.set(progressBarRef.current, { scaleX: self.progress })
        
        // Calculate which step is active (0 to 3) based on progress (0 to 1)
        // 0-25% = 0, 25-50% = 1, 50-75% = 2, 75-100% = 3
        const step = Math.min(3, Math.floor(self.progress * 4))
        if(self.progress === 1) {
            setActiveStep(3)
        } else {
            setActiveStep(step)
        }
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Fade animation when step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeStep])

  const stepData = STEPS[activeStep]

  return (
    <section 
      ref={containerRef}
      id="process"
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center pt-24"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 origin-left">
        <div 
          ref={progressBarRef}
          className="w-full h-full bg-accent origin-left scale-x-0"
        />
      </div>

      {/* Top Indicators */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-16">
        {STEPS.map((step, idx) => {
          const isActive = idx === activeStep
          return (
            <div key={idx} className="flex flex-col items-center gap-3">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-accent scale-125' : 'bg-white/15'
                }`}
              />
              <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 hidden md:block ${
                isActive ? 'text-white' : 'text-white/30'
              }`}>
                {step.phase}
              </span>
            </div>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 w-full max-w-[1400px]">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="relative">
            {/* Giant Ghost Number */}
            <div className="absolute -top-16 -left-8 lg:-left-16 text-[180px] lg:text-[240px] font-display font-bold text-white opacity-[0.04] leading-none pointer-events-none select-none">
              {stepData.number}
            </div>
            
            <h2 className="relative font-display text-4xl md:text-5xl lg:text-display-lg text-white font-bold leading-[1.1] whitespace-pre-line mb-12 z-10">
              {stepData.headline}
            </h2>

            {/* Duration Info */}
            <div className="relative flex flex-col gap-1 pl-4 border-l border-accent z-10">
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                Typical Duration
              </span>
              <span className="text-white text-lg">
                {stepData.duration}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 mt-12 md:mt-0">
            <p className="text-text-secondary text-lg lg:text-xl leading-relaxed max-w-lg">
              {stepData.body}
            </p>

            {/* Deliverable Box */}
            <div className="border border-white/10 p-6 md:p-8 bg-white/5 rounded backdrop-blur-sm max-w-md">
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest block mb-2">
                Key Deliverable
              </span>
              <span className="font-display text-xl text-accent italic">
                {stepData.deliverable}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Corner label */}
      <div className="absolute bottom-8 right-8 text-white/50 font-mono text-sm uppercase tracking-widest hidden md:block">
        04 / Process
      </div>
    </section>
  )
}
