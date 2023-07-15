// const getPGN = (game, io, roomNumber) => {
//     try {
//         io.to(roomNumber).emit('pgn sent', game.getHistory())
//     } catch (error) {
//         console.log(error);
//     }
// }

const handlePGN = (io, rooms) => (roomNumber) => {
    const game = rooms[roomNumber].game;
    console.log("line 10");
    try {
        io.to(roomNumber).emit('pgn sent', game.getHistory())
    } catch (error) {
        console.log(error);
    }
}
module.exports = { handlePGN };