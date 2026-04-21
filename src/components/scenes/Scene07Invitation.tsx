'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DURATION } from '@/lib/motion.config'

gsap.registerPlugin(ScrollTrigger)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Scene07Invitation() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)

  const [formStateVal, setFormStateVal] = useState<'idle' | 'submitting' | 'success'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    if (!containerRef.current || !headingRef.current || !formContainerRef.current) return

    // Heading animation
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: DURATION.cinematic, // 1.6
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 70%',
        }
      }
    )

    // Form animation
    gsap.fromTo(formContainerRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: DURATION.slow, // 1.2
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formContainerRef.current,
          start: 'top 75%',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === headingRef.current || t.vars.trigger === formContainerRef.current) {
          t.kill()
        }
      })
    }
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setFormStateVal('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setFormStateVal('success')
      } else {
        // Just reset on fail or we could show an error, but instructions only specify these 3 states and assume success. 
        // Adding a fallback to idle if error to let them try again.
        console.error("Form submission failed")
        setFormStateVal('idle')
      }
    } catch (error) {
      console.error(error)
      setFormStateVal('idle')
    }
  }

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative min-h-screen w-full bg-black py-32 md:py-40 flex flex-col justify-between overflow-hidden"
    >
      {/* Thin accent horizontal line at very top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent" />

      <div className="container mx-auto px-4 md:px-12 lg:px-24 w-full max-w-[1400px]">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-16 md:mb-24">
          <span className="text-accent font-mono text-sm tracking-widest uppercase whitespace-nowrap">
            07 / Contact
          </span>
          <div className="h-[1px] w-16 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column (Heading) */}
          <div ref={headingRef} className="flex flex-col gap-8">
            <h2 className="font-display text-5xl md:text-7xl lg:text-display-xl text-white font-bold leading-none">
              Ready to stop<br />
              <span className="text-accent italic font-normal">doing it manually?</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
              Tell us what you're working on. We'll respond within 24 hours with a direct assessment and a clear path forward.
            </p>
          </div>

          {/* Right Column (Form / Success) */}
          <div ref={formContainerRef} className="relative w-full max-w-xl">
            {formStateVal === 'success' ? (
              // Success State
              <div className="flex flex-col gap-8 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-accent font-mono text-sm uppercase tracking-widest">
                    07 / Message received
                  </span>
                </div>
                <h3 className="font-display text-4xl text-white">We'll be in touch within 24 hours.</h3>
                <p className="text-text-secondary text-lg">Check your email — we've sent a confirmation with next steps.</p>
              </div>
            ) : (
              // Form State (idle / submitting)
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full transition-opacity duration-500">
                
                {/* Field 1: Name */}
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-text-tertiary">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="Alex Chen"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors peer"
                  />
                  {errors.name && <span className="font-mono text-xs text-red-400 absolute -bottom-5 left-0">{errors.name.message}</span>}
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col gap-2 relative group mt-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-text-tertiary">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="alex@company.com"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors peer"
                  />
                  {errors.email && <span className="font-mono text-xs text-red-400 absolute -bottom-5 left-0">{errors.email.message}</span>}
                </div>

                {/* Field 3: Company */}
                <div className="flex flex-col gap-2 relative group mt-2">
                  <label htmlFor="company" className="font-mono text-xs uppercase tracking-widest text-text-tertiary">Company</label>
                  <input
                    id="company"
                    type="text"
                    {...register('company')}
                    placeholder="Your company name"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors peer"
                  />
                  {errors.company && <span className="font-mono text-xs text-red-400 absolute -bottom-5 left-0">{errors.company.message}</span>}
                </div>

                {/* Field 4: Message */}
                <div className="flex flex-col gap-2 relative group mt-2">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-text-tertiary">What do you want to automate?</label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your workflow..."
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors peer resize-none"
                  />
                  {errors.message && <span className="font-mono text-xs text-red-400 absolute -bottom-5 left-0">{errors.message.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button 
                    type="submit" 
                    disabled={formStateVal === 'submitting'}
                    className="group flex items-center justify-center gap-4 bg-accent px-12 py-5 text-white font-mono text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStateVal === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Start a project
                        <span className="transform transition-transform group-hover:translate-x-2">→</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 w-full max-w-[1400px] mt-32">
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-medium text-white text-xl">NexusXAI</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-text-tertiary text-sm">AI Automation Agency</span>
          </div>
          <div className="text-text-tertiary text-sm font-mono tracking-wide">
            © 2026 Nexus X AI. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  )
}
