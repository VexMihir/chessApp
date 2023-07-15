const { EVENTS } = require('../aliases');

const handleDraw = (io, socket, rooms) => (roomNumber, socketId) => {
    io.to(roomNumber).emit('draw sent');   
}

module.exports = {handleDraw};