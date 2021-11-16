module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        neutral: "#eff2f5",
        basic: "#f8fafd",
      },
      width: {
        left: "42%",
        right: "58%",
        "3/10": "30%",
        "7/10": "70%",
        15: "15rem",
        15.5: "15.5rem",
      },
      height: {
        cg42: "26.75rem",
        "3/10": "30%",
        "7/10": "70%",
      },
      borderWidth: {
        cg1: "1.2px",
      },
      minWidth: {
        15.5: "15.5rem",
        15: "15rem",
        3.5: "3.5rem",
      },
      minHeight: {},
      maxWidth: {},
      maxHeight: {
        cg42: "24rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
