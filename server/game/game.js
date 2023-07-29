const { Chess } = require("chess.js");

// constructor for a chess game
function ChessGame() {
    this.game = new Chess()

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

    this.getGameHistory = function() {
        return this.game.history({ verbose: true });
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

    this.movePiece2 = function(from , to, promotionChoice) {
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

    // testing function
    this.showBoard = function() {
        console.log(this.game.ascii());
    };
}

module.exports = ChessGame;
