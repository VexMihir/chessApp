"Ever dreamt of ruling the chessboard from the comfort of your couch? 🛋️ Say hello to ChessRumble, where you can reign as the grandmaster of real-time online chess! 🏆 Battle friends, rivals, or even foes across the globe, and dive into our captivating game archive to relive your most epic victories! 🌟 It's time to unleash your strategic prowess and conquer the chess world like never before! 🎉 Checkmate boredom with ChessRumble now!"


# CPSC 455 Project 
**Team Name:** JAMDK

**Team Members:** Dan Blustein, Mihir Bhandari, Jason Lai, Alex Nguyen, Kevin Dang

## Design Document
This project implements an online chess game with multiplayer functionality. The application will allow its users to match and play chess games over the internet. The application will provide real-time updates, handle network issues and allow the retrieval and playback of saved games.

**Primary Technologies:** Node.js, Express.js, Socket.io, React.js, MongoD and CSS (Tailwind).

### Project Description

-   Who is it for?
	- People that want to play Chess with friends over the Internet.
        - People who want to spectate or replay chess games.
- What will it do?
	- It would allow people to join a room (like slither.io or agar.io) and play a chess game. More than 2 people should be able to join the room, 2 people play at a time while the others can spectate.
-   What are some additional functionalities?
	-   Users can view previously played games, as well as rating systems per user.
   	-   Furthermore, users would be able to evaluate how good their moves are while looking back through previous games.
	-   Furthermore, the UI would be refined, showing users the legal moves whenever a piece is selected on the board.
-   What type of data will it store?
	-   Games will be stored and are represented by PGN (Portable Game Notation), and usernames of the players as well as the result of the games.

### Project task requirements

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
-   ⚠️ Use some Chess Engine package to evaluate the game at each step during playback.
-   ❌ Computer-controlled chess bot players can play against.
-   ⚠️ Login system for users.
-   ❌ ELO Rating System.
### Task Breakdown of Two Minimal Requirements:
####    Allow players to play Chess over the internet
  -   Develop the game logic locally without any dependency on networking, meaning two players could play on a single machine.
		-   Rules of Chess
	    -   Playing the game (eg: a console version that is pass and play.)
-   Representing the state of a game move by move.
    -   This is the intermediary step between developing the rules of Chess and developing the networking side that allows two users to play over the internet.
    -   Implement an efficient way to save and send the state of the game between two machines in real-time using Socket.io
-   Implement a synchronized timer functionality so that players will lose time when it is their turn.
#### Be able to represent a Chess Game through a UI built from React and CSS
-   Design a board with all the necessary chess pieces.
-   Implement interactive moves for each chess piece according to its type through the mouse’s drag and drop.
-   Design an animation or other kind of indication for users to see what the next legal moves are for specific chess pieces.
-   Implement a clock for users to observe the time spent within the match.
-   Design a notification that can be observed when the game is over (if a player is checkmated if a player resigns, if there is a stalemate, or if a player accepts a draw.)
-   From retrieved information sent by the back-end and database, create an interactive board that allows the users to observe the game’s past moves.

### Sketch Prototypes
#### Sketch 1: Join Room Screen
![Sketch 1](https://github.com/VexMihir/chessApp/blob/main/sketches/Prototype%20Sketch%201.jpg)
- To create a room, the player only needs to input their chosen name and the system would generate a unique room ID.
- To join a room, you would need a room ID and input a chosen name.
#### Sketch 2: In-game view
![Sketch 2](https://github.com/VexMihir/chessApp/blob/main/sketches/Prototype%20Sketch%202.jpg)
- **The timer box:** Signifies timer box for the players. This would be counting down based on the option that the player chose when creating the chess game.
- **User list:** Shows the current users in the room, both spectators and current players
- **Room Info:** This shows the room ID, the number of users in the room, etc
- **Previous Moves List:** Shows the moves that have been made so far. This also shows in the algebraic notation of chess moves.
- **Forfeit:** Only current players can click this. Forfeits the game and they lose
- **Offer Draw:** Offers a draw to the other player, if they accept then the game is drawn, if not then the game goes on.

#### Sketch 3: Spectator/Viewing Previous Games View
![Sketch 3](https://github.com/VexMihir/chessApp/blob/main/sketches/Prototype%20Sketch%203.jpg)
*Any elements mentioned in Sketch 2 are the same.*
- **<< Button:** Skips the game back to the view when the game has just started (i.e., the first move being made)
- **< Button:** Moves the game view back to the previous move. If the game is on the first move then nothing happens
- **> Button:** Moves the game view to the next move. If the game is on the most recent move then nothing happens
- **>> Button:** Skips the game view to the most recent move/game-ending move (ie, end of the game)
- **Dashed Vertical Bar:** Shows the analysis bar, evaluating which player is ahead, by how many points. (Stretch requirement #2)
