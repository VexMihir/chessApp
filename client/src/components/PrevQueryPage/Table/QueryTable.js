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
                className={"table-auto border border-collapse rounded-lg shadow shadow-custom-black-400 shadow-lg w-[100%] "}>
                <thead key={"Thead"} className={"bg-custom-black text-left text-xl text-yellow-400 text-center uppercase font-bold text-xl"}>
                <tr key={"Header"}>
                    <th key={"SEE GAME"}  className={"py-6 px-5"}></th>
                    <th key={"GameH"} className={"py-6"}>Game</th>
                    <th key={"DateH"} className={"py-6"}>Date</th>
                    <th key={"noMovesH"}  className={"py-6"}>Number of moves</th>
                    <th key={"ResultH"} className={"py-6"}>Result</th>
                </tr>
                </thead>
                <tbody key={"mainTableBody"}>
                {prop.data.map((row, currIndex)=>
                    {
                        let bgColor = "bg-custom-cream"

                        if (currIndex % 2 === 0) {
                            bgColor = "bg-custom-pale"
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
                                                className={"bg-transparent hover:bg-custom-black text-black font-semibold " +
                                                "shadow shadow-custom-black shadow-md " +
                                                "hover:text-white py-2 px-4 border border-blue-gray-900 hover:border-transparent rounded"}
                                            >Replay</button>
                                        </div>
                                    </td>
                                    <td className={"text-center text-lg py-4 px-1"} key={row.game+currIndex}>{row.game}</td>
                                    <td rowSpan={3} className={"text-center text-lg py-4 px-1"} key={row.date+currIndex}>{row.date}</td>
                                    <td rowSpan={3} className = "text-center text-lg" key={row.numberOfMoves+currIndex}>{row.numberOfMoves}</td>
                                    <td rowSpan={3} className={"text-center text-lg py-4 px-1"} key={row.result+currIndex}>{row.result}</td>
                                </tr>
                                <tr key={currIndex+ "p1"} className={"text-center text-medium border-none  "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerOne+currIndex}>PLAYER #1 : {row.playerOne}</td>
                                </tr>
                                <tr key={currIndex + "p2"} className={"text-center text-medium border-none "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerTwo+currIndex}>PLAYER #2 : {row.playerTwo}</td>
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