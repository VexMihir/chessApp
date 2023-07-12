const { handleJoinRoom } = require('./handlers/handleJoinRoom');
const { handleJoinAsSpectator } = require('./handlers/handleJoinAsSpectator');
const { handleMove } = require('./handlers/handleMove');
const { handleDisconnect } = require('./handlers/handleDisconnect');

const { EVENTS } = require('./aliases');

let rooms;

const init = (io, roomInstance) => {
    rooms = roomInstance;
    io.on(EVENTS.CONNECTION, (socket) => {
        console.log('New client connected');
        socket.on(EVENTS.JOIN_ROOM, handleJoinRoom(io, socket, rooms));
        socket.on(EVENTS.JOIN_AS_SPECTATOR, handleJoinAsSpectator(io, socket, rooms));
        socket.on(EVENTS.MOVE, handleMove(io, socket, rooms));
        socket.on(EVENTS.DISCONNECT, handleDisconnect(io, socket, rooms));
    });
};

module.exports = { init };
