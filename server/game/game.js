const { Chess } = require("chess.js");

let game;

// constructor for a chess game
// to create a brand new game, let state be string '-1' when calling constructor
// otherwise, input state of the game in FEN notation (more info on chess.js readme)
// throws exception if invalid FEN string is provided
function createGame(state) {
    if (state == "-1") {
        game = new Chess();
      } else {
        game = new Chess(state);
      }
}

// returns a list of valid moves in PGN notation like ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', ... ]
// let boardSquare be string '-1' for a list of ALL possible moves on the board
// let boardSquare be the square number of the board to see list of possible moves for that square ie. 'e5', 'h1' or 'f3' etc
function validMoves(boardSquare) {
    if (boardSquare == "-1") {
        // TODO: change to return statement when integrating to frontend
        console.log(game.moves());
      } else {
        // TODO: same as above consolelog -> return
        console.log(game.moves({ square: boardSquare }));
      }
}

// returns the successful move in SAN notation
// throw error if its an invalid move
// let move be a valid move in PGN notation of type string like Nf6 etc
function movePiece(move) {
    let temp = game.move(move);
    console.log(temp.san);
    // checking if game is over after every move
    if (game.isGameOver()) {
      // TODO: integration with front end UI when game is over
      console.log("GAME IS OVER");
      // TODO: can add different graphics for different endgame scenarios
      // (checkmate, stalemate, draw, threefold repetition, or insufficient material)
    }
}

// show board testing function, shows board in ascii in command line
function showBoard() {
    console.log(game.ascii())
}


// Simple knight move test
// createGame('-1')
// validMoves('-1')
// validMoves('b1')
// showBoard()
// movePiece('Na3')
// showBoard()
// validMoves('Na3')

// quickest win, checking for game over condition
// createGame('-1')
// showBoard()
// movePiece('e3')
// showBoard()
// movePiece('f6')
// showBoard()
// movePiece('f4')
// showBoard()
// movePiece('g5')
// showBoard()
// movePiece('Qh5')
// showBoard()