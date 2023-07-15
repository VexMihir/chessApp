const getValidPieceMove = (game, io, roomNumber, square) => {
    try {
        io.to(roomNumber).emit('valid move sent', game.validMoves(square), game.validMovesNotation(square))
    } catch (error) {
        console.log(error);
    }
}

const handleValidMove = (io, socket, rooms) => (roomNumber, square) => {
    const game = rooms[roomNumber].game;
    getValidPieceMove(game, io, roomNumber, square);

}
module.exports = { handleValidMove };