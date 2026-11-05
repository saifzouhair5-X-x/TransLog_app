/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: {
          DEFAULT: '#1F2A37',
          soft: '#2B3847',
        },
        sun: {
          DEFAULT: '#F2A900',
          hover: '#DC9900',
          soft: '#FDF4D6',
        },
        canvas: '#F5F7F9',
        success: {
          DEFAULT: '#1E6B3A',
          soft: '#E4F1E8',
        },
        danger: {
          DEFAULT: '#B3261E',
          soft: '#FBE9E7',
        },
      },
      borderRadius: {
        card: '12px',
      },
      keyframes: {
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'toast-in': 'toast-in 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out both',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
      height: {
        btn: '58px',
      },
      minHeight: {
        btn: '58px',
      },
    },
  },
  plugins: [],
};
