# quick_chess

> in progress -- this is a fork of the repository which I worked on with a group in a course on applied industry practices. I wrote/was involved with all of the backend, and this fork is my attempt on the front end, which is still not finished. a functioning website based on the original repo has been deployed to render (linked below), though that front end is not my implementation. 

[Live Website](https://jamdk-chess-frontend.onrender.com/)
---

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/) [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/) [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

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
-   ✅ Users should be able to offer a draw or resign (forfeit) the game
-   ✅ Having the last 100 games on the website posted somewhere, where users can click and playback the game.
-   ✅ Handle a network issue like disconnects.
-   ✅ Be able to see the legal moves of a piece in the UI.
-   ✅ Allows users to retrieve and play back their previous games, step by step.
#### 🎯 Stretch Requirements:
-   ✅ Use some Chess Engine package to evaluate the game at each step during playback.
-   ✅ Different time controls and increment options for players.
-   ❌ Computer-controlled chess bot players can play against.
-   ❌ Login system for users.
-   ❌ ELO Rating System.

## 🧑‍💻 Technologies (Units 1-5)

 ### **HTML, CSS, and JS**
> - Castle & Conquer employs React to produce HTML elements, employing JavaScript components that engage with the Document Object Model (DOM). Our application embraces CSS via the widely recognized TailwindCSS framework. Leveraging Tailwind, we implement styling across diverse components without conventional CSS, streamlining comprehensive theme administration. Since React is intrinsically rooted in JavaScript, we extensively utilize JavaScript both in our front-end and our NodeJS/Express backend.
 ### **React.js and Redux**
> - Castle and Conquer's prime objective is to allow for intuitive, seamless, and lag-free gameplay which is facilitated by React's capabilities to create a single-page application with logically segregated components like the chessboard and side panel view. It also allowed us to use props to allow for real-time updates (serviced by socket.io) on the front end. Redux plays a critical role in maintaining a global state that serves as a single source of truth. It allows for data to be communicated between multiple components in the front end, primarily for the chess database view, using Redux reducers. In addition, Redux's middleware and Middlethunk were used to handle asynchronous actions between the backend and frontend.
 ### **Node.js and Express.js**
> - Node & Express are pivotal to Castle & Conquer communication with our MongoDB database, serving as a REST API for storing and retrieving user data and games. It also serves as the endpoint for our room system which established the entire client-server architecture and enables the application to send important data such as player information and game state. This architecture serves as the base for socket.io to enable real-time communication.
 ### **MongoDB**
> - Castle and Conquer stores game data and user information using MongoDB, a NoSQL database. We leverage MongoDB's flexible document-based structure and efficient querying and management in order to have a functioning chess database allowing our users to store, retrieve and replay games seamlessly. This also doubles as a storage option for future developments like a login system.
 ### **Render (Deployment)**
> - Castle & Conquer is deployed on Render, segmented into two parts—the frontend website, accessible at [Castle & Conquer](https://jamdk-chess-frontend.onrender.com/), and our backend servers — running NodeJS & Express and instances of chess.js engines, also hosted on Render.

## ✨ Above and Beyond:
### Stockfish AI
Our app features an Analysis view, accessible while replaying a game. This view integrates an AI engine model (Stockfish AI) to enable the game's per-move evaluation feature.
In order to achieve this we had to -
  - Conduct extensive research on how to communicate with the universal chess interface's protocols.
  - Optimize features on how to optimize the performance of this by applying concurrency programming with JavaScript's web workers.
  - Learn and implement methods to scale and normalize information from stockfish engine information.

### Socket.io Integration
Our app has the capabilities of real-time communication between a server and multiple clients. This was a result of socket.io integration, which we built atop our Node.js backend. Since socket.io was a completely new technology to us and was out of the scope of this course, it served us with an initial challenge. To tackle said challenge we had to -
- Conduct extensive research on the capabilities of socket.io, including its inbuilt room system.
- Define a payload that could transfer all necessary data between the backend and the frontend effectively in real-time without being load intensive on the server.
- Establish guidelines for the emitting and receiving socket events using aliases.
- Compartmentalize socket events based on chess events into various socket handlers.


## 🔮 Future of Castle & Conquer (Description of Next Steps)
- Add a login system that allows users to save their games in our chess database. This also allows for a username-based invite system and a friend system. A barebones login system was in the works by Jason Lai but was scrapped due to logistical reasons.
- Extend our existing Stockfish AI framework (being used for game analysis) to enable players to play against an AI-controlled bot with varying difficulties.
- Develop and deploy a persistent leaderboard or player rating system, built upon the login system.
- Other QOL changes, like allowing players to change the theme of the board.

## 🌟 Contributors
- [Dan Blustein](https://github.com/wallstarr):
   - Worked with Mihir Bhandari to design and implement the entire backend, primarily handling chess game logic.
   - Implemented game storage and retrieval in the backend from our MongoDB database with Kevin Dang.
   - Collaborated with Alex Nguyen to implement the analysis feature using the Stockfish.js library.
   - Major bug finding and fixes towards the end of the project.
- [Mihir Bhandari](https://github.com/VexMihir):
   - Worked with Dan Blustein to design and implement the entire backend, primarily the room system and timer logic.
   - Revamaped the front from our initial UI to a more seamless and pleasing front end which was more intuitive
   - Collaborated with Alex Nguyen to style and format the front end for the PrevGameView component.
   - Major bug finding and fixes towards the end of the project.
   - Served as the point of contact in order to ensure timely progress to meet deadlines.
- [Kevin Dang](https://github.com/kdang243):
  - Implemented game storage and retrieval in the backend from our MongoDB database with Dan Bluestein.
  - Implemented chess game logic using chess.js library to the backend, includes validing legal moves of chess pieces, game states and handling end-game scenarios.
  - Created UI elements for timer and its increment options.
  - Deployed the backend as a web service and frontend as a static site using Render.
- [Alex Nguyen](https://github.com/AlexNgGit): 
  - Parsed information from the database and implemented the front end to display the information using React and Redux.
  - Implemented the playback feature based on the information from the MongoDB database.
  - Collaborated with Dan Blustein to implement the analysis feature using the Stockfish.js library.
  - Collaborated with Mihir Bhandari to style and format the front end for the PrevGameView component.
  - Major bug finding and fixes towards the end of the project.
- [Jason Lai](https://github.com/jason0770):
   - Implemented the main chessboard that serves as the primary part of the application.
   - Implemented the valid-moves feature that allowed users to see the available moves per piece.
   - Implemented the two buttons which allow players to forfeit and make a draw offer 
   - Designed the side panel, a part of the in-game view that showed player, spectator, and game information
 
## 👾 Known Bugs
> - Currently reloading a page on some elements leads to 404 Not Found. This is due to React and Render's limited capacity while deploying static webpages. A potential fix was in the works but was left unfinished due to time constraints
> - Render's free service has occasionally issues keeping up with the number of requests our backend can actively handle.
---

📣 Please refer to old.README.md for the design document of the app, including prototype sketches.

📣 This application was designed and developed using AI tools like ChatGPT and Github Copilot.
