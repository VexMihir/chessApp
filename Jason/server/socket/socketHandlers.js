const { handleJoinRoom } = require('./handlers/handleJoinRoom');
const { handleJoinAsSpectator } = require('./handlers/handleJoinAsSpectator');
const { handleMove } = require('./handlers/handleMove');
const { handleDisconnect } = require('./handlers/handleDisconnect');
const { handleValidMove } = require('./handlers/handleValidMove');
const { handleHistory } = require('./handlers/handleHistory');
const { handleGameStart } = require('./handlers/handleGameStart');
const { handleForfeit } = require('./handlers/handleForfeit');
const { handleOfferDraw } = require('./handlers/handleOfferDraw');
const { handleDraw } = require('./handlers/handleDraw');
const { handlePGN } = require('./handlers/handlePGN');

const { EVENTS } = require('./aliases');

let rooms;

const init = (io, roomInstance, gameSchema, gameModel) => {
    rooms = roomInstance;
    io.on(EVENTS.CONNECTION, (socket) => {
        console.log('New client connected');
        socket.on(EVENTS.JOIN_ROOM, handleJoinRoom(io, socket, rooms));
        socket.on(EVENTS.JOIN_AS_SPECTATOR, handleJoinAsSpectator(io, socket, rooms));
        socket.on('valid move', handleValidMove(io, socket, rooms));
        socket.on('history', handleHistory(io, rooms));
        socket.on('pgn', handlePGN(io, rooms));
        socket.on('game start', handleGameStart(io, socket, rooms))
        socket.on('forfeit', handleForfeit(io, socket, rooms))
        socket.on('offer draw', handleOfferDraw(io, socket, rooms))
        socket.on('draw', handleDraw(io, socket, rooms))
        socket.on(EVENTS.MOVE, handleMove(io, socket, rooms, gameSchema, gameModel));
        socket.on(EVENTS.DISCONNECT, handleDisconnect(io, socket, rooms));
    });
};

module.exports = { init };
