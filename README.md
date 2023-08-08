# Castle ⚔️ Conquer

### **Ever dreamt of ruling the chessboard from the comfort of your couch? 🛋️ Say hello to Castle & Conquer, where you can reign as the grandmaster of real-time online chess! 🏆 Battle friends, rivals, or even foes across the globe, and dive into our captivating game archive to relive your most epic victories! 🌟 It's time to unleash your strategic prowess and conquer the chess world like never before! 🎉 Checkmate boredom with Castle & Conquer now!**

[Live Website](https://jamdk-chess-frontend.onrender.com/)

>_This project implements an online chess game with multiplayer functionality. The application will allow its users to match and play chess games over the internet. The application will provide real-time updates, handle network issues and also allow the retrieval and playback of saved games._

---

&emsp; &emsp; &emsp; &emsp; [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/) [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/) [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---
 
## 📝 Project Task Requirements

#### 🎯Minimal Requirements:
1. ✅ Allows people to play Chess games over the internet.
	-   ✅ Stable connection.
	-   ✅ Real-Time
2. ✅ Room System.
	-   ✅ Users will be able to select a game room to play another player in. The only input really required from the user is some temporary username.
3. ✅ Be able to represent a chess game on a UI using React and CSS.
#### 🎯 Standard Requirements:
   - ✅ Users should be able to offer a draw or resign (forfeit) the game
-   ✅ Having the last 10 games on the website posted somewhere, where users can click and playback the game.
-   ✅ Handle network issues like disconnects and reconnects.
-   ✅ Be able to see the legal moves of a piece in the UI.
-   ✅ Allows users to retrieve and play back their previous games, step by step.
#### 🎯 Stretch Requirements:
-   ✅ Use some Chess Engine package to evaluate the game at each step during playback.
-   ❌ Computer-controlled chess bot players can play against.
-   ❌ Login system for users.
-   ❌ ELO Rating System.

## 🧑‍💻 Technologies

 ### **HTML, CSS, and JS**
> -
 ### **React.js and Redux**
> -
 ### **Node.js and Express.js**
> - 
 ### **MongoDB**
> - Castle and Conquer stores game data and user information using MongoDB, a NoSQL database. We leverage MongoDB's flexible document-based structure and efficient querying and management in order to have a functioning chess database allowing our users to store, retrieve and replay games seamlessly. This also doubles as a storage option for future developments like a login system.
 ### **Render (Deployment)**
> - Castle & Conquer is deployed on Render, segmented into two parts—the frontend website, accessible at [Castle & Conquer](https://jamdk-chess-frontend.onrender.com/), and our backend servers — running NodeJS & Express and instances of chess.js engines, also hosted on Render.

## ✨ Above and Beyond

## 🔮 Future of Castle & Conquer
- Add a login system that allows users to save their games in our chess database. This also allows for a username-based invite system and a friend system. A barebones login system was in the works by Jason Lai, but was scrapped due to logistical reasons.
- Extend our existing Stockfish AI framework (being used for game analysis) to enable players to play against an AI-controlled bot with varying difficulties.
- Develop and deploy a persistent leaderboard or player rating system, built upon the login system.
- Other QOL changes, like allowing players to change the theme of the board.

## 🌟 Contributors

- [Mihir Bhandari](https://github.com/VexMihir):
- [Dan Blustein](https://github.com/wallstarr): 
- [Alex Nguyen](https://github.com/AlexNgGit): 
  - Parsed information from the database and implemented the frontend to display the information using React and Redux.
  - Implemented the playback feature based on the information from MongoDB database.
  - Collaborated with Dan Blustein to implement the analysis feature using Stockfish.js library.
  - Collaborated with Mihir Bhandari to style and format the frontend for PrevGameView component.
- [Jason Lai](https://github.com/jason0770): 
- [Kevin Dang](https://github.com/kdang243): 

---

📣 Please refer to old.README.md for the design document of the app, including prototype sketches.

📣 This application was designed and developed using AI tools like ChatGPT and Github Copilot.
