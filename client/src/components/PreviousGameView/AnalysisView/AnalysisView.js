import {useSelector} from "react-redux";
import {PrevMoveList} from "../PrevMoveList/PrevMoveList";
import {EvaluationBar} from "../EvaluationBar/EvaluationBar";

export function AnalysisView() {

    const info = useSelector(state=>(state.AnalyisReducer));
    const currIndex = useSelector(state=> state).PrevGameView.currIdx
    const bestMove = info.bestMoves[currIndex - 1] || "NOT AVAILABLE";
    const displayScore = info.displayScore[currIndex-1] || 0;
    const rawScore = info.rawScore[currIndex -1] || "NOT AVAILABLE"
    let percentage = Math.ceil((Math.abs(displayScore)/8)*100);
    let color;

    if (displayScore >= 0) {
        color = "white";
    } else {
       color = "black";
    }

    if (percentage > 100 ) {
        percentage = 100
    } else if (currIndex === 0) {
        percentage = 50
    }


    return (
        <>
            <div
                className={"h-[100%] w-[100%] m-0 flex flex-col gap-y-[3%]"}
                id={"wholeAnalysisPanel"} >
                <div
                    id={"InfoHeader"}
                    className={"flex flex-row item-center justify-evenly h-[15%] w-[100%] item-center text-center"}>
                    <p>
                        <span className={"font-bold text-center item-center"}>BEST MOVE: </span>{bestMove}</p>
                    <p><span className={"font-bold text-center item-center"}>RAW SCORE: </span>{rawScore}</p>
                    <p>{displayScore}</p>
                </div>
                <div
                    id={"AnalysisPanel"}
                    className={"flex flex-row  h-[85%] w-[95%] item-stretch gap-x-[5%] p-[1rem] "}>
                    <div
                        id={"EvaluationBar"}
                        className={"h-[100%] w-[15%] "}>
                        <EvaluationBar prop={
                            {
                                percentage,
                                color
                            }
                        }/>
                    </div>
                    <div
                        className={"h-[100%] w-[80%] "}>
                        <PrevMoveList />
                    </div>

                </div>
            </div>
        </>
    )

}