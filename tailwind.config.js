module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      "cm-color": "#17171a",
      "cm-color2": "#222531",
    }),
    extend: {
      backgroundColor: {
        neutral: "#eff2f5",
        basic: "#f8fafd",
        "color-light-neutral-1": "#f8fafd",
        "color-light-neutral-2": "#eff2f5",
        "color-light-neutral-3": "#a6b0c3",
        "color-light-neutral-4": "#808a9d",
        "color-light-neutral-5": "#58667e",
        "color-light-neutral-6": "#eff2f5",
        "color-neutral-1": "#171924",
        "color-neutral-2": "#222531",
        "color-neutral-3": "#323546",
        "color-neutral-4": "#646b80",
        "color-neutral-5": "#858ca2",
        "color-neutral-6": "#a1a7bb",
        "cm-color": "#17171a",
        "cm-color2": "#222531",
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
      minHeight: {
        32: "8rem",
      },
      maxWidth: {},
      maxHeight: {
        "h-60": "15rem",
        cg42: "24rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
