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
        primary: {
          DEFAULT: '#0EA5E9', // Sky-500 (Matches the "Consult Now" and teal highlights)
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        secondary: {
          DEFAULT: '#14B8A6', // Teal-500 (Matches "Emergency Red" and accent elements)
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
        },
        accent: {
          DEFAULT: '#22D3EE', // Cyan-400
          500: '#22D3EE',
        },
        surface: '#FFFFFF',
        background: '#F1F5F9', // Slightly cooler background
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
        }
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-md': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.07)',
        'premium': '0 20px 50px -12px rgba(14, 165, 233, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
