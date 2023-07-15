const { EVENTS } = require('../aliases');

const handleGameStart = (io, socket, rooms) => (roomNumber) => {
    console.log("line 4");
      let timer = null;
      const startTimer = (roomNumber) => {
        timer = setInterval(() => {
          const currentPlayer = rooms[roomNumber].currentPlayer;
          if (rooms[roomNumber].timers[currentPlayer] > 0) {
            rooms[roomNumber].timers[currentPlayer]--;
            io.to(roomNumber).emit('time update', rooms[roomNumber].timers, rooms[roomNumber].players);
          } else {
            // Source: https://chat.openai.com/share/ad2055de-45b4-4974-9909-2840ec3ea4db
            clearInterval(timer);
          }
        }, 1000); 
        rooms[roomNumber].timer = timer;
      };
    if (rooms[roomNumber]) {

        if (rooms[roomNumber].players.length === 2) {
            let timers = rooms[roomNumber].timers
            // set both players' timers to 5 minutes
            timers[rooms[roomNumber].players[0].id] = 300;
            timers[rooms[roomNumber].players[1].id] = 300;

            io.to(roomNumber).emit(EVENTS.START_GAME, rooms[roomNumber].game.validMoves());
            startTimer(roomNumber);
        }
        
                    
    } else {
        console.log(`Room ${roomNumber} does not exist`);
    }
}

module.exports = {handleGameStart};