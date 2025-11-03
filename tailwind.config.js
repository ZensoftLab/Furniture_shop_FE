// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // manual only
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // force light
    darkTheme: "light", // ignore dark requests
    base: true,
  },
};
