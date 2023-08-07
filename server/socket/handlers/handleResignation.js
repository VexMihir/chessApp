const { EVENTS } = require('../aliases');
const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');

const handleResignation = (io, socket, rooms, gameModel, gameSchema) => (roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit(EVENTS.ERROR, `Error resigning: room ${roomNumber} does not exist`);
        return;
    }

    const room = rooms[roomNumber];

    if (room.players.length !== 2) {
        console.log(`Cannot resign, not enough players in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error resigning: not enough players`);
        return;
    }

    const resigningPlayer = room.players.find(player => player.id === socket.id);
    const winningPlayer = room.players.find(player => player.id !== socket.id);

    if (!resigningPlayer) {
        console.log(`Player ${socket.id} not found in room ${roomNumber}`);
        socket.emit(EVENTS.ERROR, `Error resigning: you are not in the game`);
        return;
    }

    room.winner = winningPlayer.color + " wins by Resignation"; // other player wins
    clearInterval(rooms[roomNumber].timer);
    rooms[roomNumber].timer = null;
    pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
    room.players.forEach(player => {
        io.to(player.id).emit(EVENTS.RESIGNATION, resigningPlayer.username);
    });


    room.spectators.forEach(spectator => {
        io.to(spectator.id).emit(EVENTS.RESIGNATION, resigningPlayer.username);
    });
};

module.exports = { handleResignation };
