const { EVENTS } = require('../aliases');

const handleOfferDraw = (io, socket, rooms) => (roomNumber, socketId) => {

    if (rooms[roomNumber].players[0].id === socketId) {
        console.log("line 8");
        
        //Source: https://chat.openai.com/share/b3d02524-26bb-4680-a699-c1d26e8287a1
        io.to(rooms[roomNumber].players[1].id).emit('offer draw sent', rooms[roomNumber].players, socketId);                    
    } else if (rooms[roomNumber].players[1].id === socketId) {
        console.log("line 12");
        //Source: https://chat.openai.com/share/b3d02524-26bb-4680-a699-c1d26e8287a1
        io.to(rooms[roomNumber].players[0].id).emit('offer draw sent', rooms[roomNumber].players, socketId);                   
    }
}

module.exports = {handleOfferDraw};