/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#5200FF",
        "brand-secondary": "#7000FF"
      }
    },
  },
  plugins: [],
}
