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
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), extraUtils],
}
