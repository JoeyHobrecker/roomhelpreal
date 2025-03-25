/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // IKEA color palette
        'ikea-blue': '#0051BA',
        'ikea-yellow': '#FFDA1A',
        'ikea-white': '#FFFFFF',
        'ikea-gray': '#F5F5F5',
        'ikea-wood': '#E4D4A7',
        'ikea-dark-blue': '#004F9F',
      },
      fontFamily: {
        'ikea': ['Noto Sans', 'Futura', 'Verdana', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'ikea': '0.25rem',
      },
      boxShadow: {
        'ikea': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
