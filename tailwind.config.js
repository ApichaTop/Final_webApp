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
        'lmroman' : ['lmroman10', 'serif'],
        'lmroman-bold' : ['lmroman10-bold', 'serif'],
        'lmroman-bold-italic' : ['lmroman10-bold-italic', 'serif'],
        'lmroman-oblique' : ['lmroman10-oblique', 'serif'],
        'lmroman-demi' : ['lmroman10-demi', 'serif'],
        'lmroman-slant' : ['lmroman10-slant', 'serif'],
      },
    },
  },
  plugins: [],
}
