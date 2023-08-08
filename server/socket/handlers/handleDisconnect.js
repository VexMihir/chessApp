const { EVENTS } = required('../aliases') 

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
