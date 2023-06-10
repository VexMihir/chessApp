import React, {useState} from 'react'
import './style.css'
import Grid from './Grid'


// Source: https://www.i2symbol.com/symbols/chess
const WHITE_CHESS_PIECE = {
    KING:   "♔",
    QUEEN:  "♕",
    BISHOP: "♗",
    KNIGHT: "♘",
    ROOK:   "♖",
    PAWN:   "♙"
}

// Source: https://www.i2symbol.com/symbols/chess
const BLACK_CHESS_PIECE = {
    KING:   "♚",
    QUEEN:  "♛",
    BISHOP: "♝",
    KNIGHT: "♞",
    ROOK:   "♜",
    PAWN:   "♟"
}

// Source: https://react-dnd.github.io/react-dnd/docs/tutorial
export default function Chessboard() {
  const [board, setBoard] = useState([
    [
      WHITE_CHESS_PIECE.ROOK,
      WHITE_CHESS_PIECE.KNIGHT,
      WHITE_CHESS_PIECE.BISHOP,
      WHITE_CHESS_PIECE.QUEEN,
      WHITE_CHESS_PIECE.KING,
      WHITE_CHESS_PIECE.BISHOP,
      WHITE_CHESS_PIECE.KNIGHT,
      WHITE_CHESS_PIECE.ROOK,
    ],
    [
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
      WHITE_CHESS_PIECE.PAWN,
    ],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
      BLACK_CHESS_PIECE.PAWN,
    ],
    [
      BLACK_CHESS_PIECE.ROOK,
      BLACK_CHESS_PIECE.KNIGHT,
      BLACK_CHESS_PIECE.BISHOP,
      BLACK_CHESS_PIECE.KING,
      BLACK_CHESS_PIECE.QUEEN,
      BLACK_CHESS_PIECE.BISHOP,
      BLACK_CHESS_PIECE.KNIGHT,
      BLACK_CHESS_PIECE.ROOK,
    ],
  ]);

  return (
    <>
      <div className="chessboard__main">
        {board.map((row, rowIndex) => (
          <>
            <div className="chessboard__row">
              {row.map((col, colIndex) => (
                <Grid rowId={rowIndex} colId={colIndex} chessPiece={col} />
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
