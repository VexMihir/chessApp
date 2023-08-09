/**
 * Handle Join As Spectator
 * This module handles adding a user as a spectator to a specific room.
 */

const { EVENTS } = require('../aliases');

/**
 * Handle user joining a room as a spectator.
 * @param {Object} io - The Socket.IO instance.
 * @param {Object} socket - The Socket.IO socket object.
 * @param {Object} rooms - The object containing room data.
 * @returns {Function} - The function to handle the join operation.
 */
const handleJoinAsSpectator = (io, socket, rooms) => (roomNumber, username) => {
    // Check if the room exists
    if (rooms[roomNumber]) {
        // Join the socket to the room
        socket.join(roomNumber);
        rooms[roomNumber].spectators.push({ id: socket.id, username });
        
        console.log(`User ${socket.id} joined as a spectator in room ${roomNumber}`);

        // Emit updated user list to all clients in the room
        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };

        io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
        const game = rooms[roomNumber].game;

        const currentFEN = game.getCurrentFEN();
        socket.emit(EVENTS.GAME_CURRENT_FEN, currentFEN)
        const currentHistory = game.getGameHistory()
        socket.emit(EVENTS.GAME_CURRENT_HISTORY, currentHistory)


    } else {
        console.log(`Room ${roomNumber} does not exist`);
    }
};

module.exports = {handleJoinAsSpectator};