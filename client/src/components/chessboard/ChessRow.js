import React, { useEffect } from "react";
import ChessColumn from "./ChessColumn";

export default function ChessRow(props) {
  const onDragStart = props.dragStart;
  const onDragEnd = props.dragEnd;
  const onDragOver = props.dragOver;
  const onDragEnter = props.dragEnter;
  const onDragLeave = props.dragLeave;
  const onDragDrop = props.dragDrop;

  function dragStart(e) {
    console.log("line 16: start");
    onDragStart(e);
  }

  function dragEnd(e) {
    console.log("line 16: end");
    onDragEnd(e);
  }

  function dragOver(e) {
    console.log("line 16: over");
    onDragOver(e);
  }

  function dragEnter(e) {
    console.log("line 16: enter");
    onDragEnter(e);
  }

  function dragLeave(e) {
    console.log("line 16: leave");
    onDragLeave(e);
  }

  function dragDrop(e) {
    console.log("line 16: drop");
    onDragDrop(e);
  }

  return (
    <>
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={() => dragDrop([props.rowId, props.colId])}
        className="empty"
      >
        <div
          onDragStart={(e) => dragStart([e, props.rowId, props.colId])}
          onDragEnd={dragEnd}
          className="fill"
          draggable={true}
        >
          {props.rowId % 2 === 0 ? (
            <ChessColumn
              dragStart={props.dragStart}
              dragEnd={props.dragEnd}
              dragOver={props.dragOver}
              dragEnter={props.dragEnter}
              dragLeave={props.dragLeave}
              dragDrop={props.dragDrop}
              colId={props.colId}
              chessPiece={props.chessPiece}
            />
          ) : (
            <ChessColumn
              dragStart={props.dragStart}
              dragEnd={props.dragEnd}
              dragOver={props.dragOver}
              dragEnter={props.dragEnter}
              dragLeave={props.dragLeave}
              dragDrop={props.dragDrop}
              colId={props.colId - 1}
              chessPiece={props.chessPiece}
            />
          )}
        </div>
      </div>
    </>
  );
}
