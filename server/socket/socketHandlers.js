const { handleJoinRoom } = require('./handlers/handleJoinRoom');
const { handleJoinAsSpectator } = require('./handlers/handleJoinAsSpectator');
const { handleMove } = require('./handlers/handleMove');
const { handleDisconnect } = require('./handlers/handleDisconnect');

CONNECTION = 'connection';

let rooms;

const init = (io, roomInstance) => {
    rooms = roomInstance;
    io.on(CONNECTION, (socket) => {
        console.log('New client connected');
        socket.on('join room', handleJoinRoom(io, socket, rooms));
        socket.on('join as spectator', handleJoinAsSpectator(io, socket, rooms));
        socket.on('move', handleMove(io, socket, rooms));
        socket.on('disconnect', handleDisconnect(io, socket, rooms));
    });
};

module.exports = { init };
