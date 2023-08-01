import {useDispatch} from "react-redux";
import {loadGameDB} from "../../../Redux/Action/prevGamViewActions";
import {useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {playBackView} from "../../../RouteString/RouteString";


export function QueryTable({prop}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const CARDSPERPAGE = 5
    const OFFSET = CARDSPERPAGE * (prop.pageNum - 1)
    function navigateToMoveList(e, index) {
     e.preventDefault();
     dispatch(loadGameDB(index.currIndex + OFFSET));
     navigate(playBackView)
 }
    return (
        <>
            <table
                key={"mainTable"}
                className={"table-auto border-none border-collapse rounded-lg shadow shadow-purple-400 shadow-lg w-[100%] "}>
                <thead key={"Thead"} className={"bg-violet-900 text-left font-bold text-xl"}>
                <tr key={"Header"}>
                    <th key={"SEE GAME"}  className={"py-6 px-5"}>SEE GAME</th>
                    <th key={"GameH"} className={"py-6"}>Game</th>
                    <th key={"DateH"} className={"py-6"}>Date</th>
                    <th key={"noMovesH"}  className={"py-6"}>Number of moves</th>
                    <th key={"ResultH"} className={"py-6"}>Result</th>
                </tr>
                </thead>
                <tbody key={"mainTableBody"}>
                {prop.data.map((row, currIndex)=>
                    {
                        let bgColor = "bg-purple-900"

                        if (currIndex % 2 === 0) {
                            bgColor = "bg-purple-800"
                        }
                        return (
                            <Fragment key={currIndex}>
                                <tr key={currIndex+"row"}
                                    onClick={ (e) => {
                                         navigateToMoveList(e, {currIndex})
                                    }}
                                    className={"text-left text-medium border-none "+ bgColor}
                                >
                                    <td rowSpan={3} className={"py-4 pl-5"} key={"button"+ currIndex}>
                                        <div className={"h-[100%] w-[100%] item-center"}>
                                            <button
                                                onClick={ (e) => {
                                                    navigateToMoveList(e, {currIndex})
                                                }}
                                                className={"bg-transparent hover:bg-violet-500 text-white font-semibold " +
                                                "shadow shadow-white shadow-md " +
                                                "hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
                                            >SEE GAME</button>
                                        </div>
                                    </td>
                                    <td className={"py-4 px-1"} key={row.game+currIndex}>{row.game}</td>
                                    <td rowSpan={3} className={"py-4 px-1"} key={row.date+currIndex}>{row.date}</td>
                                    <td rowSpan={3} key={row.numberOfMoves+currIndex}>{row.numberOfMoves}</td>
                                    <td rowSpan={3} className={"py-4 px-1"} key={row.result+currIndex}>{row.result}</td>
                                </tr>
                                <tr key={currIndex+ "p1"} className={"text-left text-medium border-none  "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerOne+currIndex}>Player #1: {row.playerOne}</td>
                                </tr>
                                <tr key={currIndex + "p2"} className={"text-left text-medium border-none "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerTwo+currIndex}>Player #2: {row.playerTwo}</td>
                                </tr>
                            </Fragment>
                        )
                    }
                )}
                </tbody>
            </table>
        </>
    )
}