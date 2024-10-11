/* eslint-disable quotes */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'rgba': 'rgba(0,0,0, 0.2)'
      },
      backgroundImage: {
        'login-signup': "url('~/images/teamwork.jpg')"
      },
      translate: {
        'n50': '-50%'
      },
      animation: {
        'zoom-in': 'zoom-in 400ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      keyframes: {
        'zoom-in': {
          '0%' : {
            // transform: "translate(100%, 100%)",
            transform: "scale(0)"
          },
          '100%' : {
            // transform: "translate(-50%, -50%)",
            transform: "scale(1)"
          }
        }
      }
    }
  },
  plugins: []
}

