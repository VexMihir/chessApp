import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import "./RoomAssignment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChess} from '@fortawesome/free-solid-svg-icons'

/**
 *
 * This page includes three forms for joining a room:
 *
 * 1. Create Room Form: Allows users to create a new room by providing a userName. The form generates a new room
 *    number for the user from the backend API endpoint, allowing them to be a player in the created room.
 *
 * 2. Find Room Form: Enables users to join an existing room as a player by entering a room number.
 *
 * 3. Spectator Form: Permits users to join an existing room as a spectator by entering a room number.
 *
 */
export default function RoomAssignment() {

    return (
        <div className={
            "w-screen " +
            "bg-chessImage bg-cover bg-center bg-no-repeat  " +
            "flex flex-col " +
            "overflow-y: auto"
        }>
            <div className={"flex flex-col min-h-[150px]"}>
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
                className={"min-h-[470px]"}
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
                className={"h-[270px] p-[0.5rem] w-[95.55%] items-center "}
            >
                <Outlet />
            </div>
        </div>

    )
}