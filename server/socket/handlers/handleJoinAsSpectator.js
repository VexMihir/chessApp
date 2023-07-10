const handleJoinAsSpectator = (io, socket, rooms) => (roomNumber, username) => {
    if (rooms[roomNumber]) {
        socket.join(roomNumber);
        rooms[roomNumber].spectators.push({ id: socket.id, username });
        console.log(`User ${socket.id} joined as a spectator in room ${roomNumber}`);

        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };
        io.to(roomNumber).emit('user list update', userList);
    } else {
        console.log(`Room ${roomNumber} does not exist`);
    }
};

module.exports = {handleJoinAsSpectator};