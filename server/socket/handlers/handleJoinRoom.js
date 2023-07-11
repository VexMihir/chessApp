const handleJoinRoom = (io, socket, rooms) => (roomNumber, username) => {
    if (rooms[roomNumber]) {
        if (rooms[roomNumber].players.length < 2) {
            socket.join(roomNumber);
            let color = 'white';
            if (rooms[roomNumber].players.length === 1) {
              color = 'black';
            }
            rooms[roomNumber].players.push({ id: socket.id, username, color });
            if (rooms[roomNumber].players.length === 2) {
              rooms[roomNumber].currentPlayer = rooms[roomNumber].players[0].id;
              io.to(roomNumber).emit('start game');
            }
        } else {
            socket.emit('room full', roomNumber);
            console.log(`User ${socket.id} attempted to join room ${roomNumber}, which is full`);
        }
    } else {
        console.log(`Room ${roomNumber} does not exist`);
    }

    const userList = {
        players: rooms[roomNumber].players,
        spectators: rooms[roomNumber].spectators
    };
    io.to(roomNumber).emit('user list update', userList);
}

module.exports = {handleJoinRoom};