import React, { useEffect } from "react";
import { useState } from "react";
import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "./Chessboard";

export default function ChessPiece(props) {
  const chessPiece = props.chessPiece;

  // const onDragStart = props.dragStart;
  // const onDragEnd = props.dragEnd;
  // const onDragOver = props.dragOver;
  // const onDragEnter = props.dragEnter;
  // const onDragLeave = props.dragLeave;
  // const onDragDrop = props.dragDrop;

  // function dragStart(e) {
  //   onDragStart(e)
  // }

  // function dragEnd(e) {
  //   onDragEnd(e)
  // }

  // function dragOver(e) {
  //   onDragOver(e)
  // }

  // function dragEnter(e) {
  //   onDragEnter(e)
  // }

  // function dragLeave(e) {
  //   onDragLeave(e)
  // }

  // function dragDrop(e) {
  //   onDragDrop(e)
  // }

  return (
    <>
      {chessPiece.trim() === "" ? (
        <div className="chessboard__chessPiece chessboard__chessPiece_empty">
          {"0"}
        </div>
      ) : (
        <div className="chessboard__chessPiece">{chessPiece[1]}</div>
      )}
    </>
  );
}
