/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'star-yellow': '#FFE81F',
        'star-black': '#000000',
        'star-gray': '#2A2A2A',
      },
      fontFamily: {
        'star': ['Star Jedi', 'Arial Black', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
