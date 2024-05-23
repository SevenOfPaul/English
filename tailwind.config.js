/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,vue,less}",],
  theme: {
    extend: {
      width:{
        "1/1":"100%",
        "1/10":"10%"
      },margin:{
        "tab":""
      },h:{
        "223":"223rem"
      }
    },
  },
  plugins: [daisyui],
}

