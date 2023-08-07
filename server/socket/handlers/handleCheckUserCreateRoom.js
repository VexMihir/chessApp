const { EVENTS } = require('../aliases');

const handleCheckUserCreateRoom = (io, socket, rooms) => () => {
    console.log("line 4", socket.id);
    console.log("line 5", rooms);

    if (rooms) {
        const roomValues = Object.values(rooms);
        for (let i = 0; i < roomValues.length; i++) {
            if (roomValues[i].owner === socket.id) {
                console.log(`Owner has already created a room.`);
                socket.emit("is user created room", true);
            }
        }
    }

};

module.exports = { handleCheckUserCreateRoom };