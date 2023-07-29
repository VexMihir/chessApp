import React, { useEffect, useState } from "react";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import io from 'socket.io-client';


export default function RoomAssignment() {

    const navigate = useNavigate();
    const location = useLocation();

    // const [socket, setSocket] = useState(null)

    // useEffect(() => {
        // const newSocket = io(process.env.BACKEND_URL || 'http://localhost:5001');
    //     console.log("line 200");
        // setSocket(newSocket);
    //     // newSocket.emit('join room', roomId, getUsernameFromState());
    
    //     // newSocket.on('room full', () => {
    //     //   const confirmSpectator = window.confirm('The room is full. Do you want to join as a spectator?');
    //     //   if (confirmSpectator) {
    //     //     newSocket.emit('join as spectator', roomId, getUsernameFromState());
    //     //   } else {
    //     //     navigate('/');
    //     //   }
    //     // });
    
    
    //     // newSocket.on('player disconnected', (roomNumber) => {
    //     //   if (roomId === roomNumber) {
    //     //     // alert('Opponent disconnected');
    //     //     // navigate('/');
    //     //   }
    //     // });
    
    //     // newSocket.on('user list update', (userList) => {
    
    //     //   setPlayers(userList.players);
    
    //     //   console.log("line 247", userList.players);
    //     //   if (userList.spectators.length > 0) {
    //     //     console.log("line 249", userList.spectators);
    //     //     setSpectators(userList.spectators)
    //     //   }
    //     //   if (userList.players.length === 1) {
    //     //     console.log("line 258");
    //     //     // setWhitePlayerName(userList.players[0].username)
    //     //     // if (userList.players[0].color === 'black') {
    //     //       // setOrientation('black')
    //     //     // }
    //     //   }
    //     //   if (userList.players.length === 2) {
    //     //     console.log("line 262");
    //     //     // setBlackPlayerName(userList.players[1].username)
    //     //     // if (userList.players[1].color === 'white') {
    //     //       // setOrientation('black')
    //     //     // }
    //     //   }
    //     //   // setSpectators(userList.spectators);
    //     // });
    
        // return () => {
        //   newSocket.off('moveMade');
        //   newSocket.disconnect();
        // };
        
    //   }, []);
    
      const getUsernameFromState = () => {
        const locationState = location.state;
        console.log("line 391", locationState);
        //Cannot change from userName to playerName because it is tied to the state name and must follow what it is called.
        return locationState ? locationState.userName : '';
      };

    return (
        <div className={
            "h-[calc(100vh_-_20px)] w-[calc(100vw_-_20px)] " +
            "bg-chessImage bg-cover bg-center bg-no-repeat " +
            "rounded-2xl shadow-white shadow-lg " +
            "flex flex-col "
        }>
            <div className={"text-white h-[2%] w-[5%] " +
                "shadow-white shadow-[0px_0px_10px_1px] " +
                "border border-solid border-purple-800 " +
                "p-4 m-4 " +
                "text-center "+
                "no-underline backdrop-blur-md " +
                "shrink-0 "
            }>
                <NavLink
                to={"/PreviousGameView"}
                className={"text-white no-underline text-[2vh]"}
            >Database</NavLink></div>
            <div className={"h-[15%] w-[100%] text-center p-3 mb-auto shrink-0 "
            }
            >
                <h1 className={"text-white m-[2rem] text-[12vh]"}
                    style={{
                        textShadow: "1px 1px 10px purple"
                    }}
                >JAMDK CHESS</h1>
            </div>
            {/*<div className={"h-[70%] w-[50%] mt-auto shrink-0 block ml-5" +*/}
            <div className={"h-[70%] mt-auto shrink-0"} >
                <div
                    className={"grid grid-rows-[5rem_80%] shadow" +
                        " shadow-white shadow-[0px_0px_10px_1px]" +
                        " w-[50%] rounded-2xl" +
                        " border border-solid border-purple-800" +
                        " p-5 m-10 " +
                        " backdrop-blur-md bg-indigo-900/40 float-right relative bottom-0 right-0"}

                >
                    <div
                        className={"grid grid-cols-2 w-[100%]"}
                    >
                        <NavLink  to={"/playerForm"}
                                  className={(state)=> state.isActive ? "text-white no-underline font-bold text-lg " +
                                      "rounded-l-2xl " +
                                      "flex justify-center items-center " +
                                      "hover:bg-violet-900 font-bold " +
                                      "z-0"
                                      :
                                      "text-white no-underline font-bold text-lg " +
                                      "rounded-l-2xl " +
                                      "flex justify-center items-center " +
                                      "hover:bg-violet-900 font-bold " +
                                      "z-1 " +
                                      "shadow-purple-900 shadow-[inset_0px_0px_10px_0.25px]"  }
                        >Join As Player
                        </NavLink>
                        <NavLink
                            className={(state)=> state.isActive ?  "text-white no-underline font-bold text-lg " +
                                "flex justify-center items-center " +
                                "hover:bg-violet-900 font-bold " +
                                "rounded-r-2xl " +
                                "z-0"
                                :
                                "text-white no-underline font-bold text-lg " +
                                "flex justify-center items-center " +
                                "hover:bg-violet-900 font-bold " +
                                "z-1 " +
                                "rounded-r-2xl " +
                                "shadow-purple-900 shadow-[inset_0px_0px_10px_0.25px]" }
                            to={"/joinAsSpectator"}
                        >
                            Join As Spectator
                        </NavLink>
                    </div>
                    <Outlet  />
                </div>
            </div >
        </div>
    )
}