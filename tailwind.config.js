/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Encre : textes et surfaces sombres
        night: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
        },
        // Couleur d'action principale (bleu professionnel)
        sun: {
          DEFAULT: '#1D4ED8',
          hover: '#1E40AF',
          soft: '#EEF3FF',
        },
        // Avertissements (à accepter, expiration proche)
        warn: {
          DEFAULT: '#D97706',
          soft: '#FEF6E7',
          ink: '#92400E',
        },
        canvas: '#F4F6F8',
        line: '#E3E8EF',
        success: {
          DEFAULT: '#15803D',
          soft: '#EAF7EF',
        },
        danger: {
          DEFAULT: '#B91C1C',
          soft: '#FDECEC',
        },
      },
      borderRadius: {
        card: '14px',
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
        btn: '54px',
      },
      minHeight: {
        btn: '54px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.04)',
        raised: '0 8px 24px -12px rgba(15, 23, 42, 0.25)',
      },
    },
  },
  plugins: [],
};
