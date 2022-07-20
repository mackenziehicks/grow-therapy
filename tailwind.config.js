/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
			sans: ['Calibre', 'sans-serif']
		},
    extend: {}
  },
  plugins: [],
}