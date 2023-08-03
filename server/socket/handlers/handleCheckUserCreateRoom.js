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

    // if (!rooms[roomNumber]) {
    //     console.log(`Room ${roomNumber} does not exist`);
    //     socket.emit(EVENTS.ERROR, `Error checking room is full: room ${roomNumber} does not exist`);
    //     return;
    // }

    // const room = rooms[roomNumber];

    // if (room.players.length !== 2) {
    //     console.log(`Not full in room ${roomNumber}`);
    //     socket.emit('is room full', false);
    //     return;
    // }

    // if (room.players.length === 2) {
    //     console.log(`Full in room ${roomNumber}`);
    //     socket.emit('is room full', true);
    //     return;
    // }

};

module.exports = { handleCheckUserCreateRoom };