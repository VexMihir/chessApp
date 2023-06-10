import React from 'react'

export default function ChessPiece(props) {
  return (
    <>
      <div className="chessboard__chessPiece" draggable="true">
        {props.chessPiece}
      </div>
    </>
  );
}
