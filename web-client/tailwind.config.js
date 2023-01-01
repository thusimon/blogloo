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
        aliceblue: '#f0f8ff',
        dodgerblue: '#1e90ff',
        ghostwhite: '#f8f8ff',
        blogblue: '#0057b7',
        blogyellow: '#ffdd00'
      },
      fontSize: {
        rem2_4: '2.4rem' 
      },
      gridTemplateAreas: {
        'article-info': [
          'title title',
          'locale locale',
          'author time'
        ]
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
