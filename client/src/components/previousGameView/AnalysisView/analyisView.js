import {useSelector} from "react-redux";
import {PrevMoveList} from "../../sideboard/PrevMoveList/PrevMoveList";
import {EvaluationBar} from "../EvaluationBar/EvaluationBar";
import {useState} from "react";


export function AnalyisView() {

    const info = useSelector(state=>(state.AnalyisReducer));
    const currIndex = useSelector(state=> state).PrevGameView.currIdx
    const bestMove = info.bestMoves[currIndex - 1] || "";
    const displayScore = info.displayScore[currIndex-1] || 0;
    let percentage = Math.ceil((Math.abs(displayScore)/8)*100);

    let color;

    if (displayScore > 0) {
        color = "white";
    } else {
       color = "black";
    }

    if (percentage > 100) {
        percentage = 100
    }



    return (
        <>
            <div
                className={"h-[500px] w-[100%] flex flex-row"}
                id={"wholeAnalysisPanel"} >
                <div className={"h-[100%] w-[7%] gap-x-[3%]"}>
                    <EvaluationBar prop={
                        {
                            percentage,
                            color
                        }
                    } />
                </div>
                <div className={"h-[100%] w-[90%] flex flex-col "}>
                    <div
                        className={"h-[10%] w-[100%] flex flex-row"}
                        id={"headerMoves"}>
                            <p>BEST MOVE: {bestMove}  </p>
                            <p>  </p>
                            <p>SCORE: {displayScore}  </p>
                    </div>
                    <div
                        className={"h-[90%] w-[100%] flex flex-col"}
                    >
                        <PrevMoveList />
                    </div>
                </div>
            </div>
        </>
    )

}