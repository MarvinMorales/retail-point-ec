/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'rgb(41, 39, 52)',
          red: 'rgb(255, 58, 58)',
          'red-dark': 'rgb(230, 52, 52)',
          'dark-light': 'rgb(61, 58, 77)'
        }
      },
      animation: {
        slide: "slide 30s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};