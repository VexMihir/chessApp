/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "chessImage": " url('/public/joinRoomPic/image.jpg')"
      },
      boxShadow: {
        "innerReal": "inset -10px -10px 15px rgba(255, 255, 255, 0.5), inset 10px 10px 15px rgba(70, 70, 70, 0.12)"
      },
      fontFamily: {
        "logo": "[Bungee+Spice]"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
