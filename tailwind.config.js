/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        teal: {
          DEFAULT: '#00C2A8',
          dark:    '#009E88',
          dim:     'rgba(0,194,168,0.15)',
        },
        brand: {
          black:  '#000000',
          dark:   '#0d0d0d',
          900:    '#111111',
          800:    '#1c1c1c',
          700:    '#2e2e2e',
          600:    '#4a4a4a',
          500:    '#6b6b6b',
          400:    '#9a9a9a',
          300:    '#c4c4c4',
          200:    '#e2e2e2',
          100:    '#f0f0f0',
          50:     '#f8f8f8',
          white:  '#ffffff',
        },
      },
      maxWidth: {
        site: '1440px',
      },
      animation: {
        'fade-up': 'fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
