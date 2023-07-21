const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');
const { EVENTS, DRAW_REASONS } = require('../aliases');

const checkRoomExists = (rooms, roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        return false;
    }
    return true;
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
        rooms[roomNumber].winner = "Draw"
        io.to(roomNumber).emit(EVENTS.GAME_OVER_DRAW, drawReason);
    }
};

const handleCheckmate = (gameState, io, roomNumber, rooms) => {
    if (gameState.inCheckmate) {
        console.log("in checkmate")
        const currentPlayer = rooms[roomNumber].players.find(player => player.id === rooms[roomNumber].currentPlayer);
        const winningPlayerColor = currentPlayer.color === 'White' ? 'Black' : 'White';
        // For the room, set the winner to the player who is not the current player
        rooms[roomNumber].winner = winningPlayerColor
        io.to(roomNumber).emit(EVENTS.CHECKMATE, `${winningPlayerColor}`);
    }
};

const handleMove = (io, socket, rooms, gameSchema, gameModel) => (roomNumber, move) => {
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

    try {
        const pieceMove = game.movePiece(move);
        const currentFen = game.getCurrentFEN();
        const validMoves = game.validMoves();
        const history = game.getHistory();
        io.to(roomNumber).emit(EVENTS.MOVE_MADE, move, currentFen, validMoves, history);
    } catch (error) {
        io.to(roomNumber).emit(EVENTS.ERROR_MOVING, `Error moving: ${error}`);
        console.log(`Error moving: ${error}`)
        return
    }

    const gameState = game.getGameState();
  
    // switch the current player after a valid move
    rooms[roomNumber].currentPlayer = rooms[roomNumber].players.find(player => player.id !== currentPlayer).id;
  
    if (gameState.gameOver) {
        handleNonOfferedDraw(gameState, io, roomNumber);
        handleCheckmate(gameState, io, roomNumber, rooms);
        // this was pushHistoryToMongoAndManageDB before, changed it to pushToMongoAndManageDB -kevin
        pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
    }
};

module.exports = { handleMove };
