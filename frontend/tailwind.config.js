/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.ts'],
    safelist: ['@apply'],
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend:{
      colors:{
        herotitle:'#39424E',
        buttoncolor:'#F11A7B',
        secondaryBlack:'#181823'
      }
    },
    fontFamily:{
      REM:['REM','sans-serif']
    },
    fontWeight:{
      semibold:'600'
    }
  },
  plugins: [],
}

