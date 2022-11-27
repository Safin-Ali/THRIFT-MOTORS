/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: 'var(--body--BG)',
        common: 'var(--common)',
        blackSA: 'var(--black)',
        commonDeep: 'var(--commonDeep)',
        primaryRed: 'var(--primaryRed)',
        lightgray: 'var(--lightgray)',
        whiteCard: 'var(--white--card)',
      }
    },
  },
  plugins: [],
}