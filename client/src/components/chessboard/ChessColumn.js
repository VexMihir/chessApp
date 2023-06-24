import React from 'react'
import ChessPiece from './ChessPiece'

export default function ChessColumn(props) {
  return (
    <>
      {props.colId % 2 === 0 ? (
        <div className={"chessboard__chessCell chessboard__chessCell_light"}>          
          <ChessPiece  
          
          dragStart={props.dragStart}
          dragEnd={props.dragEnd}
          dragOver={props.dragOver}
          dragEnter={props.dragEnter}
          dragLeave={props.dragLeave}
          dragDrop={props.dragDrop}
          
          chessPiece={props.chessPiece}/>
        </div>
      ) : (
        <div className={"chessboard__chessCell chessboard__chessCell_dark"}>
          <ChessPiece 
          
          dragStart={props.dragStart}
          dragEnd={props.dragEnd}
          dragOver={props.dragOver}
          dragEnter={props.dragEnter}
          dragLeave={props.dragLeave}
          dragDrop={props.dragDrop}
          
          chessPiece={props.chessPiece} />
        </div>
      )}
    </>
  );
}
