import {useDispatch} from "react-redux";
import {loadGameDB} from "../../Redux/Action/PGN_Actions";
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
     dispatch(loadGameDB(JSON.stringify({
         prevMoveListFEN: data[index.currIndex]["FENArrStr"],
         prevMoveListLAN: data[index.currIndex]["NotationArr"]
     })))
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
                    <th>Result</th>
                    <th>Moves</th>
                    <th>Year</th>
                    <th><input type={"checkbox"} /></th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, currIndex)=>
                {
                        return (
                            <tr key={currIndex}
                                onMouseOver={()=>{onShowPreview(currIndex)}}
                                onMouseLeave={()=>{offShowPreview(currIndex)}}
                            >
                                {
                                    dataKey.map(
                                        (key) => {
                                            return (
                                                <td className={key} key={row[key]}>
                                                    <a
                                                        onClick={(e) => {
                                                            navigateToMoveList(e, {currIndex})
                                                        }}
                                                    >{row[key]}</a>
                                                </td>
                                            )
                                        }
                                    )
                                }
                                <td key={"checkBox"+currIndex} className={"checkBox"+currIndex}><input type={"checkbox"}/></td>
                                {   preview[currIndex] ?
                                    <td key={"chessBoardPreview"+currIndex}
                                        className={"chessBoardPreview"}
                                        id={"chessBoardPreview"}>
                                        <Chessboard position={data[currIndex]["FENArrStr"][data.length-1]} width={170}/>
                                    </td>:
                                    null
                                }
                            </tr>
                        )
                }
                )}
            </tbody>
        </table>
    )
}