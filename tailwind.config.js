module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        opensans: ["Open Sans"],
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
