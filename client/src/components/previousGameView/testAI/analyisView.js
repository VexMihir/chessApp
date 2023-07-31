import {useSelector} from "react-redux";
import {PrevMoveList} from "../../sideboard/PrevMoveList/PrevMoveList";


export function AnalyisView() {

    const info = useSelector(state=>(state.AnalyisReducer));
    const currIndex = useSelector(state=> state).PrevGameView.currIdx

    const bestMove = info.bestMoves[currIndex - 1] || "";
    const displayScore = info.displayScore[currIndex-1] || 0;
    const percentage = Math.abs(displayScore * 100)

    return (
        <>
            <div
                id={"wholeAnalysisPanel"} >
                <div
                    id={"headerMoves"}>
                    <div id={"best moves"}>
                        <p>BEST MOVE: {bestMove}</p>
                    </div>
                    <div id={"move' score"}>
                        <p>SCORE: {displayScore}</p>
                        <PrevMoveList />
                    </div>
                </div>
            </div>
        </>
    )

}