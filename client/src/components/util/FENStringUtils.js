// // Return the first field of FEN - piece placement
// function getPiecePlacementInString(fenString) {
//   return fenString.split(" ")[0];
// }

// Source: https://www.i2symbol.com/symbols/chess
export const WHITE_CHESS_PIECE = {
  KING: "w♔1",
  QUEEN: "w♕1",
  BISHOP: "w♗1",
  KNIGHT: "w♘1",
  ROOK: "w♖1",
  PAWN: "w♙1",
};

// Source: https://www.i2symbol.com/symbols/chess
export const BLACK_CHESS_PIECE = {
  KING: "b♚1",
  QUEEN: "b♛1",
  BISHOP: "b♝1",
  KNIGHT: "b♞1",
  ROOK: "b♜1",
  PAWN: "b♟1",
};



// Source: https://www.javascripttutorial.net/javascript-private-methods/
class FENStrinUtils {
  static getPiecePlacementInFENString(piecePlacement2DArray) {
    const board = piecePlacement2DArray;

    console.log("getPiecePlacementInFENString: ");
    let FENString = "";
    for (let i = 0; i < board.length; i++) {
      let count = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === " ") {
          count += 1;
        } else {
          if (count > 0) {
            FENString += count;
            count = 0;
          }
          const chessPieceFENString = board[i][j];
          if (chessPieceFENString[0] === "b") {
            FENString += this.#getBlackPieceFENString(chessPieceFENString);
          } else {
            FENString += this.#getWhitePieceFENString(chessPieceFENString);
          }
        }
      }
      if (count > 0) {
        FENString += count;
        count = 0;
      }
      if (i !== board.length - 1) {
        FENString += "/";
      }
    }
    return FENString
  }

  static getPiecePlacementIn2DArray(piecePlacementString) {
    const piecePlacementRows = piecePlacementString.split("/");
    const board = [];
    for (let i = 0; i < piecePlacementRows.length; i++) {
      const chessPieceFENStrings = piecePlacementRows[i].split("");
      const row = [];
      for (let j = 0; j < chessPieceFENStrings.length; j++) {
        // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
        if (!isNaN(chessPieceFENStrings[j])) {
          let number = chessPieceFENStrings[j] * 1;
          while (number > 0) {
            row.push(" ");
            number--;
          }
        } else {
          // If the chessPieceFENString is white
          //Source: https://www.programiz.com/javascript/examples/ascii-value-character#:~:text=In%20the%20above%20program%2C%20the,index%20value%20will%20be%200.
          if (
            chessPieceFENStrings[j].charCodeAt(0) <= 90 &&
            chessPieceFENStrings[j].charCodeAt(0) >= 65
          ) {
            row.push(this.#getWhitePieceSymbol(chessPieceFENStrings[j]));
          } else {
            // if the chessPieceFenString is black
            row.push(this.#getBlackPieceSymbol(chessPieceFENStrings[j]));
          }
        }
      }
      board.push(row);
    }
    return board;
  }

  static #getBlackPieceFENString(chessPieceSymbol) {
    if (chessPieceSymbol === " ") {
      return " ";
    }

    console.log(
      "line 95",
      chessPieceSymbol,
      BLACK_CHESS_PIECE.ROOK,
      chessPieceSymbol === BLACK_CHESS_PIECE.ROOK
    );

    if (chessPieceSymbol === BLACK_CHESS_PIECE.ROOK) {
      return "r";
    }

    if (chessPieceSymbol === BLACK_CHESS_PIECE.KNIGHT) {
      return "n";
    }

    if (chessPieceSymbol === BLACK_CHESS_PIECE.BISHOP) {
      return "b";
    }

    if (chessPieceSymbol === BLACK_CHESS_PIECE.QUEEN) {
      return "q";
    }

    if (chessPieceSymbol === BLACK_CHESS_PIECE.KING) {
      return "k";
    }

    if (chessPieceSymbol === BLACK_CHESS_PIECE.PAWN) {
      return "p";
    }
  }

  static #getWhitePieceFENString(chessPieceSymbol) {
    if (chessPieceSymbol === " ") {
      return " ";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.ROOK) {
      return "R";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.KNIGHT) {
      return "N";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.BISHOP) {
      return "B";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.QUEEN) {
      return "Q";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.KING) {
      return "K";
    }

    if (chessPieceSymbol === WHITE_CHESS_PIECE.PAWN) {
      return "P";
    }
  }

  static #getBlackPieceSymbol(chessPieceFENString) {
    if (chessPieceFENString === "") {
      return " ";
    }

    if (chessPieceFENString === "r") {
      return BLACK_CHESS_PIECE.ROOK;
    }

    if (chessPieceFENString === "n") {
      return BLACK_CHESS_PIECE.KNIGHT;
    }

    if (chessPieceFENString === "b") {
      return BLACK_CHESS_PIECE.BISHOP;
    }

    if (chessPieceFENString === "q") {
      return BLACK_CHESS_PIECE.QUEEN;
    }

    if (chessPieceFENString === "k") {
      return BLACK_CHESS_PIECE.KING;
    }

    if (chessPieceFENString === "p") {
      return BLACK_CHESS_PIECE.PAWN;
    }
  }

  static #getWhitePieceSymbol(chessPieceFENString) {
    if (chessPieceFENString === "") {
      return " ";
    }

    if (chessPieceFENString === "R") {
      return WHITE_CHESS_PIECE.ROOK;
    }

    if (chessPieceFENString === "N") {
      return WHITE_CHESS_PIECE.KNIGHT;
    }

    if (chessPieceFENString === "B") {
      return WHITE_CHESS_PIECE.BISHOP;
    }

    if (chessPieceFENString === "Q") {
      return WHITE_CHESS_PIECE.QUEEN;
    }

    if (chessPieceFENString === "K") {
      return WHITE_CHESS_PIECE.KING;
    }

    if (chessPieceFENString === "P") {
      return WHITE_CHESS_PIECE.PAWN;
    }
  }

  
}



export default FENStrinUtils;

// const row1 = [{a8: "0:0", }]









// const [board3, setBoard3] = useState([
//   [
//     {a8: WHITE_CHESS_PIECE.ROOK,
//     b8: WHITE_CHESS_PIECE.KNIGHT,
//     c8: WHITE_CHESS_PIECE.BISHOP,
//     d8: WHITE_CHESS_PIECE.QUEEN,
//     e8: WHITE_CHESS_PIECE.KING,
//     f8: WHITE_CHESS_PIECE.BISHOP,
//     g8: WHITE_CHESS_PIECE.KNIGHT,
//     h8: WHITE_CHESS_PIECE.ROOK},
//   ],
//   [
//     {a7: WHITE_CHESS_PIECE.PAWN,
//     b7: WHITE_CHESS_PIECE.PAWN,
//     c7: WHITE_CHESS_PIECE.PAWN,
//     d7: WHITE_CHESS_PIECE.PAWN,
//     e7: WHITE_CHESS_PIECE.PAWN,
//     f7: WHITE_CHESS_PIECE.PAWN,
//     g7: WHITE_CHESS_PIECE.PAWN,
//     h7: WHITE_CHESS_PIECE.PAWN}
//   ],
//   [
//     {a6: " ", 
//     b6: " ", 
//     c6: " ", 
//     d6: " ", 
//     e6: " ", 
//     f6: " ", 
//     g6: " ", 
//     h6: " "}
//   ],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//   ],
//   [
//     BLACK_CHESS_PIECE.ROOK,
//     BLACK_CHESS_PIECE.KNIGHT,
//     BLACK_CHESS_PIECE.BISHOP,
//     BLACK_CHESS_PIECE.KING,
//     BLACK_CHESS_PIECE.QUEEN,
//     BLACK_CHESS_PIECE.BISHOP,
//     BLACK_CHESS_PIECE.KNIGHT,
//     BLACK_CHESS_PIECE.ROOK,
//   ],
// ]);









// const [board2, setBoard2] = useState([
//   [
//     WHITE_CHESS_PIECE.ROOK,
//     WHITE_CHESS_PIECE.KNIGHT,
//     WHITE_CHESS_PIECE.BISHOP,
//     WHITE_CHESS_PIECE.QUEEN,
//     WHITE_CHESS_PIECE.KING,
//     WHITE_CHESS_PIECE.BISHOP,
//     WHITE_CHESS_PIECE.KNIGHT,
//     WHITE_CHESS_PIECE.ROOK,
//   ],
//   [
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//     WHITE_CHESS_PIECE.PAWN,
//   ],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " "],
//   [
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//     BLACK_CHESS_PIECE.PAWN,
//   ],
//   [
//     BLACK_CHESS_PIECE.ROOK,
//     BLACK_CHESS_PIECE.KNIGHT,
//     BLACK_CHESS_PIECE.BISHOP,
//     BLACK_CHESS_PIECE.KING,
//     BLACK_CHESS_PIECE.QUEEN,
//     BLACK_CHESS_PIECE.BISHOP,
//     BLACK_CHESS_PIECE.KNIGHT,
//     BLACK_CHESS_PIECE.ROOK,
//   ],
// ]);
