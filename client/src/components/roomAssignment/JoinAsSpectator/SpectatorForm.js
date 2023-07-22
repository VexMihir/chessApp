import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function SpectatorForm() {
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
        <div className={"grid grid-rows-[1fr_auto] w-[100%] opacity-90 p-4"}>
            <fieldset className={"grid grid-rows-2 grid-cols-2 m-auto p-2 border border-solid border-purple-450 border-3 mt-[1rem] " +
                "rounded-xl p-0 " +
                "shadow shadow-sm shadow-white "}>
                <legend className={"rounded text-white m-1"}>Join As Spectator</legend>
                <input required
                       type={"number"}
                       min={0}
                       max={1000000}
                       placeholder={"Enter Room Number"}
                       onChange={(e)=>(handleRoomNumber(e))}
                       className={"peer/Num rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <p className="m-0 invisible peer-invalid/Num:visible text-white font-extrabold  text-sm">Room must be a
                    number between 0 and 1000000</p>
                <input required
                    type={"text"} placeholder={"Enter Your User Name"}
                       onChange={(e)=>(handleOnChange(e))}
                       className={"peer/Text rounded-md text-white w-80 h-10 px-0.5 border-none m-1 bg-violet-900/30"}
                />
                <p className="mb-1 invisible peer-invalid/Text:visible text-white font-extrabold text-sm">Username cannot be empty</p>

            </fieldset>
            <NavLink
                    className=
                        {"no-underline border  inline block mt-4 py-2 px-4 hover:bg-gray-900 " +
                            "text-white font-bold border border-purple-450 rounded " +
                            "shadow shadow-md shadow-white " +
                            "m-auto mb-[3rem]"}
                    to={"/inGameView/"+ roomNumber}
                    state={{userName: userName}}
                >Join As Spectator</NavLink>
        </div>
    )
}