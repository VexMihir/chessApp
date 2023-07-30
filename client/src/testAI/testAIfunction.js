import {useSelector} from "react-redux";

export function TestAIFunction() {
    const info = useSelector(state=>(state.AnalyisReducer));
    return (
        <>
            <div>
                <p>Best moves:
                    {info.bestMoves[0]} ,
                    {info.bestMoves[1]} ,
                    {info.bestMoves[2]} ,
                    {info.bestMoves[3]} ,
                    {info.bestMoves[4]} ,
                    {info.bestMoves[5]} ,
                    {info.bestMoves[6]} ,
                    {info.bestMoves[7]} ,
                    {info.bestMoves[8]} ,
                    {info.bestMoves[9]},
                    {info.bestMoves[10]} ,
                    {info.bestMoves[11]} ,
                    {info.bestMoves[12]} ,
                    {info.bestMoves[13]} ,
                    {info.bestMoves[14]} ,
                    {info.bestMoves[15]}
                    </p>
                <p>Raw scores:
                    {info.rawScore[0]} ,
                    {info.rawScore[1]} ,
                    {info.rawScore[2]} ,
                    {info.rawScore[3]} ,
                    {info.rawScore[4]} ,
                    {info.rawScore[5]} ,
                    {info.rawScore[6]} ,
                    {info.rawScore[7]} ,
                    {info.rawScore[8]} ,
                    {info.rawScore[9]} ,
                    {info.rawScore[10]} ,
                    {info.rawScore[11]} ,
                    {info.rawScore[12]} ,
                    {info.rawScore[13]} ,
                    {info.rawScore[14]} ,
                    {info.rawScore[15]}

                </p>
            </div>
        </>
    )

}