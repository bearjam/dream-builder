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
      pink: "#FDBFBD",
      coral: "#FD937F",
      blue: "#98BBDF",
      navy: "#0304B2",
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
