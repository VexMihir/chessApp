/**
 * Handle Offer Draw
 * This module handles the offering of a draw in a room.
 */

const { EVENTS, OFFERED_DRAW_STATES } = require('../aliases');

/**
 * Handle the offering of a draw in a room.
 * @param {Object} io - The Socket.IO server instance.
 * @param {Object} socket - The socket instance representing the client.
 * @param {Object} rooms - The object storing room information.
 */
const handleOfferDraw = (io, socket, rooms) => (roomNumber) => {

    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error offering draw: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot offer draw, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error offering draw: not enough players`);
        return;
    }

    room.drawOffer = {
        status: OFFERED_DRAW_STATES.OFFERED,
        by: socket.id,
    };

    const otherPlayerId = room.players.find(player => player.id !== socket.id).id;
    io.to(otherPlayerId).emit(EVENTS.DRAW_OFFERED, socket.id);
};

module.exports = { handleOfferedDraw: handleOfferDraw };
