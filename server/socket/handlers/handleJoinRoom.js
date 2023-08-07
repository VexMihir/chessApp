/**
 * Handle Join Room
 * This module handles the logic when a player joins a room.
 */

const { EVENTS } = require('../aliases');
const { pushToMongoAndManageDB } = require('./pushToMongoAndManageDB');


const handleJoinRoom = (io, socket, rooms, gameModel, gameSchema) => (roomNumber, username, callback) => {

  console.log("line 5", roomNumber, username);

  const WHITE = "White";
  const BLACK = "Black";

  /**
   * Determine the starting color for the player.
   * @returns {string} - The starting color ("White" or "Black").
   */
  const startingColor = () => {
    const randomizer = Math.floor(Math.random() * 2);
    if (randomizer > 0.5) {
      return BLACK;
    } else {
      return WHITE;
    }
  };

  /**
   * Get the opposite color for the given color.
   * @param {string} firstPlayerColor - The color of the first player.
   * @returns {string} - The opposite color ("White" or "Black").
   */
  const getOppositeColor = (firstPlayerColor) => {
    if (firstPlayerColor == WHITE) {
      return BLACK;
    } else {
      return WHITE;
    }
  };

   /**
   * Start a timer for the specified room.
   * @param {string} roomNumber - The room number.
   */
  const startTimer = (roomNumber) => {
    if (rooms[roomNumber].timer) return;

    const timer = setInterval(() => {
      const currentPlayer = rooms[roomNumber].currentPlayer;
      rooms[roomNumber].timers[currentPlayer]--;
      io.to(roomNumber).emit('time update', rooms[roomNumber].timers);

      // Check if a player's timer has run out
      if (rooms[roomNumber].timers[currentPlayer] == 0 && rooms[roomNumber].players.length === 2) {
        const winningColor = currentPlayer === rooms[roomNumber].players[0].id ? rooms[roomNumber].players[1].color : rooms[roomNumber].players[0].color;
        io.to(roomNumber).emit('timeout', winningColor);
        rooms[roomNumber].winner = winningColor + " wins by Timeout"; // other player wins
        pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
        clearInterval(rooms[roomNumber].timer);
      }
      // Emit a socket event to notify the clients that the game is over
    }, 1000);

    rooms[roomNumber].timer = timer;
  };

  if (rooms[roomNumber]) {
    if (rooms[roomNumber].players.length < 2) {
      socket.join(roomNumber);
      let color = startingColor();
      if (rooms[roomNumber].players.length === 1) {
        firstPlayerColor = rooms[roomNumber].players[0].color;
        color = getOppositeColor(firstPlayerColor);
      }
      let isPlayersFound = false
            for (let i = 0; i < rooms[roomNumber].players.length; i++) {
              if (socket.id === rooms[roomNumber].players[i].id) {
                isPlayersFound = true
                break;
              }
            } 
            if (!isPlayersFound) {
              rooms[roomNumber].players.push({ id: socket.id, username: username, color: color });
            } else {
              socket.emit('error', `Error: User ${socket.id} already joined the room as a player in room ${roomNumber}`);
            }

      if (rooms[roomNumber].players.length === 2) {
        rooms[roomNumber].currentPlayer = rooms[roomNumber].players[0].color == WHITE ? rooms[roomNumber].players[0].id : rooms[roomNumber].players[1].id;
        if (!rooms[roomNumber].timers[rooms[roomNumber].players[0].id]) {
          timers = rooms[roomNumber].timers;

          // set both players' timers to time control
          timers[rooms[roomNumber].players[0].id] = rooms[roomNumber].timeControl;
          timers[rooms[roomNumber].players[1].id] = rooms[roomNumber].timeControl;
        }
        io.to(roomNumber).emit(EVENTS.START_GAME);
        startTimer(roomNumber);

      }
    } else {
      socket.emit(EVENTS.ROOM_FULL, roomNumber);
      console.log(`User ${socket.id} attempted to join room ${roomNumber}, which is full`);
    }
  } else {
    console.log(`Room ${roomNumber} does not exist`);
  }

  let userList = {}
  if (rooms[roomNumber] !== undefined && rooms[roomNumber].players !== undefined && rooms[roomNumber].spectators !== undefined) {
    userList = {
      players: rooms[roomNumber].players,
      spectators: rooms[roomNumber].spectators
    };
  } else {
    // TODO: ??
    // error handling...
    // room does not exist
  }
  io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
}

module.exports = { handleJoinRoom };




