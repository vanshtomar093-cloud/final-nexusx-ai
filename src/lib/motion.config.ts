export const EASING = {
  reveal: [0.76, 0, 0.24, 1] as const,
  exit: [0.33, 1, 0.68, 1] as const,
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
} as const

export const DURATION = {
  instant: 0,
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  cinematic: 1.6,
  epic: 2.4,
} as const

export const STAGGER = {
  tight: 0.03,
  normal: 0.06,
  loose: 0.1,
  cinematic: 0.15,
} as const

export const SCROLL = {
  scrub: 1.2,
  pin: true,
  anticipatePin: 1,
  fastScrollEnd: true,
} as const

export const MICRO = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  },
  magnetic: {
    rest: { scale: 1 },
    hover: { scale: 1.04, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
    tap: { scale: 0.97 }
  }
}

export const LENIS_CONFIG = {
  duration: 1.4,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 2,
}