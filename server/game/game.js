/**
 * ChessGame Module
 * This module provides a constructor for a chess game and various methods to interact with the game.
 */

const { Chess } = require("chess.js");

/**
 * Constructor for a Chess Game
 * @constructor
 */
function ChessGame() {
    this.game = new Chess()

    /**
     * Check if a given FEN is valid.
     * @param {string} fen - The FEN string to be validated.
     * @returns {boolean} - True if the FEN is valid, false otherwise.
     */
    this.isValidFEN = function(fen) {
        return Chess.validateFen(fen).valid;
    };

    /**
     * Get the current FEN of the game.
     * @returns {string} - The current FEN string.
     */
    this.getCurrentFEN = function() {
        return this.game.fen();
    };
    
    /**
     * Get the state of the game.
     * @returns {Object} - The game state object.
     */
    this.getGameState = function() {
        return {
            gameOver: this.game.isGameOver(),
            inCheckmate: this.game.isCheckmate(),
            inDraw: this.game.isDraw(),
            drewByStalemate: this.game.isStalemate(),
            drewByThreefoldRepetition: this.game.isThreefoldRepetition(),
            drewByInsufficientMaterial: this.game.isInsufficientMaterial()
        };
    };

    /**
     * Get the history of the game.
     * @returns {Array} - Array of move objects representing the game history.
     */
    this.getGameHistory = function() {
        return this.game.history({ verbose: true });
    };

    /**
     * Get valid moves for a given square or all squares.
     * @param {string|null} square - Optional. The square for which to get valid moves.
     * @returns {Array} - Array of valid move strings.
     */
    this.validMoves = function(square=null) {
        if (!square) {
            return this.game.moves();
        } else {
            return this.game.moves({ square: square });
        }
    };

    /**
     * Move a chess piece.
     * @param {string} move - The move string (in standard algebraic notation) representing the move.
     * @returns {Object} - Object containing move information, current FEN, and valid moves after the move.
     * @throws {Error} - If the move is invalid.
     */
    this.movePiece = function(move) {
        let temp = this.game.move(move);
        if (temp === null) {
          throw new Error(`Invalid move: ${move}`);
        }

        let validMoves = this.validMoves('-1');
        return {move: temp.san, FEN: this.getCurrentFEN(), validMoves: validMoves};
    };

    /**
     * Move a chess piece with promotion.
     * @param {string} from - The starting square of the move.
     * @param {string} to - The target square of the move.
     * @param {string|null} promotionChoice - The chosen promotion piece (optional).
     * @returns {Object} - Object containing move information, current FEN, and valid moves after the move.
     * @throws {Error} - If the move is invalid.
     */
    this.movePieceWithPromotion = function(from , to, promotionChoice) {
        let temp = null;
        if (promotionChoice) {
            temp = this.game.move({from: from, to: to, promotion: promotionChoice})
        } else {
            temp = this.game.move({from: from, to: to})
        }

        if (temp === null) {
            throw new Error(`Invalid move: ${move}`)
        }
        let validMoves = this.validMoves('-1');
        return {move: temp.san, FEN: this.getCurrentFEN(), validMoves: validMoves}
    }
}

module.exports = ChessGame;
