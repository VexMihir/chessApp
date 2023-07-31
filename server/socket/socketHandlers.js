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

const { EVENTS } = require('./aliases');

let rooms;

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
        socket.on("is room full", handleCheckRoomFull(io, socket, rooms));
    });
};

module.exports = { init };