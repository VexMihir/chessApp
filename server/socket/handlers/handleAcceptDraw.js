const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');

const handleAcceptDraw = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error accepting draw: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot accept draw, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error accepting draw: not enough players`);
        return;
    }

    if (!room.drawOffer || room.drawOffer.status !== OFFERED_DRAW_STATES.OFFERED) {
        console.log(`No draw offer to accept in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `No draw offer to accept`);
        return;
    }

    room.drawOffer.status = OFFERED_DRAW_STATES.ACCEPTED;

    room.players.forEach(player => {
        io.to(player.id).emit(EVENTS.DRAW_ACCEPTED);
    });

    // Set the game result to draw
    room.winner = "Draw by Agreement";
};

module.exports = { handleAcceptDraw };
