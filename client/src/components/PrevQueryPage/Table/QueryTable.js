import {useDispatch} from "react-redux";
import {loadGameDB} from "../../../Redux/Action/prevGamViewActions";
import {useNavigate} from "react-router-dom";
import "./QueryTable.css"
import Chessboard from "chessboardjsx";
import {useState} from "react";


export function QueryTable({data, dataKey}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let previewStatus = [];

    for (let i = 0; i < data.length; i++) {
        previewStatus.push(false)
    }
    const [preview, setPreview] = useState(previewStatus);

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
             ...preview.slice(currIndex+1, previewStatus.length)
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
                                    {   preview[currIndex] ?
                                        <td key={"chessBoardPreview"+currIndex}
                                            className={"chessBoardPreview"}
                                            id={"chessBoardPreview"}
                                            rowSpan={3}
                                        >
                                            <Chessboard position={row.lastFenStr} width={170}/>
                                        </td>:
                                        null
                                    }
                                </tr>
                                <tr>Player #1: {row.playerOne}</tr>
                                <tr>Player #2: {row.playerTwo}</tr>
                            </>
                )
                }
                )}
            </tbody>
        </table>
    )
}