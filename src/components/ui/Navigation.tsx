'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASING, DURATION } from '@/lib/motion.config'

gsap.registerPlugin(ScrollTrigger, CustomEase)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!navRef.current || !bgRef.current) return

    CustomEase.create('reveal', EASING.reveal.join(','))
    CustomEase.create('gentle', EASING.gentle.join(','))

    // Initial Reveal Navigation
    gsap.fromTo(navRef.current, 
      { y: '-100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration: DURATION.cinematic, 
        ease: 'reveal',
        delay: 3.5 
      }
    )

    // Scroll state change
    ScrollTrigger.create({
      start: 'top -50',
      onEnter: () => {
        gsap.to(bgRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          duration: DURATION.normal,
          ease: 'gentle'
        })
      },
      onLeaveBack: () => {
        gsap.to(bgRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backdropFilter: 'blur(0px)',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          duration: DURATION.normal,
          ease: 'gentle'
        })
      }
    })
  }, { scope: navRef })

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50">
      <div 
        ref={bgRef}
        className="w-full px-6 lg:px-12 flex items-center justify-between pt-6 pb-6"
      >
        <Link 
          href="/" 
          className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase font-bold"
          data-cursor="hover"
        >
          Nexus<span className="text-accent">X</span>AI
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          {['Services', 'Process', 'Work', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-accent font-mono text-label uppercase tracking-widest"
              style={{
                transitionProperty: 'color',
                transitionDuration: `${DURATION.fast}s`,
                transitionTimingFunction: `cubic-bezier(${EASING.gentle.join(',')})`
              }}
              data-cursor="hover"
            >
              {item}
            </Link>
          ))}
        </div>

        <button 
          className="hidden md:block bg-white text-black font-mono text-label uppercase tracking-widest px-8 py-4 hover:bg-accent hover:text-white"
          style={{
            transitionProperty: 'background-color, color',
            transitionDuration: `${DURATION.fast}s`,
            transitionTimingFunction: `cubic-bezier(${EASING.gentle.join(',')})`
          }}
          data-cursor="hover"
        >
          Start Project
        </button>
      </div>
    </nav>
  )
}
