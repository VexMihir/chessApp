import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chessboard from "chessboardjsx";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { analysisView, normalView } from "../../RouteString/RouteString";
import { getAnalysis } from "../../Redux/Action/Analysis";
import { LinearProgress } from '@mui/material';
import { NavBar } from "../NavBar/NavBar";



export default function PreviousGameView() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currIndx = useSelector(state => state.PrevGameView.currIdx);
    const currPGNObj = JSON.parse(useSelector(state => state.PrevGameView.PGNOBJ));
    const result = currPGNObj.result
    const positionFENStr = currPGNObj.prevMoveListFEN[currIndx];
    let squareStyle = {};
    const [progressBar, setProgressBar] = useState(false)

    if (currIndx !== 0) {
        const currFrom = currPGNObj.transition[currIndx - 1].from
        const currTo = currPGNObj.transition[currIndx - 1].to
        squareStyle[currFrom] = { backgroundColor: 'yellow' }
        squareStyle[currTo] = { backgroundColor: 'yellow' }
    }

    const handleAnalysisView = async (e) => {
        e.preventDefault();
        await dispatch(getAnalysis(result))
        setProgressBar(false);
        navigate(analysisView)
    }

    useEffect(() => {
        navigate(normalView);
    }, [])
<<<<<<< HEAD

    const location = useLocation();
    return (
        <>
            <div
                id={"PrevGameView"}
                className={"h-fit m-[1rem]"}
            >
                <div
                    className={"h-[0.5%] items-center m-0"}
                    id={"NavBar"}
                >
                    <NavBar />
                </div>
                <div
                    id={"MainComponents"}
                    className={"min-h-[650px] flex flex-row gap-x-[2rem] items-stretch justify-center p-[2rem] "}
                >
                    <Chessboard
                        width={650}
                        boardStyle={
                            {
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`

                            }
                        }
                        lightSquareStyle={{ backgroundColor: "#547396" }}
                        darkSquareStyle={{ backgroundColor: "#eae9d4" }}
                        position={positionFENStr}
                        draggable={false}
                        squareStyles={squareStyle} />
                    <div
                        className={"flex flex-col h-[650px] w-[100%] bg-custom-grey rounded-lg justify-evenly " +
                            "shadow shadow-[#475569] shadow-lg"}
                    >
                        <div
                            className={"flex flex-fol h-[50px] w-[95%] p-[1rem] justify-center "}
                        >
                            <NavLink
                                className={location.pathname === normalView ? "text-white no-underline font-bold text-lg p-[2rem] mr-2 " +
                                    "flex justify-center items-center rounded-xl " +
                                    "hover:bg-custom-black font-bold " +
                                    "z-1 " +
                                    "shadow-custom-black shadow-[inset_0px_0px_10px_0.25px] p-[2rem] "
                                    :
                                    "text-white no-underline font-bold text-lg p-[2rem] " +
                                    "flex justify-center items-center backdrop-blur-md rounded-xl" +
                                    "hover:bg-custom-black font-bold " +
                                    "z-0"}
                                to={normalView} >Normal View</NavLink>
                            <NavLink
                                className={location.pathname === analysisView ? "text-white no-underline font-bold text-lg p-[2rem] mr-2 " +
                                    "flex justify-center items-center rounded-xl " +
                                    "hover:bg-custom-black font-bold " +
                                    "z-1 " +
                                    "shadow-custom-black shadow-[inset_0px_0px_10px_0.25px] p-[2rem] "
                                    :
                                    "text-white no-underline font-bold text-lg p-[2rem] " +
                                    "flex justify-center items-center backdrop-blur-md rounded-xl" +
                                    "hover:bg-custom-black font-bold " +
                                    "z-0"}
                                onClick={async (e) => {
                                    setProgressBar(true);
                                    await handleAnalysisView(e);
                                }}
                                to={analysisView}>Analysis View</NavLink>

                        </div>
                        {progressBar ? <LinearProgress /> : ""}
                        <div
                            className={"h-[80%] w-[100%] "}
                        >
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
=======
  return (
    <>
      <div className={"flex items-center justify-center my-1 text-white text-5xl"}><h1>Previous Game</h1></div>
      <div className="flex flex-row justify-center items-end gap-y-[5rem] space-x-[5rem] text-black">
          <Chessboard position={positionFENStr}
                      draggable={false}
                      squareStyles={squareStyle} />
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
>>>>>>> project_5
}
