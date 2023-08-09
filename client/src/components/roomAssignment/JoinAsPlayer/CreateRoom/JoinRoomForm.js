import { NavLink } from "react-router-dom";
import { useState } from "react";
/**
 * With help of chatGPT rephrasing and grammar checking
 * Join Room Forms
 *
 * This set of forms allows users to join different types of rooms and navigate to a waiting page with the retrieved
 * room number from the backend's API endpoint.
 *
 */
export function JoinRoomForm() {
    const [userName, setUserName] = useState(null);
    const [userNameError, setuserNameError] = useState("invisible");
    const [selectedTimeControl, setSelectedTimeControl] = useState("5");
    const [selectedIncrementControl, setSelectedIncrementControl] =
        useState("0");

    const handleOnChange = (e) => {
        checkEmptyUserName(e);
        e.preventDefault();
        setUserName(e.target.value);
    };

    const checkEmptyUserName = (e) => {
        if (!e.target.value || e.target.value.length === 0) {
            setuserNameError(" ");
        } else {
            setuserNameError("invisible");
        }
    };

    const finalCheck = (e) => {
        if (!userName || userName.length === 0) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY");
        } else if (!selectedIncrementControl) {
            e.preventDefault();
            window.alert("PLEASE SELECT DECREMENT CONTROL");
        } else if (!selectedTimeControl) {
            e.preventDefault();
            window.alert("PLEASE SELECT TIME CONTROL");
        }
    };

    const handleTimeControlSelection = (timeControl) => {
        setSelectedTimeControl(timeControl);
    };

    const handleIncrementSelection = (increment) => {
        setSelectedIncrementControl(increment);
    };

    return (
        <div className={"w-[50%] h-[100%] flex flex-col items-stretch"}>
            <fieldset
                className={
                    "flex flex-col h-[100%] " +
                    "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.2rem] pb-[0.2rem]  px-[0.5rem]"
                }
            >
                <legend className={"rounded-2xl text-custom-black text-md text-black"}>
                    Create Room
                </legend>
                <label className={"rounded-2xl text-custom-black text-sm"}>
                    Enter username
                </label>
                <input
                    required
                    type={"text"}
                    onChange={(e) => handleOnChange(e)}
                    onBlur={(e) => {
                        checkEmptyUserName(e);
                    }}
                    className={
                        "peer/Text rounded-md text-custom-black px-0.5 border-custom-black border-10 bg-transparent w-[90%]"
                    }
                />
                <p className={`text-red-600 m-0 text-xs ${userNameError}`}>
                    Empty username
                </p>
                <legend className={"rounded-2xl text-custom-black text-md text-xs text-black m-0"}>
                    Timer Selection (Mins)
                </legend>
                <div className="flex flex-row justify-around items-center">
                    <button
                        onClick={() => handleTimeControlSelection("20")}
                        className={`py-[0.1rem] px-3 rounded-lg text-xs ${
                            selectedTimeControl === "20" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >20</button>
                    <button
                        onClick={() => handleTimeControlSelection("15")}
                        className={`py-[0.1rem] px-3 rounded-lg text-xs ${
                            selectedTimeControl === "15" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >15</button>
                    <button
                        onClick={() => handleTimeControlSelection("10")}
                        className={`py-[0.1rem] px-3 rounded-lg text-xs ${
                            selectedTimeControl === "10" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >10</button>
                    <button
                        onClick={() => handleTimeControlSelection("5")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedTimeControl === "5" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >5</button>
                    <button
                        onClick={() => handleTimeControlSelection("3")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedTimeControl === "3" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >3</button>
                    <button
                        onClick={() => handleTimeControlSelection("1")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedTimeControl === "1" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >1</button>
                </div>
                <legend className={"rounded-2xl text-custom-black text-xs text-black "}>
                    Increment Selection (Secs)
                </legend>
                <div className="flex flex-row justify-around items-center ">
                    <button
                        onClick={() => handleIncrementSelection("0")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "0" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+0</button>
                    <button
                        onClick={() => handleIncrementSelection("1")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "1" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+1</button>
                    <button
                        onClick={() => handleIncrementSelection("3")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "3" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+3</button>
                    <button
                        onClick={() => handleIncrementSelection("5")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "5" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+5</button>
                    <button
                        onClick={() => handleIncrementSelection("10")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "10" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+10</button>
                    <button
                        onClick={() => handleIncrementSelection("30")}
                        className={`py-[0.1rem] px-4 rounded-lg text-xs ${
                            selectedIncrementControl === "30" ? "bg-yellow-400" : ""
                        }`}
                        style={{ fontFamily: 'Grenze'}}
                    >+30</button>
                </div>
            </fieldset>
            <NavLink
                className={
                    " text-center " +
                    "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
                    "text-custom-black font-bold rounded " +
                    "shadow shadow-md shadow-custom-black " +
                    "h-[10%] py-[0.5rem] px-4 m-auto  "
                }
                onClick={(e) => {
                    finalCheck(e);
                }}
                to={"/waitingRoomForm"}
                state={
                    {
                        userName,
                        selectedTimeControl,
                        selectedIncrementControl
                    }
                }
            >
                Create Room
            </NavLink>
        </div>
    );
}