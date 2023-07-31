const { EVENTS } = require('../aliases');
const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');


const handleJoinRoom = (io, socket, rooms, gameModel, gameSchema) => (roomNumber, username, callback) => {

    console.log("line 5", roomNumber, username);

    const WHITE = "White";
    const BLACK = "Black";

    const startingColor = () => {
        const randomizer = Math.floor(Math.random() * 2);
        if (randomizer > 0.5) {
          return BLACK;
        } else {
          return WHITE;
        }
      };

      const getOppositeColor = (firstPlayerColor) =>{
        if (firstPlayerColor == WHITE) {
            return BLACK;
        } else {
            return WHITE;
        }
      };

      const startTimer = (roomNumber) => {
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
              rooms[roomNumber].currentPlayer = rooms[roomNumber].players[0].color == WHITE ? rooms[roomNumber].players[0].id :rooms[roomNumber].players[1].id;
              timers = rooms[roomNumber].timers


              // set both players' timers to 5 minutes
              timers[rooms[roomNumber].players[0].id] = 300;
              timers[rooms[roomNumber].players[1].id] = 300;
              io.to(roomNumber).emit(EVENTS.START_GAME);
              startTimer(roomNumber);

            }
            callback({
              status: 'room not full'
            })
            // Source: https://chat.openai.com/share/555afdd9-5894-43a2-a8f2-81e9103d5855
            socket.emit('room not full', roomNumber)
        } else {
            callback({
              status: 'room full'
            })
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
      // error handling...
      // room does not exist
    }
    io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
}

module.exports = {handleJoinRoom};