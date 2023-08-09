/**
 * Handle Move
 * This module handles player moves and related game logic.
 */

const {pushToMongoAndManageDB} = require('./pushToMongoAndManageDB');
const { EVENTS, DRAW_REASONS } = require('../aliases');


/**
 * Check if the room exists.
 * @param {Object} rooms - The object containing room data.
 * @param {string|number} roomNumber - The room number to check.
 * @returns {boolean} - True if the room exists, false otherwise.
 */
const checkRoomExists = (rooms, roomNumber) => {
    if (!rooms[roomNumber]) {
        console.log(`Room ${roomNumber} does not exist`);
        return false;
    }
    return true;
};

/**
 * Handle non-offered draw scenarios.
 * @param {Object} gameState - The current game state.
 * @param {Object} io - The Socket.IO instance.
 * @param {string|number} roomNumber - The room number.
 * @param {Object} rooms - The object containing room data.
 */
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

        const room = rooms[roomNumber];
        room.players.forEach(player => {
            io.to(player.id).emit(EVENTS.GAME_OVER_DRAW, drawReason);
        });
        room.spectators.forEach(spectator => {
            io.to(spectator.id).emit(EVENTS.GAME_OVER_DRAW, drawReason);
        });
    }
};

/**
 * Handle non-offered draw scenarios.
 * @param {Object} gameState - The current game state.
 * @param {Object} io - The Socket.IO instance.
 * @param {string|number} roomNumber - The room number.
 * @param {Object} rooms - The object containing room data.
 */
const handleCheckmate = (gameState, io, roomNumber, rooms) => {
    if (gameState.inCheckmate) {
        const currentPlayer = rooms[roomNumber].players.find(player => player.id === rooms[roomNumber].currentPlayer);
        const winningPlayerColor = currentPlayer.color === 'White' ? 'Black' : 'White';
        // For the room, set the winner to the player who is not the current player
        
        rooms[roomNumber].winner = winningPlayerColor + " wins by Checkmate";

        const room = rooms[roomNumber];
        room.players.forEach(player => {
            io.to(player.id).emit(EVENTS.CHECKMATE, `${winningPlayerColor}`);
        });
        room.spectators.forEach(spectator => {
            io.to(spectator.id).emit(EVENTS.CHECKMATE, `${winningPlayerColor}`);
        });
    }
};

/**
 * Handle game over scenarios.
 * @param {Object} io - The Socket.IO instance.
 * @param {string|number} roomNumber - The room number.
 * @param {Object} rooms - The object containing room data.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameSchema - The mongoose game schema.
 * @param {Object} gameModel - The mongoose game model.
 */
const handleGameOver = (io, roomNumber, rooms, gameState, gameSchema, gameModel) => {
    handleNonOfferedDraw(gameState, io, roomNumber, rooms);
    handleCheckmate(gameState, io, roomNumber, rooms);
    pushToMongoAndManageDB(rooms[roomNumber], gameSchema, gameModel);
    clearInterval(rooms[roomNumber].timer);
};

/**
 * Handle player move.
 * @param {Object} io - The Socket.IO instance.
 * @param {Object} socket - The Socket.IO socket object.
 * @param {Object} rooms - The object containing room data.
 * @param {Object} gameSchema - The mongoose game schema.
 * @param {Object} gameModel - The mongoose game model.
 * @returns {Function} - The function to handle the move operation.
 */
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

    try {
        if (promotionChoice) {
            game.movePieceWithPromotion(from, to, promotionChoice)
        } else {
            game.movePieceWithPromotion(from, to)
        }
        const currentFen = game.getCurrentFEN();
        const validMoves = game.validMoves();
        const history = game.getGameHistory();

        const room = rooms[roomNumber];
        room.players.forEach(player => {
            io.to(player.id).emit(EVENTS.MOVE_MADE, to, currentFen, validMoves, history);
        });
        room.spectators.forEach(spectator => {
            io.to(spectator.id).emit(EVENTS.MOVE_MADE, to, currentFen, validMoves, history);
        });

    } catch (error) {
        const room = rooms[roomNumber];
        room.players.forEach(player => {
            io.to(player.id).emit(EVENTS.ERROR_MOVING, `Error moving: ${error}`);
        });

        console.log(`Error moving: ${error}`)
        return
    }

    const gameState = game.getGameState();
  
    // switch the current player after a valid move
    const nextPlayer = rooms[roomNumber].players.find(player => player.id !== currentPlayer).id;
    rooms[roomNumber].currentPlayer = nextPlayer;

    // add increment to currentPlayer's timer
    rooms[roomNumber].timers[currentPlayer] += rooms[roomNumber].increment;
  
    if (gameState.gameOver) {

        handleGameOver(io, roomNumber, rooms, gameState, gameSchema, gameModel) 
    }
};

module.exports = { handleMove };
