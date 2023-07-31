import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Chessboard from "chessboardjsx";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {analysisView, normalView} from "../../RouteString/RouteString";
import {getAnalysis} from "../../Redux/Action/Analysis";

import { CUSTOM_CHESS_PIECES } from "../../constants/CustomChessPieces";
import { DARK_SQUARE_STYLE, LIGHT_SQUARE_STYLE } from "../../constants/CustomChessSquareColor";

export default function PreviousGameView() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currIndx = useSelector(state=>state.PrevGameView.currIdx);
    const currPGNObj =  JSON.parse(useSelector(state=> state.PrevGameView.PGNOBJ));
    const positionFENStr = currPGNObj.prevMoveListFEN[currIndx];
    let squareStyle = {};
    const [progressBar, setProgressBar] = useState(false)

    if (currIndx !== 0)   {
        const currFrom = currPGNObj.transition[currIndx - 1].from
        const currTo =  currPGNObj.transition[currIndx - 1].to
        squareStyle[currFrom] =  {backgroundColor: 'yellow'}
        squareStyle[currTo] = {backgroundColor: 'yellow'}
    }

    const handleAnalysisView =  async (e) => {
        e.preventDefault();
        await dispatch(getAnalysis())
        setProgressBar(false);
        navigate(analysisView)
    }

    useEffect(()=>{
        navigate(normalView);
    }, [])
  return (
    <>
      <div className={"flex items-center justify-center my-1 text-white text-5xl"}><h1>Previous Game</h1></div>
      <div className="flex flex-row justify-center items-end gap-y-[5rem] space-x-[5rem] text-black">
          <Chessboard position={positionFENStr}
                      draggable={false}
                      squareStyles={squareStyle} 
                      lightSquareStyle={LIGHT_SQUARE_STYLE}
                      darkSquareStyle={DARK_SQUARE_STYLE}
                      //Source: https://codesandbox.io/s/21r26yw13j?from-embed=&file=/src/integrations/CustomBoard.js
                      pieces={CUSTOM_CHESS_PIECES}
                      />
          <div>
              <NavLink
                  className={(state)=> state.isActive ?  "text-white no-underline font-bold text-lg " +
                      "flex justify-center items-center " +
                      "hover:bg-violet-900 font-bold " +
                      " " +
                      "z-0"
                      :
                      "text-white no-underline font-bold text-lg " +
                      "flex justify-center items-center " +
                      "hover:bg-violet-900 font-bold " +
                      "z-1 " +
                      " " +
                      "shadow-purple-900 shadow-[inset_0px_0px_10px_0.25px]" }
                  to={normalView} >Normal View</NavLink>
              <NavLink
                  className={(state)=> state.isActive ?  "text-white no-underline font-bold text-lg " +
                      "flex justify-center items-center " +
                      "hover:bg-violet-900 font-bold " +
                      " " +
                      "z-0"
                      :
                      "text-white no-underline font-bold text-lg " +
                      "flex justify-center items-center " +
                      "hover:bg-violet-900 font-bold " +
                      "z-1 " +
                      " " +
                      "shadow-purple-900 shadow-[inset_0px_0px_10px_0.25px]" }
                  state={currIndx}
                  onClick = {async (e)=> {
                      setProgressBar(true)
                      await handleAnalysisView(e)
                  }}
                  to={analysisView}>Analysis View</NavLink>
              <Outlet />
          </div>
      </div>
    </>
  );
}
