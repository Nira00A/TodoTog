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
      },
      keyframes:{
        popdown:{
          "0%":{transform: 'translateY(-20px)', opacity: '0'},
          "100%":{transform: 'translateY(0px)', opacity: '1'}
        },
        popup:{
          "0%":{transform: 'translateY(0px)', opacity: '1'},
          "100%":{transform: 'translateY(-20px)', opacity: '0'}
        }
      },
      animation:{
        popdown: 'popdown 0.5s ease-in-out',
        popup: 'popup 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}

