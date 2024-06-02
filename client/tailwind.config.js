/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      animation:{
        "ping-slow":'ping 3s linear infinite',
        tilt:'tilt 10s infinite linear'
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(.5deg)",
          },
          "75%": {
            transform: "rotate(-.5deg)",
          },
        }
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        darkBlue: "rgba(9, 151, 124, 0.5)",
        redStates:'#DD0000'
        ,
        lightGray:"#1f2428",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"]
      },
    },
    screens: {
      xss:"300px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

