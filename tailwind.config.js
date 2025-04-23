/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00585c",
        secondary: "#21b1ab",
        accent: "#d97a27",
        neutral: "#f2f1f2",
        white: "#ffffff",
        black: "#000000",
        disabled: "#F2F1F2",
        disabled_text: "#9E9E9E",
        border: "#CCCCCC",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const colors = theme("colors");
      const cssVariables = Object.keys(colors).reduce((acc, key) => {
        const value = colors[key];
        if (typeof value === "string") {
          acc[`--color-${key}`] = value;
        }
        return acc;
      }, {});

      addBase({
        ":root": cssVariables,
      });
    },
  ],
};
