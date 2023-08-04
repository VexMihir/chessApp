import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import "./RoomAssignment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChess} from '@fortawesome/free-solid-svg-icons'


export default function RoomAssignment() {

    return (
        <div className={
            "h-screen w-screen " +
            "bg-chessImage bg-cover bg-center bg-no-repeat " +
            "flex flex-col " +
            "overflow-y: auto"
        }>
            <div className={"flex flex-col"}>
                <div
                    className={"w-[5px] "}
                >
                    <NavLink
                        to={"/PreviousGameView"}
                        className="database-button"
                    >Database</NavLink>
                </div>
                <div
                    className={"h-[150px] "}
                    id="title">Castle <FontAwesomeIcon icon={faChess}/> Conquer
                </div>
            </div>
            <div
                className={"p-[100px] h-[170px]"}
            >
                <NavLink  to={"/playerForm"}
                                  className= "join-button join-1"
                        >Join As Player
                </NavLink>
                <NavLink
                            className="join-button join-2"
                            to={"/joinAsSpectator"}>
                            Join As Spectator
                </NavLink>
            </div>
            <div
                className={"h-[220px] p-[0.5rem] w-[95.55%] items-center"}
            >
                <Outlet />
            </div>
        </div>

    )
}