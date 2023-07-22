const { EVENTS } = require('../aliases');

const handleJoinRoom = (io, socket, rooms) => (roomNumber, username) => {

    console.log("line 5", roomNumber, username);

    const WHITE = "white";
    const BLACK = "black";

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
            rooms[roomNumber].players.push({ id: socket.id, username: username, color: color });
            if (rooms[roomNumber].players.length === 2) {
              rooms[roomNumber].currentPlayer = rooms[roomNumber].players[0].color == WHITE ? rooms[roomNumber].players[0].id :rooms[roomNumber].players[1].id;
              timers = rooms[roomNumber].timers
              // set both players' timers to 5 minutes
              timers[rooms[roomNumber].players[0].id] = 300;
              timers[rooms[roomNumber].players[1].id] = 300;
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

    const userList = {
        players: rooms[roomNumber].players,
        spectators: rooms[roomNumber].spectators
    };
    io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
}

module.exports = {handleJoinRoom};