module.exports = {
  content: ["./src/index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
}
