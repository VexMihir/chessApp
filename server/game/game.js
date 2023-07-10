const { Chess } = require("chess.js");

// constructor for a chess game
function ChessGame(state) {
    this.game = state === "-1" ? new Chess() : new Chess(state);

    this.isValidFEN = function(fen) {
        return Chess.validateFen(fen).valid;
    };

    this.getCurrentFEN = function() {
        return this.game.fen();
    };

    this.getGameState = function() {
        return {
            gameOver: this.game.isGameOver(),
            inCheckmate: this.game.isCheckmate(),
            inDraw: this.game.isDraw(),
            drewByStalemate: this.game.isStalemate(),
            drewByThreefoldRepetition: this.game.isThreefoldRepetition(),
            drewByInsufficientMaterial: this.game.isInsufficientMaterial(),
        };
    };

    this.validMoves = function(square=null) {
        if (!square) {
            return this.game.moves();
        } else {
            return this.game.moves({ square: square });
        }
    };

    this.movePiece = function(move) {
        let temp = this.game.move(move);
        if (temp === null) {
          throw new Error(`Invalid move: ${move}`);
        }

        let validMoves = this.validMoves('-1');
        return {move: temp.san, FEN: this.getCurrentFEN(), validMoves: validMoves};
    };

    // testing function
    this.showBoard = function() {
        console.log(this.game.ascii());
    };
}

module.exports = ChessGame;

// // Test cases
// let game = new ChessGame('-1');
// game.showBoard();
// try {
//     game.movePiece('e3');
//     game.showBoard();
//     game.movePiece('f6');
//     game.showBoard();
//     game.movePiece('f4');
//     game.showBoard();
//     game.movePiece('g5');
//     game.showBoard();
//     game.movePiece('Qh5');
//     game.showBoard();
// } catch (error) {
//     console.error(error.message);
// }
