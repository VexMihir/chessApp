const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');
const { EVENTS, DRAW_REASONS } = require('../aliases');

const checkRoomExists = (rooms, roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        return false;
    }
    return true;
};

const handleNonOfferedDraw = (gameState, io, roomNumber, rooms) => {
    if (gameState.inDraw) {
        let drawReason;
        if (gameState.drewByStalemate) {
            drawReason = DRAW_REASONS.STALEMATE;
            rooms[roomNumber].winner = "Draw by Stalemate"
        } else if (gameState.drewByThreefoldRepetition) {
            drawReason = DRAW_REASONS.THREEFOLD_REPETITION;
            rooms[roomNumber].winner = "Draw by Threefold Repetition"
        } else if (gameState.drewByInsufficientMaterial) {
            drawReason = DRAW_REASONS.INSUFFICIENT_MATERIAL;
            rooms[roomNumber].winner = "Draw by Insufficient Material"
        } else if (gameState.drewByInsufficientMaterial) {
            drawReason = DRAW_REASONS.FIFTY_MOVE_RULE;
            rooms[roomNumber].winner = "Draw by Fifty Move Rule"
        }

        io.to(roomNumber).emit(EVENTS.GAME_OVER_DRAW, drawReason);
    }
};

const handleCheckmate = (gameState, io, roomNumber, rooms) => {
    if (gameState.inCheckmate) {
        console.log("in checkmate")
        const currentPlayer = rooms[roomNumber].players.find(player => player.id === rooms[roomNumber].currentPlayer);
        const winningPlayerColor = currentPlayer.color === 'White' ? 'Black' : 'White';
        // For the room, set the winner to the player who is not the current player
        
        rooms[roomNumber].winner = winningPlayerColor + " wins by Checkmate";
        io.to(roomNumber).emit(EVENTS.CHECKMATE, `${winningPlayerColor}`);
    }
};

const handleGameOver = (io, roomNumber, rooms, gameState, gameSchema, gameModel) => {
    handleNonOfferedDraw(gameState, io, roomNumber, rooms);
    handleCheckmate(gameState, io, roomNumber, rooms);
    pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
    clearInterval(rooms[roomNumber].timer);
};

const handleMove = (io, socket, rooms, gameSchema, gameModel) => (roomNumber, from, to, promotionChoice) => {
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

    console.log("line 55");
    try {
        // console.log("line 57", roomNumber, move);
        // const pieceMove = game.movePiece(move);
        if (promotionChoice) {
            const pieceMove = game.movePieceWithPromotion(from, to, promotionChoice)
        } else {
            const pieceMove = game.movePieceWithPromotion(from, to)
        }
        const currentFen = game.getCurrentFEN();
        const validMoves = game.validMoves();
        const history = game.getGameHistory();
        // io.to(roomNumber).emit(EVENTS.MOVE_MADE, to, currentFen, validMoves, history);

        const room = rooms[roomNumber];
        // this one will be executed twice
        room.players.forEach(player => {
            io.to(player.id).emit('moveMade', to, currentFen, validMoves, history);
        });
        room.spectators.forEach(spectator => {
            io.to(spectator.id).emit('moveMade', to, currentFen, validMoves, history);
        });

        console.log("move", to);
        console.log("currentFen", currentFen);
        console.log("validMoves", validMoves);
        console.log("history", history);
    } catch (error) {
        io.to(roomNumber).emit(EVENTS.ERROR_MOVING, `Error moving: ${error}`);
        console.log(`Error moving: ${error}`)
        return
    }

    const gameState = game.getGameState();
  
    // switch the current player after a valid move
    rooms[roomNumber].currentPlayer = rooms[roomNumber].players.find(player => player.id !== currentPlayer).id;
  
    if (gameState.gameOver) {
        handleGameOver(io, roomNumber, rooms, gameState, gameSchema, gameModel) 
    }
};

module.exports = { handleMove };
