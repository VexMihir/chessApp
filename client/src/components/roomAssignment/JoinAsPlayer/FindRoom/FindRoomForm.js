import {useContext, useEffect} from "react";
import { SocketContext } from "../../../../context/socket";
import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function FindRoomForm() {
    const refInput = useRef(null);
    const refRoom = useRef(null);
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState(false);
    const [roomEror, setRoomNumberError] = useState(false);

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
            setuserNameError(true)
        } else {
            setuserNameError(false)
        }
    }

    const checkInvalid = (e) => {
        if(!e.target.value || e.target.value.length === 0 || isNaN(Number(e.target.value))) {
            setRoomNumberError(true)
        } else {
            setRoomNumberError(false)
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
            socket.emit('join room', roomNumber, userName, (response) => {

            });

        }

    }

    useEffect(() => {

        socket.emit('is room full', roomNumber);

        socket.on('is room full', (isRoomFull) => {
            console.log("line 87 room full");
            setIsRoomFull(isRoomFull)
        })

    }, [roomNumber]) 


    return (
        <div className={"w-[50%] h-[100%] flex flex-col mb-1 justify-center"}>
            <fieldset className={" " +
                "rounded-xl p-2 border-custom-black border-10"}>
                <legend className={"rounded-2xl text-custom-black"}>Find Room</legend>
                <label className = {"rounded-2xl text-custom-black"}>Enter room number</label>
                <br/>

                {/* Source: https://www.w3schools.com/tags/tag_option.asp */}
                <select id="rooms">
                    <option value="">123456</option>
                    <option value="">123457</option>
                    <option value="">123458</option>
                    <option value="">123459</option>
                </select>

                <input  required
                        min={0}
                        max={1000000}
                        type={"number"}
                        ref={refRoom}
                        onChange={(e)=>(handleRoomNumber(e))}
                        className={"peer/Num rounded-md text-custom-black px-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%]"}
                        // onBlur={(e)=>{checkInvalid(e)}}
                />
                {
                    roomEror?  <p className="mb-1 text-red-700  text-sm">
                        <mark className={"bg-transparent text-red-600"}>Room number must be a number between 0 and 1000000
                        </mark></p>: ""

                }
                <br/>
                <label className = {"rounded text-custom-black"}>Enter username</label>
                <br/>
                <input required
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                    //    onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black  px-0.5 border-custom-black border-10 m-1 bg-transparent w-[90%]"}
                />
                {
                    userNameError?  <p className="mb-1 text-red-700  text-sm">
                        <mark className={"bg-transparent text-red-600"}>Username cannot be empty</mark></p>: ""

                }
            </fieldset>
            <NavLink
                className=
                    {"m-auto text-center " +
                        "no-underline border border-custom-black rounded-xl py-3 px-4 mt-5 hover:shadow-transparent " +
                        "text-custom-black font-bold rounded " +
                        "shadow shadow-md shadow-custom-black " +
                        ""}
                onClick={(e)=> {
                    finalCheck(e)
                }}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
            <br />
        </div>
    )
}