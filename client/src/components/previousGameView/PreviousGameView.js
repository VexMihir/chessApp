import React from "react";
import { useSelector} from "react-redux";
import Chessboard from "chessboardjsx";
import "./PrevGameView.css"
import {PrevMoveList} from "../sideboard/PrevMoveList/PrevMoveList";

export default function PreviousGameView() {

    const currIndx = useSelector(state=>state.PGNReducer.currIdx);
    const positionFENStr = JSON.parse(useSelector(state=>state.PGNReducer.PGNOBJ)).prevMoveListFEN[currIndx];

  return (
    <>
      <div className={"header"}><h1>Previous Game</h1></div>
      <div className="mainComponent">
          <Chessboard position={positionFENStr} draggable={false} />
          <PrevMoveList />
      </div>
    </>
  );
}
