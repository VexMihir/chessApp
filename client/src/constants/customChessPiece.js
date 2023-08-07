export const RESULT = {
    WHITE: "1-0", // black forfeits or black king is in checkmate
    BLACK: "0-1", // white forfeits or white king is in checkmate
    DRAW: "1/2-1/2", // stalemate, offer a draw
    UNFINISHED: "*", // internet disconnection or user closes the app or login out or a default value
  };
  
// Source: https://www.i2symbol.com/symbols/chess
export const WHITE_CHESS_PIECE = {
    KING: "♔",
    QUEEN: "♕",
    BISHOP: "♗",
    KNIGHT: "♘",
    ROOK: "♖",
    PAWN: "♙",
};

// Source: https://www.i2symbol.com/symbols/chess
export const BLACK_CHESS_PIECE = {
    KING: "♚",
    QUEEN: "♛",
    BISHOP: "♝",
    KNIGHT: "♞",
    ROOK: "♜",
    PAWN: "♟",
};