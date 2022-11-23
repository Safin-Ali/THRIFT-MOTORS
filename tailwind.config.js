/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: 'var(--body--BG)',
        common: 'var(--common)',
        blackSA: 'var(--black)',
      }
    },
  },
  plugins: [],
}