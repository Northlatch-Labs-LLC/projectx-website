
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        px: {
          bg: '#05080f',
          'bg-alt': '#070c17',
          panel: '#0d1424',
          elevated: '#121b2e',
          hover: '#17223a',
          border: '#1c2740',
          'border-bright': '#2f3f61',

          accent: {
            50: 'rgb(var(--px-accent-50) / <alpha-value>)',
            100: 'rgb(var(--px-accent-100) / <alpha-value>)',
            200: 'rgb(var(--px-accent-200) / <alpha-value>)',
            300: 'rgb(var(--px-accent-300) / <alpha-value>)',
            400: 'rgb(var(--px-accent-400) / <alpha-value>)',
            500: 'rgb(var(--px-accent-500) / <alpha-value>)',
            600: 'rgb(var(--px-accent-600) / <alpha-value>)',
            700: 'rgb(var(--px-accent-700) / <alpha-value>)',
            800: 'rgb(var(--px-accent-800) / <alpha-value>)',
            DEFAULT: 'rgb(var(--px-accent-400) / <alpha-value>)',
          },

          cyan: {
            light: 'rgb(var(--px-hue-2) / <alpha-value>)',
            DEFAULT: 'rgb(var(--px-hue-3) / <alpha-value>)',
            dark: '#17a8c8',
          },
          violet: {
            light: 'rgb(var(--px-hue-5-light) / <alpha-value>)',
            DEFAULT: 'rgb(var(--px-hue-5) / <alpha-value>)',
            dark: '#5c3fd6',
          },

          prize: { light: '#6ce7b4', DEFAULT: '#3ddc97', dark: '#22b076' },
          gold: { light: '#ffc75c', DEFAULT: '#ffb020', dark: '#c9860d' },
          danger: '#ff5c5c',

          text: '#eef3fa',
          muted: '#9dabc4',

          faint: '#707f9a',
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-roboto)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'SFMono-Regular', 'ui-monospace', 'Menlo', 'monospace'],
      },

      fontSize: {
        hero: ['clamp(2.5rem, 1.5rem + 3.6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.038em' }],
        display: ['clamp(2.1rem, 1.35rem + 3vw, 3.4rem)', { lineHeight: '1.07', letterSpacing: '-0.03em' }],
        title: ['clamp(1.6rem, 1.25rem + 1.5vw, 2.4rem)', { lineHeight: '1.15', letterSpacing: '-0.024em' }],
        stat: ['clamp(1.75rem, 1.35rem + 1.4vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.022em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },

      maxWidth: {
        content: '76rem',
        prose: '48rem',
        lead: '48ch',
        copy: '70ch',
      },

      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.95)',
        lift: '0 28px 70px -30px rgb(var(--px-accent-400) / 0.55)',
        glow: '0 0 0 1px rgb(var(--px-accent-400) / 0.35), 0 0 48px -8px rgb(var(--px-accent-400) / 0.45)',
        neon: '0 0 24px -6px rgba(63,216,245,0.55), 0 0 60px -20px rgba(139,107,255,0.5)',
      },

      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(150,180,230,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(150,180,230,0.05) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '64px 64px' },
      borderRadius: { '4xl': '1.75rem', '5xl': '2.25rem' },

      transitionTimingFunction: {
        expo: 'var(--ease-expo)',
        quart: 'var(--ease-quart)',
        spring: 'var(--ease-spring)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        reveal: 'var(--duration-reveal)',
      },

      keyframes: {
        aurora: {
          '0%,100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
          '33%': { transform: 'translate3d(6%, 3%, 0) scale(1.12)' },
          '66%': { transform: 'translate3d(-3%, 6%, 0) scale(0.94)' },
        },
        'aurora-slow': {
          '0%,100%': { transform: 'translate3d(4%, 5%, 0) scale(1.06)' },
          '50%': { transform: 'translate3d(-5%, -6%, 0) scale(0.92)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%,100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        'float-tag': {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(var(--tag-tilt, 0deg))' },
          '50%': { transform: 'translate3d(0,-11px,0) rotate(calc(var(--tag-tilt, 0deg) * -0.6))' },
        },
        'stage-in': {
          from: { opacity: '0', transform: 'scale(0.9)', filter: 'blur(6px)' },
          to: { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
        'tag-in': {
          from: { opacity: '0', transform: 'translate3d(0,14px,0) scale(0.94)' },
          to: { opacity: '1', transform: 'translate3d(0,0,0) scale(1)' },
        },
        'ripple-out': {
          '0%': { transform: 'scale(0.55)', opacity: '0.45' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        'edge-travel': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        dash: { to: { strokeDashoffset: '-1000' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },

      animation: {
        aurora: 'aurora 26s ease-in-out infinite',
        'aurora-slow': 'aurora-slow 34s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        drift: 'drift 9s ease-in-out infinite',
        'float-tag': 'float-tag 7s ease-in-out infinite',
        'stage-in': 'stage-in 900ms cubic-bezier(0.16,1,0.3,1) both',
        'tag-in': 'tag-in 700ms cubic-bezier(0.16,1,0.3,1) both',
        'ripple-out': 'ripple-out 5s cubic-bezier(0.16,1,0.3,1) infinite',
        'edge-travel': 'edge-travel 8s ease-in-out infinite',
        dash: 'dash 22s linear infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
        'spin-slow': 'spin-slow 34s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
