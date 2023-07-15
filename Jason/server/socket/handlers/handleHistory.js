const getHistory = (game, io, roomNumber) => {
    try {
        io.to(roomNumber).emit('history sent', game.getHistory())
    } catch (error) {
        console.log(error);
    }
}

const handleHistory = (io, rooms) => (roomNumber) => {
    const game = rooms[roomNumber].game;
    getHistory(game, io, roomNumber);

}
module.exports = { handleHistory };