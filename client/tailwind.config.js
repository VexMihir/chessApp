/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "chessImage": " url('/public/joinRoomPic/bg.jpg')"
      },
      boxShadow: {
        "innerReal": "inset -10px -10px 15px rgba(255, 255, 255, 0.5), inset 10px 10px 15px rgba(70, 70, 70, 0.12)"
      },
      colors: {
          "custom-black": "#333",
          "custom-pale": "#b5b5b5",
          "custom-cream": "#D8D9DA",
          "custom-grey": "#61677A"
      },
      fontSize: {
        title: `5.6rem;`,
        paragraph: `10.2rem;`
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
