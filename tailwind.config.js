module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: {
        light: "#85d7ff",
        DEFAULT: "#454d60",
        dark: "#33373d",
      },
      orange: {
        light: "#fdf1eb",
        DEFAULT: "#fbdacb",
        dark: "#f0885d",
      },
    },

    textColor: {
      primary: "#FFFFFF",
      danger: "#e3342f",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
