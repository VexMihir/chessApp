import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import { SocketContext } from "../../../context/socket";
import { EVENTS } from "../../../constants/aliases";

/**
 * With help of chatGPT rephrasing and grammar checking
 * Spectator Room Form
 *
 * The Spectator Room Form allows users to join an ongoing game as a spectator by entering a room number. Upon
 * validation, the user is directed to the waiting page with the specified room number, where they can observe the
 * game without actively participating as a player.
 *
 */
export function SpectatorForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");
    const [roomEror, setRoomNumberError] = useState("invisible");

    const socket = useContext(SocketContext)

    const handleOnChange = (e) => {
        checkEmptyUserName(e)
        e.preventDefault();
        setUserName(e.target.value)
    }

    const handleRoomNumber = (e) => {
        checkInvalid(e)
        e.preventDefault();
        setRoomNumber(Number(e.target.value))
    }

    const checkEmptyUserName = (e) => {
        if(!e.target.value || e.target.value.length === 0) {
            setuserNameError(" ")
        } else {
            setuserNameError("invisible")
        }
    }

    const checkInvalid = (e) => {
        if(!e.target.value || e.target.value.length === 0 || isNaN(e.target.value) || e.target.value < 0 || e.target.value > 1000000) {
            setRoomNumberError(" ")
        } else {
            setRoomNumberError("invisible")
        }
    }

    const finalCheck = (e) => {
        if (!userName || userName.length === 0 ) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        } else if (!roomNumber || roomNumber < 0 || roomNumber > 1000000) {
            e.preventDefault();
            window.alert("ROOM NUMBER IS INVALID")
        }
    }

    return (
        <div className={"w-[40%] h-[85%] flex flex-col m-auto  "}>
            <fieldset className={"flex flex-col h-[85%] " +
                "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[0.5rem]  px-[0.5rem]"}>
                <legend className={"rounded-2xl text-custom-black text-md"}>Join As Spectator</legend>
                <label className = {"rounded-2xl text-custom-black text-sm"}>Enter room number</label>
                <input  required
                        min={0}
                        max={1000000}
                        type={"number"}
                        onChange={(e)=>(handleRoomNumber(e))}
                        className={"peer/Num rounded-md text-custom-black border-custom-black border-10 bg-transparent w-[90%]"}
                        onBlur={(e)=>{checkInvalid(e)}}
                />
                <p className={`text-red-600  text-xs m-0 ${roomEror}`}>Invalid Number(must between 0 and 1000000)</p>
                <label className = {"rounded text-custom-black m-0 text-sm"}>Enter username</label>
                <input required
                       type={'text'}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"}
                />
                <p className={`text-red-600 m-0 text-xs mb-[0.2rem] ${userNameError}`}>Empty Username</p>
            </fieldset>
            <NavLink
                className=
                    {" text-center " +
                        "no-underline border border-custom-black hover:shadow-transparent " +
                        "text-custom-black font-bold  "  +
                        "h-[10%] py-[0.5rem] px-4 m-auto join-button "}
                onClick={(e)=>{
                    socket.emit(EVENTS.JOIN_AS_SPECTATOR, roomNumber, userName);
                    finalCheck(e)
                 }} to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
     )
}