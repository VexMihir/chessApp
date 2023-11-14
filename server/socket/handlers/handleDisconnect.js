
/**
 * Handle Disconnect
 * This module handles the disconnection of a client from a room. 
 * In such an event the game is ended.
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

        // We should only remove spectators if they disconnect, not players. If a player disconnects, the game should end.
        rooms[roomNumber].spectators = rooms[roomNumber].spectators.filter(spectator => spectator.id !== socket.id);
        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };

        const room = rooms[roomNumber];

        room.players.forEach(player => {
            io.to(player.id).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber)
        });
        room.spectators.forEach(spectator => {
            io.to(spectator.id).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber);
        });

    }
};

module.exports = { handleDisconnect };
