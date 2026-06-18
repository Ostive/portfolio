/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        term: {
          bg: '#0a0e14',
          surface: '#11161d',
          border: '#21262d',
          'border-hover': '#30363d',
          text: '#c9d1d9',
          muted: '#6e7681',
          accent: '#3fb950',
          amber: '#e3b341',
        },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      aspectRatio: {
        'video': '16 / 9',
      },
    },
  },
  plugins: [],
};