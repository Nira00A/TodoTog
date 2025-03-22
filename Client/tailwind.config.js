/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dblack': '#0E1113',
        'orange1':'#EC4E20',
        'yellow1':'#FF9505',
        'blue1':'#016FB9',
        'deepgray1':'#353531',
      },
      fontSize: {
        'xs': '13px',
      },
      screens:{
        'navsm': '426px',
        'navmd': '786px',
        'navmdb': "830px",
        'navlg': '1210px',
        'navxl': '1400px'
      }
    },
  },
  plugins: [],
}

