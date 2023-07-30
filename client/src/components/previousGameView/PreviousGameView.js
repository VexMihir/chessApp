import React from "react";
import { useSelector} from "react-redux";
import Chessboard from "chessboardjsx";
import {PrevMoveList} from "../sideboard/PrevMoveList/PrevMoveList";

export default function PreviousGameView() {

    const currIndx = useSelector(state=>state.PrevGameView.currIdx);
    const currPGNObj =  JSON.parse(useSelector(state=> state.PrevGameView.PGNOBJ))
    const positionFENStr = currPGNObj.prevMoveListFEN[currIndx];
    let squareStyle = {};
    if (currIndx !== 0)   {
        const currFrom = currPGNObj.transition[currIndx - 1].from
        const currTo =  currPGNObj.transition[currIndx - 1].to
        squareStyle[currFrom] =  {backgroundColor: 'yellow'}
        squareStyle[currTo] = {backgroundColor: 'yellow'}
    }
  return (
    <>
      <div className={"flex items-center justify-center my-1 text-white text-5xl"}><h1>Previous Game</h1></div>
      <div className="flex flex-row justify-center items-end gap-y-[5rem] space-x-[5rem] text-white">
          <Chessboard position={positionFENStr}
                      draggable={false}
                      squareStyles={squareStyle} />
          <PrevMoveList />
      </div>
    </>
  );
}
