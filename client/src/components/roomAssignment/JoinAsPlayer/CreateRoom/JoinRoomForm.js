import {NavLink} from "react-router-dom";
import {useState} from "react";

export function JoinRoomForm() {
    const [userName, setUserName] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");

    const handleOnChange = (e) => {
        checkEmptyUserName(e)
        e.preventDefault();
        setUserName(e.target.value);
    }

    const checkEmptyUserName = (e) => {
        if(!e.target.value || e.target.value.length === 0) {
            setuserNameError(" ")
        } else {
            setuserNameError("invisible")
        }
    }

    const finalCheck = (e) => {
        if (!userName || userName.length === 0 ) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        }
    }

    return (
        <div className={"w-[50%] h-[100%] flex flex-col items-stretch  "}>
            <fieldset className={"flex flex-col h-[85%] " +
                "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[0.5rem]  px-[0.5rem]"}>
                <legend className={"rounded-2xl text-custom-black text-md text-black"}>Create Room</legend>
                <label className = {"rounded-2xl text-custom-black text-sm"} >Enter username</label>
                <input required
                       type={"text"}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"}
                />
                <p className={`text-red-600  text-sm ${userNameError}`}>Empty username</p>
            </fieldset>
            <NavLink
                className=
                    {   " text-center " +
                        "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
                        "text-custom-black font-bold rounded " +
                        "shadow shadow-md shadow-custom-black " +
                        "h-[10%] py-[0.5rem] px-4 m-auto mt-[1.5rem] "
                    }
                onClick={(e)=>{finalCheck(e)}}
                to={"/waitingRoomForm"}
                state={{userName: userName}
                }>Create Room</NavLink>
        </div>
    )
}