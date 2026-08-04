/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070B14', panel: '#0D1424', panel2: '#111B30',
        accent: '#4FE0FF', indigo2: '#7B8CFF', mint: '#3EE6A8',
        amber2: '#FFC96B', coral: '#FF6B7A',
        line: 'rgba(140,160,195,.14)', line2: 'rgba(140,160,195,.3)',
        mut: '#94A2B8', dim: '#5D6B83',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-jmono)', 'monospace'],
      },
      keyframes: {
        mq: { to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '.35' } },
        scan: { '0%,100%': { top: '14px' }, '50%': { top: 'calc(100% - 16px)' } },
        shake: { '25%': { transform: 'translateX(-5px)' }, '75%': { transform: 'translateX(5px)' } },
        drift1: { to: { transform: 'translate(90px,70px)' } },
        drift2: { to: { transform: 'translate(-80px,-90px)' } },
      },
      animation: {
        mq: 'mq 36s linear infinite',
        blink: 'blink 2s infinite',
        scan: 'scan 2.6s ease-in-out infinite',
        shake: 'shake .4s',
        drift1: 'drift1 26s ease-in-out infinite alternate',
        drift2: 'drift2 32s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}