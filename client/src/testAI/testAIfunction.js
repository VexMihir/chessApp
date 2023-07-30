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
                    {info.bestMoves[3]}
                    </p>
                <p>Raw scores:
                    {info.rawScore[0]} ,
                    {info.rawScore[1]} ,
                    {info.rawScore[2]} ,
                    {info.rawScore[3]}

                </p>
            </div>
        </>
    )

}