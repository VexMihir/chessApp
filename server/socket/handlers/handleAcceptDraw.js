/**
 * Handle Accept Draw
 * This module handles the acceptance of a draw offer in a room.
 * Emits appropriate socket events and pushed the game to the databse if the draw is accepeted
 */

const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');
const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');


/**
 * Handle the acceptance of a draw offer in a room.
 * @param {Object} io - The Socket.IO server instance.
 * @param {Object} socket - The socket instance representing the client.
 * @param {Object} rooms - The object storing room information.
 * @param {Object} gameModel - The Mongoose model for the game.
 * @param {Object} gameSchema - The Mongoose schema for the game.
 */
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

    delete rooms[roomNumber];
};

module.exports = { handleAcceptDraw };
