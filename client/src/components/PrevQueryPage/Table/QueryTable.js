import {useDispatch} from "react-redux";
import {loadGameDB} from "../../../Redux/Action/prevGamViewActions";
import {useNavigate} from "react-router-dom";
import "./QueryTable.css"
import Chessboard from "chessboardjsx";
import {useState} from "react";


export function QueryTable({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [preview, setPreview] = useState([false, false, false, false, false]);

 function navigateToMoveList(e, index) {
     e.preventDefault();
     dispatch(loadGameDB(index.currIndex));
     navigate("/prevMoveList")
 }

 function onShowPreview(currIndex) {
     setPreview( (preview) => {
         return [
             ...preview.slice(0, currIndex),
             true,
             ...preview.slice(currIndex+1, preview.length)
         ]
     })
 }

 function offShowPreview(currIndex) {
     setPreview( (previewStatus) => {
         return [
             ...previewStatus.slice(0, currIndex),
             false,
             ...previewStatus.slice(currIndex+1, previewStatus.length)
         ]
     })
 }
    return (
        <table className={"QueryTable"}>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Number of moves</th>
                    <th><input type={"checkbox"} /></th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, currIndex)=>
                {
                        return (
                            <>
                                <tr key={currIndex}
                                    onMouseOver={()=>{onShowPreview(currIndex)}}
                                    onMouseLeave={()=>{offShowPreview(currIndex)}}
                                    onClick={(e)=>{navigateToMoveList(e, {currIndex})}}
                                >
                                    <td>{row.game}</td>
                                    <td rowSpan={3}>{row.date}</td>
                                    <td rowSpan={3}>{row.numberOfMoves}</td>
                                    <td key={"checkBox"+currIndex} c
                                        lassName={"checkBox"+currIndex}
                                        rowSpan={3}
                                    ><input type={"checkbox"}/></td>
                                </tr>
                                <tr><td>Player #1: {row.playerOne}</td></tr>
                                <tr><td>Player #2: {row.playerTwo}</td></tr>
                            </>
                )
                }
                )}
            </tbody>
        </table>
    )
}