import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'off-black': '#0A0A0A',
        'card-black': '#111111',
        'text-secondary': '#999999',
        'text-tertiary': '#444444',
        accent: '#0066FF',
        'accent-hover': '#0052CC',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'Courier New', 'monospace'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 5vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem, 4vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'exit': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
    },
  },
  plugins: [],
}

export default config