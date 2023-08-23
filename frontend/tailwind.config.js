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
      boxShadow:{
        'glow':'0px 0px 9px rgba(168, 195, 240,1)',
        'small': '0 10px 10px -8px rgb(66,66,66)',
      },
      colors:{
        herotitle:'#39424E',
        buttoncolor:'#F11A7B',
        cardBlack:'#181823',
        secondaryBlack:'#181823',
        primaryMint:'#A7ECEE'
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

