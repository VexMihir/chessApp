const { EVENTS } = require('../aliases');

const handleCheckRoomFull = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error checking room is full: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Not full in room ${roomNumber}`);
        socket.emit(EVENTS.CHECK_IF_ROOM_FULL, false);
        return;
    }

    if (room.players.length === 2) {
        console.log(`Full in room ${roomNumber}`);
        socket.emit(EVENTS.CHECK_IF_ROOM_FULL, true);
        return;
    }

};

module.exports = { handleCheckRoomFull };