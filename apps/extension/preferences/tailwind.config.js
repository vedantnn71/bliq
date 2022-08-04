/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: "#5200FF",
        brandSecondary: "#7000FF"
      }
    },
  },
  plugins: [],
}
