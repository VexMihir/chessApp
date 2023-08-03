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
            "flex flex-col "
        }>
            <div className="title">Castle <FontAwesomeIcon icon={faChess}/> Conquer </div>
            <NavLink
            to={"/PreviousGameView"}
                className="database-button"
            >Database</NavLink>
                    <div>
                        <NavLink  to={"playerForm"}
                                  className= "join-button join-1"
                        >Join As Player
                        </NavLink>
                        <NavLink
                            className="join-button join-2"
                            to={"joinAsSpectator"}>
                            Join As Spectator
                        </NavLink>
                    </div>
                    <Outlet/>
        </div>
    )
}