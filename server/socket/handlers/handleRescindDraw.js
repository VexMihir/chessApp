const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');

const handleRescindDraw = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error cancelling draw: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot cancel draw, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error cancelling draw: not enough players`);
        return;
    }

    if (!room.drawOffer || room.drawOffer.status !== OFFERED_DRAW_STATES.OFFERED) {
        console.log(`No draw offer to cancel in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `No draw offer to cancel`);
        return;
    }

    if (room.drawOffer.by !== socket.id) {
        console.log(`Player ${socket.id} attempted to cancel draw offer not made by them`);
        socket.emit(EVENTS.ERROR, `You can't cancel a draw offer not made by you`);
        return;
    }

    room.drawOffer.status = OFFERED_DRAW_STATES.RESCINDED;

    const otherPlayerId = room.players.find(player => player.id !== socket.id).id;
    io.to(otherPlayerId).emit(EVENTS.DRAW_RESCINDED, socket.id);
};

module.exports = { handleRescindDraw };
