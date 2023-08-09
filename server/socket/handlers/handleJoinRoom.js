/**
 * Handle Join Room
 * This module handles the logic when a player joins a room.
 */

const { EVENTS } = require('../aliases');
const { pushToMongoAndManageDB } = require("./pushToMongoAndManageDB");

/**
 * Handle the logic when a player joins a room.
 * @param {Object} io - Socket.IO instance.
 * @param {Object} socket - The socket of the connected client.
 * @param {Object} rooms - Object containing information about rooms and players.
 * @param {Object} gameModel - The Mongoose model for game data.
 * @param {Object} gameSchema - The Mongoose schema for game data.
 * @returns {Function} - The function that handles joining a room.
 */
const handleJoinRoom =
  (io, socket, rooms, gameModel, gameSchema) => (roomNumber, username) => {
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
        rooms[roomNumber].timers[currentPlayer] -= rooms[roomNumber].decrement;
        io.to(roomNumber).emit(EVENTS.TIME_UPDATES, rooms[roomNumber].timers);

        // Check if a player's timer has run out
        if (
          rooms[roomNumber].timers[currentPlayer] == 0 &&
          rooms[roomNumber].players.length === 2
        ) {
          const winningColor =
            currentPlayer === rooms[roomNumber].players[0].id
              ? rooms[roomNumber].players[1].color
              : rooms[roomNumber].players[0].color;
          io.to(roomNumber).emit(EVENTS.TIMEOUT, winningColor);
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

        rooms[roomNumber].players.push({
          id: socket.id,
          username: username,
          color: color,
        });

        if (rooms[roomNumber].players.length === 2) {
          rooms[roomNumber].currentPlayer =
            rooms[roomNumber].players[0].color == WHITE
              ? rooms[roomNumber].players[0].id
              : rooms[roomNumber].players[1].id;
          if (!rooms[roomNumber].timers[rooms[roomNumber].players[0].id]) {
            timers = rooms[roomNumber].timers;

            // set both players' timers to time control
            timers[rooms[roomNumber].players[0].id] =
              rooms[roomNumber].timeControl;
            timers[rooms[roomNumber].players[1].id] =
              rooms[roomNumber].timeControl;

              console.log("line 110");
              console.log(rooms[roomNumber]);
          }
          io.to(roomNumber).emit(EVENTS.START_GAME);
          startTimer(roomNumber);
        }
      } else {
        socket.emit(EVENTS.ROOM_FULL, roomNumber);
        console.log(
          `User ${socket.id} attempted to join room ${roomNumber}, which is full`
        );
      }
    } else {
      socket.emit(EVENTS.ROOM_NOT_EXIST);
      console.log(`Room ${roomNumber} does not exist`);
    }

    let userList = {};
    if (
      rooms[roomNumber] !== undefined &&
      rooms[roomNumber].players !== undefined &&
      rooms[roomNumber].spectators !== undefined
    ) {
      userList = {
        players: rooms[roomNumber].players,
        spectators: rooms[roomNumber].spectators,
      };
    }
    io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
  };

module.exports = { handleJoinRoom };
