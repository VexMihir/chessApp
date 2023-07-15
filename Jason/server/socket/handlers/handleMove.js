const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');
const { EVENTS, DRAW_REASONS } = require('../aliases');

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
        // console.log(`Piece moves: ${pieceMove["move"]} ${pieceMove["FEN"]} ${pieceMove["validMoves"]}`)
        io.to(roomNumber).emit(EVENTS.MOVE_MADE, move, currentFen, validMoves);
    } catch (error) {
        console.log(error);
        socket.emit(EVENTS.ERROR_MOVING, `Error moving: ${error}`);
    }
};



const handleNonOfferedDraw = (gameState, io, roomNumber) => {
    if (gameState.inDraw) {
        let drawReason;
        if (gameState.inStalemate) {
            drawReason = DRAW_REASONS.STALEMATE;
        } else if (gameState.inThreefoldRepetition) {
            drawReason = DRAW_REASONS.THREEFOLD_REPETITION;
        } else if (gameState.inInsufficientMaterial) {
            drawReason = DRAW_REASONS.INSUFFICIENT_MATERIAL;
        } else {
            drawReason = DRAW_REASONS.FIFTY_MOVE_RULE;
        }
        io.to(roomNumber).emit(EVENTS.GAME_OVER_DRAW, drawReason);
    }
};

const handleCheckmate = (gameState, io, roomNumber) => {
    if (gameState.inCheckmate) {
        io.to(roomNumber).emit(EVENTS.CHECKMATE, true)
    }
    // TODO handle checkmate, emit events, etc
};

const handleMove = (io, socket, rooms, gameSchema, gameModel) => (roomNumber, move, square) => {
    if (!checkRoomExists(rooms, roomNumber)) {
        socket.emit('error', `Error moving: room ${roomNumber} does not exist`);
        return;
    }
    const game = rooms[roomNumber].game;
    const currentPlayer = rooms[roomNumber].currentPlayer;

    if (socket.id !== currentPlayer) {
        socket.emit(EVENTS.ERROR, `It's not your turn`);
        console.log(`User ${socket.id} attempted to move when it's not their turn`)
        return;
    }

    // getValidPieceMove(game, io, roomNumber, square);

    handleGameMove(game, move, io, roomNumber);
    const gameState = game.getGameState();

    
  
    // switch the current player after a valid move
    rooms[roomNumber].currentPlayer = rooms[roomNumber].players.find(player => player.id !== currentPlayer).id;
  
    if (gameState.gameOver){
        handleNonOfferedDraw(gameState, io, roomNumber);
        handleCheckmate(gameState, io, roomNumber);
        // pushHistoryToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
    }
};

module.exports = { handleMove };
