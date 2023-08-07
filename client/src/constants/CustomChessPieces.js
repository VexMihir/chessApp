import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../constants/customChessPiece"
export const CUSTOM_CHESS_PIECES = {
    wK: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.KING}
      </div>
    ),
    wR: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.ROOK}
      </div>
    ),
    wN: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.KNIGHT}
      </div>
    ),
    wB: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.BISHOP}
      </div>
    ),
    wQ: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.QUEEN}
      </div>
    ),
    wP: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {WHITE_CHESS_PIECE.PAWN}
      </div>
    ),
    bK: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.KING}
      </div>
    ),
    bR: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.ROOK}
      </div>
    ),
    bN: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.KNIGHT}
      </div>
    ),
    bB: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.BISHOP}
      </div>
    ),
    bQ: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.QUEEN}
      </div>
    ),
    bP: () => (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        {BLACK_CHESS_PIECE.PAWN}
      </div>
    ),
  }