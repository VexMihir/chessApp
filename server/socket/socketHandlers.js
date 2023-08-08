/**
 * Socket Handlers
 * This file initializes Socket.IO event handlers for various game actions and interactions.
 */

const { handleJoinRoom } = require('./handlers/handleJoinRoom');
const { handleJoinAsSpectator } = require('./handlers/handleJoinAsSpectator');
const { handleMove } = require('./handlers/handleMove');
const { handleDisconnect } = require('./handlers/handleDisconnect');
const { handleOfferedDraw } = require('./handlers/handleOfferDraw');
const { handleAcceptDraw } = require('./handlers/handleAcceptDraw');
const { handleRescindDraw } = require('./handlers/handleRescindDraw');
const { handleDeclineDraw } = require('./handlers/handleDeclineDraw');
const { handleResignation } = require('./handlers/handleResignation')
const { handleCheckRoomFull } = require('./handlers/handleCheckRoomFull')

const { EVENTS } = require('../../aliases');

let rooms;

/**
 * Initialize socket handlers for different events.
 * @param {SocketIO.Server} io - Socket.IO server instance.
 * @param {object} roomInstance - The room instance.
 * @param {object} gameSchema - The game schema.
 * @param {object} gameModel - The game model.
 */

const init = (io, roomInstance, gameSchema, gameModel) => {
    rooms = roomInstance;
    io.on(EVENTS.CONNECTION, (socket) => {
        console.log('New client connected');
        socket.on(EVENTS.JOIN_ROOM, handleJoinRoom(io, socket, rooms, gameModel, gameSchema)); 
        socket.on(EVENTS.JOIN_AS_SPECTATOR, handleJoinAsSpectator(io, socket, rooms));
        socket.on(EVENTS.MOVE, handleMove(io, socket, rooms, gameSchema, gameModel));
        socket.on(EVENTS.DRAW_OFFERED, handleOfferedDraw(io, socket, rooms));
        socket.on(EVENTS.DRAW_ACCEPTED, handleAcceptDraw(io, socket, rooms, gameModel, gameSchema));
        socket.on(EVENTS.DRAW_RESCINDED, handleRescindDraw(io, socket, rooms));
        socket.on(EVENTS.DRAW_DECLINED, handleDeclineDraw(io, socket, rooms));
        socket.on(EVENTS.RESIGNATION, handleResignation(io, socket, rooms, gameModel, gameSchema));
        socket.on(EVENTS.DISCONNECT, handleDisconnect(io, socket, rooms));
        socket.on(EVENTS.CHECK_IF_ROOM_FULL, handleCheckRoomFull(io, socket, rooms));
    });
};

module.exports = { init };