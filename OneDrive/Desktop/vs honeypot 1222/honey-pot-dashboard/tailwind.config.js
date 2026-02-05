/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stripe-black': '#0A0A0A',
        'stripe-gray': '#1F1F1F',
        'cyber-lime': '#DFFF00', 
      },
    },
  },
  plugins: [],
}