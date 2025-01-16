/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatyellow' : '#ffeb00',
        'whatred' : '#d84040',
        'whatwhite' : '#FFFDF0',
        'depressed-dark-blue' : '#39546d',
        'depressed-light-blue' : '#638d96',
      },
      fontFamily: {
        'Latin-Modern' : ['Latin-Modern', 'serif'],
      },
    },
  },
  plugins: [],
}
