const { EVENTS } = require('../aliases');

const handleResignation = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error resigning: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot resign, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error resigning: not enough players`);
        return;
    }

    const resigningPlayer = room.players.find(player => player.id === socket.id);
    const winningPlayer = room.players.find(player => player.id !== socket.id);

    if (!resigningPlayer) {
        console.log(`Player ${socket.id} not found in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error resigning: you are not in the game`);
        return;
    }

    room.winner = winningPlayer.color; // other player wins

    room.players.forEach(player => {
        io.to(player.id).emit(EVENTS.RESIGNATION, resigningPlayer.username);
    });
};

module.exports = { handleResignation };
