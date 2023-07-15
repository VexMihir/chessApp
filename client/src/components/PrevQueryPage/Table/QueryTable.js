import {useDispatch} from "react-redux";
import {loadGameDB} from "../../../Redux/Action/prevGamViewActions";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export function QueryTable({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [check, setCheck] = useState([false, false, false, false, false])
 function navigateToMoveList(e, index) {
     e.preventDefault();
     dispatch(loadGameDB(index.currIndex));
     navigate("/prevMoveList")
 }

 const checkAll = (e) => {
        if (e.target.checked) {
            setCheck([true, true, true, true, true])
        } else {
            setCheck([false, false, false, false, false])
        }
 }

    return (
        <>
            <table className={"table-auto border-none border-collapse rounded-lg shadow shadow-purple-400 shadow-lg w-[100%] "}>
                <thead className={"bg-violet-900 text-left font-bold text-xl"}>
                <tr>
                    <th className={"py-6 px-5"}>Game</th>
                    <th className={"py-6"}>Date</th>
                    <th>Number of moves</th>
                    <th className={"py-6"}>Result</th>
                    <th
                        onChange={
                            (e)=>{
                                e.preventDefault();
                                checkAll(e)
                            }
                        }

                    ><input type={"checkbox"} /></th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, currIndex)=>
                    {
                        let bgColor = "bg-purple-900"

                        if (currIndex % 2 === 0) {
                            bgColor = "bg-purple-800"
                        }

                        return (
                            <>
                                <tr key={currIndex}
                                    onClick={(e)=>{navigateToMoveList(e, {currIndex})}}
                                    className={"text-left text-medium border-none "+ bgColor}
                                >
                                    <td className={"py-4 pl-5"} key={row.game+currIndex}>{row.game}</td>
                                    <td rowSpan={3} className={"py-4 px-1"} key={row.date+currIndex}>{row.date}</td>
                                    <td rowSpan={3}>{row.numberOfMoves}</td>
                                    <td rowSpan={3} className={"py-4 px-1"} key={row.result+currIndex}>{row.result}</td>
                                    <td key={"checkBox"+currIndex}
                                        rowSpan={3}
                                        className={"py-4"}
                                        key={currIndex+"checkbox"}
                                    ><input type={"checkbox"}/></td>
                                </tr>
                                <tr key={currIndex+ "p1"} className={"text-left text-medium border-none  "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerOne+currIndex}>Player #1: {row.playerOne}</td>
                                </tr>
                                <tr key={currIndex + "p2"} className={"text-left text-medium border-none "+ bgColor}>
                                    <td className={"py-4 px-5"} key={row.playerOne+currIndex}>Player #2: {row.playerTwo}</td>
                                </tr>
                            </>
                        )
                    }
                )}
                </tbody>
            </table>

        </>
    )
}