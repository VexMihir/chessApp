import {useContext, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNumberAsync";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { SocketContext } from "../../../context/socket";

export function WaitingRoomForm () {
    const dispatch = useDispatch();

    const isEffectRunRef = useRef(false)

    const roomNumber = useSelector(state=>{
        if (state.RoomsReducer.data[state.RoomsReducer.data.length-1] !== undefined) {
            return state.RoomsReducer.data[state.RoomsReducer.data.length-1].roomNumber;
        } else {
            return null
        }
    })
    
    const errorPage = useSelector(state=>(state.SetError));
    const navigate = useNavigate()

    let {state} = useLocation();

<<<<<<< HEAD
    const socket = useContext(SocketContext)
=======
    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName, state.selectedTimeControl, state.selectedIncrementControl))
>>>>>>> project_5-2

    useEffect(()=> {
        // if (!isEffectRunRef.current) {
            dispatch(getRoomNumberAsync(socket.id))
            // isEffectRunRef.current = true
        // }
    }, [])

    useEffect(() => {
        if (errorPage) {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div className="flex flex-col items-center justify-start h-[100%]">
            <h2 className={"rounded text-custom-black"}>Your Room Number is {roomNumber}</h2>
            <div className="text-center">
            <NavLink
                className=
                    {"m-auto text-center " +
                    "no-underline border border-custom-black rounded-xl py-3 px-4 hover:shadow-transparent " +
                    "text-custom-black text-right font-bold rounded" +
                    "shadow shadow-md shadow-custom-black mt-[1rem]"}
                to={"/inGameView/"+ roomNumber}
                state={{userName: state.userName}}
                onClick={()=>{
                    socket.emit("join room",roomNumber, state.userName, () => {})
                }}
                >Start Game!</NavLink>
        </div>
        </div>
    )
}