/* eslint-disable quotes */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-signup': "url('~/images/teamwork.jpg')"
      },
      translate: {
        'n50x': '-50%',
        'n50y': '-50%'
      }
    }
  },
  plugins: []
}

