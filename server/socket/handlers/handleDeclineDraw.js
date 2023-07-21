const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');

const handleDeclineDraw = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error declining draw: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot decline draw, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error declining draw: not enough players`);
        return;
    }

    if (!room.drawOffer || room.drawOffer.status !== OFFERED_DRAW_STATES.OFFERED) {
        console.log(`No draw offer to decline in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `No draw offer to decline`);
        return;
    }

    if (room.drawOffer.by === socket.id) {
        console.log(`Player ${socket.id} attempted to decline draw offer made by themselves`);
        socket.emit(EVENTS.ERROR, `You can't decline a draw offer made by you`);
        return;
    }

    room.drawOffer.status = OFFERED_DRAW_STATES.DECLINED;

    const playerWhoOfferedDraw = room.players.find(player => player.id === room.drawOffer.by).id;
    io.to(playerWhoOfferedDraw).emit(EVENTS.DRAW_DECLINED, socket.id);
};

module.exports = { handleDeclineDraw };
