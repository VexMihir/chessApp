const handleMove = (io, socket, rooms) => (roomNumber, move) => {
    if (rooms[roomNumber]) {
        game = rooms[roomNumber].game;
        try {
            pieceMove = game.movePiece(move);
            currentFen = game.getCurrentFEN();
            validMoves = game.validMoves();
            console.log(`Valid moves: ${validMoves}`)
            io.to(roomNumber).emit('moveMade', move, currentFen, validMoves);
            gameState = game.getGameState();
            gameIsOver = gameState.gameOver;
            if (gameIsOver) {
                if (gameState.inDraw()) {
                    let drawReason;
                    if (gameState.inStalemate()) {
                        drawReason = 'stalemate';
                    } else if (gameState.inThreefoldRepetition()) {
                        drawReason = 'threefold repetition';
                    } else if (gameState.inInsufficientMaterial()) {
                        drawReason = 'insufficient material';
                    } else {
                        drawReason = 'fifty move rule';
                    }
                    io.to(roomNumber).emit('draw', drawReason);
                }
            }
        } catch (error) {
            console.log(error);
            socket.emit('errorMoving', `Error moving: ${error}`);
            return;
        }
    } else {
        console.log(`Room ${roomNumber} does not exist`);
        socket.emit('error', `Error moving: room ${roomNumber} does not exist`);
    }
};

module.exports = {handleMove};