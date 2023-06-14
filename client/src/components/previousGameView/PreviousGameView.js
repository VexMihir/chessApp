import React, {useEffect, useState} from "react";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import Chessboard from "chessboardjsx";
import Sideboard from "../sideboard/Sideboard";
import {loadGameDB} from "../../Redux/Action/PGN_Actions";


export default function PreviousGameView() {
  const [isNavigationClose, setIsNavigationClose] = useState(true);
  const dispatch = useDispatch()
  const mockFENStrArr = [
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
      "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
  ]
    const mockMoveList = [
        "e4", "c5", "Nf3"
    ]
    const mockDBOBJ = {
        prevMoveListFEN: mockFENStrArr,
        prevMoveListLAN: mockMoveList
    }

  const currIndx = useSelector(state=>state.PGNReducer.currIdx)
  const positionFENStr = mockFENStrArr[currIndx];

  function handleClose() {
    if (isNavigationClose) {
      setIsNavigationClose(false);
    } else {
      setIsNavigationClose(true);
    }
  }
  useEffect(() => {
      dispatch(loadGameDB(JSON.stringify(mockDBOBJ)))
  },[])

  return (
    <>
      <div className="chessApp__main ">
        <Chessboard position={positionFENStr}/>
        <Sideboard type={"previous"} />
      </div>
    </>
  );
}
