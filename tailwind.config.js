/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,vue,less}",],
  darkMode: 'selector',
  theme: {
    extend: {
      width:{
        "1/1":"100%",
        "1/10":"10%"
      },margin:{
        "tab":""
      },spacing:{
        "223":"223rem",
        "60":"18rem",
         "25":"7.5rem",
         "75":"24rem",
        "100":"30rem",
        "120":"36rem",
        "400":"120rem",
        "300":"90rem",
        "100%":"45.6rem"
      },translate:{
        "center":"-50%"
      }
    },
  },
  important: true,
  plugins: [daisyui],
}

