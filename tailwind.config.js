const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: 'Poppins, sans-serif',
      roboto: 'Roboto, sans-serif',
    },
    screens: {
      mobilelg: '450px',
      ...screens
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
