/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F8F4',
          100: '#E1EFE5',
          200: '#C2DFCB',
          300: '#94C6A5',
          400: '#5FA67A',
          500: '#2F7D4A', // Primary Green
          600: '#205C36', // Dark Green
          700: '#1B4A2C',
          800: '#163C24',
          900: '#12311E',
        },
        primary: {
          DEFAULT: '#2F7D4A',
          dark: '#205C36',
        },
        surface: {
          bg: '#FAFAF5',
          card: '#FFFFFF',
          darkBg: '#0F1411',
          darkCard: '#172019',
        },
        content: {
          main: '#172019',
          muted: '#6B746D',
        },
        status: {
          warning: '#E5A72B',
          danger: '#D9534F',
          accent: '#F3B562',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(23, 32, 25, 0.05)',
        'elevated': '0 20px 40px -10px rgba(23, 32, 25, 0.08)',
        'glow': '0 0 25px rgba(47, 125, 74, 0.2)',
      }
    },
  },
  plugins: [],
}
