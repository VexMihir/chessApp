/**
 * Handle Check Room Full Module
 *
 * This module provides functionality to check whether a game room is full or not.
 * It is used in the context of a multiplayer online chess game to determine if a room
 * has reached its maximum capacity of players.
 *
 * The module checks the current status of the specified room by analyzing the number of players
 * present in the room. If the room has two players, it is considered full; otherwise, it is not full.
 *
 * @module handleCheckRoomFull
 */

const { EVENTS } = require('../aliases');


/**
 * Handle Check Room Full
 * This module handles the checking of whether a room is full.
 * @param {Object} io - The Socket.IO server instance.
 * @param {Object} socket - The socket instance representing the client.
 * @param {Object} rooms - The object storing room information.
 */

const handleCheckRoomFull = (io, socket, rooms) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error checking room is full: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Not full in room ${roomNumber}`);
        socket.emit(EVENTS.CHECK_IF_ROOM_FULL, false);
        return;
    }

    if (room.players.length === 2) {
        console.log(`Full in room ${roomNumber}`);
        socket.emit(EVENTS.CHECK_IF_ROOM_FULL, true);
        return;
    }

};

module.exports = { handleCheckRoomFull };