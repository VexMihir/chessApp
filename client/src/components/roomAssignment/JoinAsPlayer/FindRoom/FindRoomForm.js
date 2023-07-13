import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function FindRoomForm() {
    const refInput = useRef(null);
    const refRoom = useRef(null);
    const [userName, setUserName] = useState(null);
    const [roomNumber, setRoomNumber] = useState(null);

    const handleOnChange = (e) => {
        e.preventDefault();
        setUserName(refInput.current.value)
    }

    const handleRoomNumber = (e) => {
        e.preventDefault();
        setRoomNumber(Number(refInput.current.value))
    }

    return (
        <div className={"grid grid-rows-[1fr_auto] w-[80%] h-[80%] opacity-90 p-4"}>
            <fieldset className={"inline-block m-auto p-2 border border-solid border-purple-450 border-3 mt-[1rem] w-[80%] h-[50%] " +
                "rounded-xl p-2 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded text-white m-1"}>Enter Room Number</legend>
                <input type={"text"} placeholder={"Enter Room Number"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"rounded-md text-white px-0.5 border-none mbt-4 bg-violet-900/30 w-[80%] h-[90%]"}
                />
            </fieldset>
            <NavLink
                className=
                    {"no-underline border  inline block mt-5 py-2 px-4 hover:bg-gray-100 " +
                        "text-white font-bold border border-purple-450 rounded " +
                        "shadow shadow-md shadow-white " +
                        "m-auto"}
                to={"/waitingRoomForm"}
                state={{userName: userName}}
            >Join Room</NavLink>
        </div>
    )
}