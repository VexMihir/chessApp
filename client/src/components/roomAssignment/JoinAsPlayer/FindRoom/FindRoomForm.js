import {NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { SocketContext } from "../../../../context/socket";
import { EVENTS } from "../../../../constants/aliases";

/**
 * With help of chatGPT rephrasing and grammar checking
 * Find Room Form
 *
 * The Find Room form allows users to enter a room number to navigate to a specific room specified by the user. If
 * the entered room number corresponds to an existing room with available slots, the user will be directed to that
 * room.
 *
 */

/*
Find room navigates users to specific room specified by the user.
 */
export function FindRoomForm() {
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");
    const [roomEror, setRoomNumberError] = useState("invisible");
    const [isRoomFull, setIsRoomFull] = useState('');
    const socket = useContext(SocketContext);

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
        if(!e.target.value || e.target.value.length === 0 || isNaN(Number(e.target.value))) {
            setRoomNumberError(" ")
        } else {
            setRoomNumberError("invisible")
        }
    }
    const finalCheck = (e) => {
        if (!userName || userName.length === 0) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        } else if (!roomNumber || roomNumber < 0 || roomNumber > 1000000) {
            e.preventDefault();
            window.alert("ROOM NUMBER IS INVALID")
        } else if (isRoomFull) {
            e.preventDefault();
            window.alert("The room is full. If you want to join the room, you can join as a spectator by clicking the Join As Spectator tab.");
        } else {
            socket.emit(EVENTS.JOIN_ROOM, roomNumber, userName)
        }
    }

    useEffect(() => {
        if (roomNumber !== null) {
            socket.emit(EVENTS.CHECK_IF_ROOM_FULL, roomNumber);
        }
        socket.on(EVENTS.CHECK_IF_ROOM_FULL, (isRoomFull) => {
            setIsRoomFull(isRoomFull)
        })

    }, [roomNumber]) 

    return (
        <div className={"w-[50%] h-[100%] flex flex-col items-stretch  "}>
            <fieldset className={"flex flex-col h-[85%] " +
                "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[1.2rem]  px-[0.5rem]"}>
                <legend className={"rounded-2xl text-custom-black text-md "}>Find Room</legend>
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
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"}
                />
                <p className={`text-red-600 m-0 text-xs mb-[0.2rem] ${userNameError}`}>Empty Username</p>
            </fieldset>
            <NavLink
                className=
                    {" text-center " +
                        "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
                        "text-custom-black font-bold rounded " +
                        "shadow shadow-md shadow-custom-black " +
                        "h-[10%] py-[0.5rem] px-4 m-auto join-button "}
                onClick={(e)=>{
                    finalCheck(e)
                }}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
    )
}