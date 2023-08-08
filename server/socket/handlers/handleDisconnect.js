const { EVENTS } = require('../aliases');

const handleDisconnect = (io, socket, rooms) => () => {
    console.log('Client disconnected');
    
    const roomNumber = Object.keys(rooms).find((key) =>
        rooms[key].players.some(player => player.id === socket.id) ||
        rooms[key].spectators.some(spectator => spectator.id === socket.id)
    );
    
    if (roomNumber) {
        // const isPlayerDisconnecting = rooms[roomNumber].players.some(player => player.id === socket.id);
        
        rooms[roomNumber].players = rooms[roomNumber].players.filter(player => player.id !== socket.id);
        rooms[roomNumber].spectators = rooms[roomNumber].spectators.filter(spectator => spectator.id !== socket.id);
        console.log("line 14");
        const userList = {
            players: rooms[roomNumber].players,
            spectators: rooms[roomNumber].spectators
        };

        const room = rooms[roomNumber];

        room.players.forEach(player => {
            console.log("line 23", player);
            // io.to(player.id).emit(EVENTS.USER_LIST_UPDATE, userList)
            io.to(player.id).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber)
        });
        room.spectators.forEach(spectator => {
            console.log("line 27", spectator);
            io.to(spectator.id).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber);
        });

        
        // // make roomNumber a number, currently a string
        // let roomNumberAsNumber = Number(roomNumber);

        // io.to(roomNumberAsNumber).emit(EVENTS.USER_LIST_UPDATE, userList);

        // // Emit PLAYER_DISCONNECTED only if a player is disconnecting
        // if (isPlayerDisconnecting) {
        //     io.to(roomNumberAsNumber).emit(EVENTS.PLAYER_DISCONNECTED, roomNumber);
        // }
    }
};

module.exports = { handleDisconnect };
