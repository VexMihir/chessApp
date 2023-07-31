const { EVENTS } = require('../aliases');

const handleJoinAsSpectator = (io, socket, rooms) => (roomNumber, username) => {
    if (rooms[roomNumber]) {
        socket.join(roomNumber);
        // 
        let isSpectatorsFound = false
        for (let i = 0; i < rooms[roomNumber].spectators.length; i++) {
            if (socket.id === rooms[roomNumber].spectators[i].id) {
                isSpectatorsFound = true
                break;
            }
        } 
        if (!isSpectatorsFound) {
            rooms[roomNumber].spectators.push({ id: socket.id, username });
        } else {
            socket.emit('error', `Error: User ${socket.id} already joined the room as a spectator in room ${roomNumber}`);
        }

        console.log(`User ${socket.id} joined as a spectator in room ${roomNumber}`);

        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };
        io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
    } else {
        console.log(`Room ${roomNumber} does not exist`);
    }
};

module.exports = {handleJoinAsSpectator};