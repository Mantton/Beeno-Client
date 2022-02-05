module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#95A2F1",
        legendary: "#f8961e",
        ultra_rare: "#7b1cba",
        rare: "#00c0f0",
        uncommon: "#ae2012",
        common: "#43aa8b",
      },
    },
  },
  plugins: [],
};
