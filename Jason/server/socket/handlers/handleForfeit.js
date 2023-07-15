const { EVENTS } = require('../aliases');

const handleForfeit = (io, socket, rooms) => (roomNumber, socketId) => {
    if (rooms[roomNumber].players[0].id === socketId) {
        io.to(roomNumber).emit('forfeit sent', rooms[roomNumber].players[0].color[0]);                    
    } else if (rooms[roomNumber].players[1].id === socketId) {
        io.to(roomNumber).emit('forfeit sent', rooms[roomNumber].players[1].color[0]);                   
    }
}

module.exports = {handleForfeit};