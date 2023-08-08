/**
 * With help of chatGPT rephrasing and grammar checking
 * Game Evaluation View Documentation
 *
 * This component provides players with insights and analysis during gameplay:
 * - Evaluating bar shows chances of winning for both players.
 * - Best moves for each position are displayed.
 * - Percentage score shows the likelihood of winning for each player. Positive means that white pieces are having
 * advantages.
 * - Retains standard functionalities of normal view.
 *
 * Dependencies: PrevGameView, Analysis Reducer
 *
 * Note: Optimize analysis algorithms for smooth performance.
 */

import {useSelector} from "react-redux";
import {PrevMoveList} from "../NormalView/PrevMoveList";
import {EvaluationBar} from "../EvalBar/EvaluationBar";
import React, { useEffect } from 'react';

export function AnalysisView() {

    const info = useSelector(state=>(state.AnalyisReducer));
    const currIndex = useSelector(state=> state).PrevGameView.currIdx
    const bestMove = info.bestMoves[currIndex - 1] || "N/A";
    const displayScore = info.displayScore[currIndex] || 0;
    const rawScore = (info.offsetScore && info.offsetScore.length > currIndex && info.offsetScore[currIndex]) 
    ? info.offsetScore[currIndex] 
    : (info.rawScore[currIndex] || "N/A");
    let percentage = Math.ceil((Math.abs(displayScore)/8)*100);

    if (percentage > 100 ) {
        percentage = 100
    } else if (currIndex === 0) {
        percentage = 50
    }

    useEffect(() => {
        console.log('info:', info);
    }, [rawScore]);    


    return (
        <>
            <div
                className={"h-[95%] w-[100%] m-0 flex flex-col gap-y-[1%]"}
                id={"wholeAnalysisPanel"} >
                <div
                    id={"InfoHeader"}
                    className={"flex flex-row item-center justify-evenly h-[15%] w-[100%] item-center text-center"}>
                    <p>
                        <span className={"font-bold text-center item-center"}>BEST MOVE: </span>{bestMove}</p>
                    <p>{displayScore}</p>
                </div>
                <div
                    id={"AnalysisPanel"}
                    className={"flex flex-row  h-[90%] w-[100%] item-stretch gap-x-[5%] pl-[0.2rem] "}>
                    <div
                        id={""}
                        className={"h-[100%] w-[5%] "}>
                        <EvaluationBar evaluation={displayScore} offsetScore={rawScore}
                        />
                    </div>
                    <div
                        className={"h-[100%] w-[95%] "}>
                        <PrevMoveList />
                    </div>

                </div>
            </div>
        </>
    )

}