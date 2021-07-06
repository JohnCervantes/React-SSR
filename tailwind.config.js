module.exports = {
  mode: "jit",
  purge: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        architect: ["Architects+Daughter"],
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        "fade-in-up": "fade-in-up 0.2s ease-out",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(100px) translateX(-50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) translateX(-50%)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
