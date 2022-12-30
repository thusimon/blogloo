/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        snow: 'fffafa',
        floralwhite: '#fffaf0',
        blogblue: '#0057b7',
        blogyellow: '#ffdd00'
      },
      fontSize: {
        rem2_4: '2.4rem' 
      }
    },
  },
  plugins: [],
}
