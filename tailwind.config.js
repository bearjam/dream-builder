const { black, white, gray } = require("tailwindcss/colors")

const extraUtils = ({ addUtilities }) => {
  const newUtilities = {
    ".touch-action-none": {
      "touch-action": "none",
    },
  }
  addUtilities(newUtilities)
}

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  // purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      orange: "#FD933A",
      pink: "#F2B6BC",
      blue: "#0B5CD5",
      green: "#28A745",
      yellow: "#FFCB2F",
      black,
      white,
      gray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), extraUtils],
}
