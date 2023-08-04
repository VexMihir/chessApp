<<<<<<< HEAD
import {NavLink} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import { SocketContext } from "../../../../context/socket";

export function JoinRoomForm() {
    const refInput = useRef(null)
    const [userName, setUserName] = useState(null);
    const [userNameError, setuserNameError] = useState(false);

    const socket = useContext(SocketContext)

    const [isUserCreatedRoom, setUserCreatedRoom] = useState(false)

    useEffect(() => {
        if(socket) {
            console.log("lien 15", socket.id);

            socket.on("is user created room", (isUserCreatedRoom) => {
                console.log("line 14", isUserCreatedRoom);
                setUserCreatedRoom(isUserCreatedRoom)

            })
        }
    }, [socket])

    const handleOnChange = (e) => {
        checkEmptyUserName(e)
        e.preventDefault();
        setUserName(e.target.value);

        socket.emit("is user created room");
=======
import { NavLink } from "react-router-dom";
import { useState } from "react";

export function JoinRoomForm() {
  const [userName, setUserName] = useState(null);
  const [userNameError, setuserNameError] = useState("invisible");
  const [selectedTimeControl, setSelectedTimeControl] = useState(null);
  const [selectedIncrementControl, setSelectedIncrementControl] =
    useState(null);

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
>>>>>>> analysis-fixes2
    }
  };

  const finalCheck = (e) => {
    if (!userName || userName.length === 0) {
      e.preventDefault();
      window.alert("USERNAME CANNOT BE EMPTY");
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
          "flex flex-col h-[115%] " +
          "rounded-xl border-custom-black border-10 p-0 m-0 mb-[0.5rem] pb-[0.5rem]  px-[0.5rem]"
        }
<<<<<<< HEAD
    }

    const finalCheck = (e) => {
        if (isUserCreatedRoom) {
            e.preventDefault();
            window.alert("Socket id has already created a room called")
        } else if (!userName || userName.length === 0 ) {
            e.preventDefault();
            window.alert("USERNAME CANNOT BE EMPTY")
        }
    }

    return (
        <div className={"w-[50%] h-[100%] flex flex-col mb-1"}>
            <fieldset className={"w-[95%] " +
                "rounded-xl p-2 border-custom-black border-10"}>

                <legend className={"rounded text-custom-black " }>Create Room</legend>
                <label className = {"rounded text-custom-black"} >Enter username</label>
                <input required
                       type={"text"}
                       ref={refInput}
                       onChange={(e)=>(handleOnChange(e))}
                       onBlur={(e)=>{checkEmptyUserName(e)}}
                       className={"peer/Text rounded-md text-custom-black py-[0.25rem] border-custom-black border-10 bg-transparent " +
                           "w-[90%] relative " +
                           "m-auto"}
                />
                {
                    userNameError?  <p className="mb-1 text-red-700  text-sm">
                        <mark className={"bg-transparent text-red-600"}>Username cannot be empty</mark></p>: ""

                }
            </fieldset>
            <NavLink
                className=
                    {
                        "m-auto text-center " +
                        "no-underline border border-custom-black rounded-xl py-3 px-4 hover:shadow-transparent " +
                        "text-custom-black font-bold rounded" +
                        "shadow shadow-md shadow-custom-black mt-[1rem]"
                    }
                onClick={(e)=>{finalCheck(e)}}
                to={"waitingRoomForm"}
                state={{userName: userName}
                }>Create Room</NavLink>
=======
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
        <legend className={"rounded-2xl text-custom-black text-md text-black mt-2"}>
          Timer Selection (Mins)
        </legend>
        <div className="flex flex-row justify-around items-center">
          <button
            onClick={() => handleTimeControlSelection("20")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "20" ? "bg-gray-400" : ""
            }`}
          >
            20
          </button>
          <button
            onClick={() => handleTimeControlSelection("15")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "15" ? "bg-gray-400" : ""
            }`}
          >
            15
          </button>
          <button
            onClick={() => handleTimeControlSelection("10")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "10" ? "bg-gray-400" : ""
            }`}
          >
            10
          </button>
          <button
            onClick={() => handleTimeControlSelection("5")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "5" ? "bg-gray-400" : ""
            }`}
          >
            5
          </button>
          <button
            onClick={() => handleTimeControlSelection("3")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "3" ? "bg-gray-400" : ""
            }`}
          >
            3
          </button>
          <button
            onClick={() => handleTimeControlSelection("1")}
            className={`py-2 px-4 rounded-lg ${
              selectedTimeControl === "1" ? "bg-gray-400" : ""
            }`}
          >
            1
          </button>
>>>>>>> analysis-fixes2
        </div>
        <legend className={"rounded-2xl text-custom-black text-md text-black mt-2"}>
          Increment Selection (Secs)
        </legend>
        <div className="flex flex-row justify-around items-center">
          <button
            onClick={() => handleIncrementSelection("1")}
            className={`py-2 px-4 rounded-lg ${
              selectedIncrementControl === "1" ? "bg-gray-400" : ""
            }`}
          >
            +1
          </button>
          <button
            onClick={() => handleIncrementSelection("3")}
            className={`py-2 px-4 rounded-lg ${
              selectedIncrementControl === "3" ? "bg-gray-400" : ""
            }`}
          >
            +3
          </button>
          <button
            onClick={() => handleIncrementSelection("5")}
            className={`py-2 px-4 rounded-lg ${
              selectedIncrementControl === "5" ? "bg-gray-400" : ""
            }`}
          >
            +5
          </button>
          <button
            onClick={() => handleIncrementSelection("10")}
            className={`py-2 px-4 rounded-lg ${
              selectedIncrementControl === "10" ? "bg-gray-400" : ""
            }`}
          >
            +10
          </button>
          <button
            onClick={() => handleIncrementSelection("30")}
            className={`py-2 px-4 rounded-lg ${
              selectedIncrementControl === "30" ? "bg-gray-400" : ""
            }`}
          >
            +30
          </button>
        </div>

        <p className={`text-red-600  text-sm ${userNameError}`}>
          Empty username
        </p>
      </fieldset>
      <NavLink
        className={
          " text-center " +
          "no-underline border border-custom-black rounded-xl hover:shadow-transparent " +
          "text-custom-black font-bold rounded " +
          "shadow shadow-md shadow-custom-black " +
          "h-[10%] py-[0.5rem] px-4 m-auto mt-[1.5rem] "
        }
        onClick={(e) => {
          finalCheck(e);
        }}
        to={"/waitingRoomForm"}
        state={{ userName: userName }}
      >
        Create Room
      </NavLink>
    </div>
  );
}
