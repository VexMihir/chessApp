const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');

const checkRoomExists = (rooms, roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        return false;
    }
    return true;
};

const handleGameMove = (game, move, io, roomNumber) => {
    try {
        const pieceMove = game.movePiece(move);
        const currentFen = game.getCurrentFEN();
        const validMoves = game.validMoves();
        console.log(`Valid moves: ${validMoves}`)
        io.to(roomNumber).emit('moveMade', move, currentFen, validMoves);
    } catch (error) {
        console.log(error);
        socket.emit('errorMoving', `Error moving: ${error}`);
    }
};

const handleDraw = (gameState, io, roomNumber) => {
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
};

const handleCheckmate = (gameState, io, roomNumber) => {
    // TODO handle checkmate, emit events, etc
};

const handleMove = (io, socket, rooms) => (roomNumber, move) => {
    if (!checkRoomExists(rooms, roomNumber)) {
        socket.emit('error', `Error moving: room ${roomNumber} does not exist`);
        return;
    }

    const game = rooms[roomNumber].game;
    handleGameMove(game, move, io, roomNumber);
    const gameState = game.getGameState();
    
    if (gameState.gameOver){
        handleDraw(gameState, io, roomNumber);
        handleCheckmate(gameState, io, roomNumber);
        pushHistoryToMongoAndManageDB(game, roomNumber);
    }
};

module.exports = { handleMove };
