import {useDispatch} from "react-redux";
import {pauseMoveList} from "../../../../Redux/Action/PGN_Actions";

export function PrevMovePausetButton() {
    const dispatch = useDispatch()

    function handleStartOnClick(e) {
        e.preventDefault();
        dispatch(pauseMoveList(false))
    }

    return (
        <button
            className={"PrevMoveList"}
            key={"PrevMoveStarButton"}
            id={"PrevMoveStarButton"}
            onClick={(e)=>{handleStartOnClick(e)}}
        >PAUSE</button>
    )
}