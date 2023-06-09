import React from "react";
import ChessPiece from "./ChessPiece";
export default function Row(props) {
  return(
    <>
      {props.rowId % 2 === 0 ? (
        props.colId % 2 === 0 ? (
          <div className={"chessboard__grid chessboard__grid_light"}>
            <ChessPiece chessPiece={props.chessPiece} />
          </div>
        ) : (
          <div className={"chessboard__grid chessboard__grid_dark"}>
            <ChessPiece chessPiece={props.chessPiece} />
          </div>
        )
      ) : props.colId % 2 === 0 ? (
        <div className={"chessboard__grid chessboard__grid_dark"}>
          <ChessPiece chessPiece={props.chessPiece} />
        </div>
      ) : (
        <div className={"chessboard__grid chessboard__grid_light"}>
          <ChessPiece chessPiece={props.chessPiece} />
        </div>
      )}
    </>
  );
};
