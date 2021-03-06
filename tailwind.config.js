/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple_primary: "#95A2F1",
        primary: "#000000",
        legendary: "#f8961e",
        ultra_rare: "#7b2cbf",
        rare: "#00c0f0",
        uncommon: "#ae2012",
        common: "#0ead69",
      },
      keyframes: {
        // Deprecated
        beeno_card: {
          "0%, 50%, 100%": {
            "background-position": "0% 50%",
          },
          "25%": {
            "background-position": "100% 50%",
          },
          "75%": {
            "background-position": "100% 50%",
          },
        },
      },
      animation: {
        card_glimmer: "beeno_card 5s ease infinite",
      },
    },
  },
  plugins: [],
};
