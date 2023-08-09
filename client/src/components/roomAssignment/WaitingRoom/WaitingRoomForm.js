import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {NavLink, useLocation} from "react-router-dom";
import { SocketContext } from "../../../context/socket";
import { EVENTS } from "../../../constants/aliases";
import { clearError } from "../../../Redux/Action/clearErrorAction";

export function WaitingRoomForm () {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);
    let error = useSelector(state=>(state.SetError));
    const socket = useContext(SocketContext)
    let {state} = useLocation();

    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName, state.selectedTimeControl, state.selectedIncrementControl))

    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [error])

    return (
        <div className="flex flex-col items-center justify-start h-[100%]">
            <h2 className={"rounded text-custom-black"}>
                {error ? "Failed to featch the room number from the server." : `Your Room Number is ${roomNumber}`}
            </h2>
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
                        socket.emit(EVENTS.JOIN_ROOM, roomNumber, state.userName)
                    }}
                >Start Game!</NavLink>
            </div>
        </div>
    )
}