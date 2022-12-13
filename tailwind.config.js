/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--primary-main)"
        }
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        translate: {
          '0%': {
            transform: 'translateX(-50px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
