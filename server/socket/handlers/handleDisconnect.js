/**
 * Handle Disconnect
 * This module handles the disconnection of a client from a room.
 */

const { EVENTS } = require('../aliases');

/**
 * Handle client disconnection from a room.
 * @param {Object} io - The Socket.IO server instance.
 * @param {Object} socket - The socket instance representing the client.
 * @param {Object} rooms - The object storing room information.
 */
const handleDisconnect = (io, socket, rooms) => () => {
    console.log('Client disconnected');
    const roomNumber = Object.keys(rooms).find((key) =>
        rooms[key].players.some(player => player.id === socket.id) ||
        rooms[key].spectators.some(spectator => spectator.id === socket.id)
    );
    if (roomNumber) {
        rooms[roomNumber].players = rooms[roomNumber].players.filter(player => player.id !== socket.id);
        rooms[roomNumber].spectators = rooms[roomNumber].spectators.filter(spectator => spectator.id !== socket.id);

        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };
        io.to(roomNumber).emit(EVENTS.USER_LIST_UPDATE, userList);
        io.to(roomNumber).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber);
    }
};

module.exports = {handleDisconnect};