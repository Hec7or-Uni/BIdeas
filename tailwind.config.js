module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        cg42: "42%",
        cg58: "58%",
        "3/10": "30%",
        "7/10": "70%",
      },
      height: {
        cg42: "26.75rem",
        "3/10": "30%",
        "7/10": "70%",
      },
      borderWidth: {
        cg1: "1.2px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
