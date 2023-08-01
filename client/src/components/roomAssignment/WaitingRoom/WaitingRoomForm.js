import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumberAsync} from "../../../Redux/Thunk/getRoomNoAsync";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { SocketContext } from "../../../context/socket";

export function WaitingRoomForm () {//({socket}) {
    const dispatch = useDispatch();
    const roomNumber = useSelector(state=>state.JoinRoomReducer.roomNumber);
    const errorPage = useSelector(state=>(state.SetError));
    const navigate = useNavigate()

    let {state} = useLocation();

    const socket = useContext(SocketContext)

    useEffect(()=> {
        dispatch(getRoomNumberAsync(state.userName))
    }, [])

    useEffect(() => {
        if (errorPage) {
            navigate("/404NOTFOUND");
        }
    }, [errorPage])

    return (
        <div className="flex flex-col items-center justify-end h-screen">
            <div className="mt-auto mb-10">
            <h2 className={"rounded text-custom-black"}>Your Room Number is {roomNumber}</h2>
            <Link className={"invisible"} to="/" replace/>
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
        </div>
    )
}