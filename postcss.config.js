module.exports = {
  plugins: [
    require("postcss-import"), // If you're using postcss-import, include it first
    require("postcss-nesting"), // Enable CSS nesting
    require("tailwindcss"), // Tailwind CSS
    require("autoprefixer"), // Autoprefixer for vendor prefixes
  ],
};
