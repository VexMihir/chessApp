const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');
const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');

const handleAcceptDraw = (io, socket, rooms, gameModel, gameSchema) => (roomNumber) => {
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
    clearInterval(rooms[roomNumber].timer);
    rooms[roomNumber].timer = null;

    room.players.forEach(player => {
        io.to(player.id).emit(EVENTS.DRAW_ACCEPTED);
    });

    room.spectators.forEach(spectator => {
        io.to(spectator.id).emit(EVENTS.DRAW_ACCEPTED);
    });

    // Set the game result to draw
    room.winner = "Draw by Agreement";
    pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
};

module.exports = { handleAcceptDraw };
