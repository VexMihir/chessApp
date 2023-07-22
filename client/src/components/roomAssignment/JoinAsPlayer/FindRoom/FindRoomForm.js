import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function FindRoomForm() {
    const refInput = useRef(null);
    const refRoom = useRef(null);
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);

    const handleOnChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    const handleRoomNumber = (e) => {
        e.preventDefault();
        setRoomNumber(Number(e.target.value))
    }

    return (
        <div className={"grid grid-rows-[auto_auto] w-[80%] h-[80%] opacity-90 p-4"}>
            <fieldset className={"inline-block m-auto p-2 border border-solid border-purple-450 border-3 mt-[1rem] h-[80%]" +
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded-2xl text-white"}>Find Room</legend>
                <input  required
                        min={0}
                        max={1000000}
                        type={"number"}
                       placeholder={"Enter Room Number"}
                       ref={refRoom}
                       onChange={(e)=>(handleRoomNumber(e))}
                       className={"peer/Num rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <p className="m-0 invisible peer-invalid/Num:visible text-white font-extrabold  text-sm">Room must be a
                    number between 0 and 1000000</p>
                <input required
                       type={"text"} placeholder={"Enter Your User Name"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"peer/Text rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <p className="m-0 invisible peer-invalid/Text:visible text-white font-extrabold  text-sm">Username cannot be empty</p>
            </fieldset>
            <NavLink
                className=
                    {"no-underline border  inline block mt-3 py-2 px-4 hover:bg-gray-900 " +
                        "text-white font-bold border border-purple-450 rounded " +
                        "shadow shadow-md shadow-white " +
                        "m-auto"}
                onChange={(e)=>(handleRoomNumber(e))}
                to={"/inGameView/"+ roomNumber}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
    )
}