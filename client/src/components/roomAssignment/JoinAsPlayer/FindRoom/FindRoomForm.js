import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";



export function FindRoomForm() {
    const refInput = useRef(null);
    const refRoom = useRef(null);
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);
    const [userNameError, setuserNameError] = useState(false);
    const [roomEror, setRoomNumberError] = useState(false);


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
        }
    }


    return (
        <div className={"w-[50%] h-[100%] flex flex-col mb-1"}>
            <fieldset className={" " +
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded-2xl text-white"}>Find Room</legend>
                <label>Enter room number</label>
                <br/>
                <input  required
                        min={0}
                        max={1000000}
                        type={"number"}
                        ref={refRoom}
                        onChange={(e)=>(handleRoomNumber(e))}
                        className={"peer/Num rounded-md text-white px-0.5 border-none m-1 bg-violet-900/30 w-[90%]"}
                        onBlur={(e)=>{checkInvalid(e)}}
                />
                {
                    roomEror?  <p className="mb-1 text-pink-700  text-sm">
                        <mark className={"bg-white text-pink-600"}>Room number must be a number between 0 and 1000000
                        </mark></p>: ""

                }
                <br/>
                <label>Enter username</label>
                <br/>
                <input required
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-white  px-0.5 border-none m-1 bg-violet-900/30 w-[90%]"}
                />
                {
                    userNameError?  <p className="mb-1 text-pink-700  text-sm">
                        <mark className={"bg-white text-pink-600"}>Username cannot be empty</mark></p>: ""

                }
            </fieldset>
            <NavLink
                className=
                    {"m-auto text-center " +
                        "no-underline border py-3 px-4 hover:bg-gray-900 " +
                        "text-white font-bold rounded " +
                        "shadow shadow-md shadow-white " +
                        ""}
                onClick={(e)=>{
                        finalCheck(e)
                }}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
            <br />
        </div>
    )
}