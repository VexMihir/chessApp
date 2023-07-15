import {combineReducers} from "@reduxjs/toolkit";
import {pgnReducers} from "../Reducers/prevGameViewReducer";
import {prevGameQueryReducer} from "../Reducers/prevGameQueryReducers";
import {joinRoomReducer} from "../Reducers/joinPageReducers";

export const rootReducer = combineReducers(
    {
        JoinRoomReducer: joinRoomReducer,
        PGNReducer: pgnReducers,
        PrevGameQuery: prevGameQueryReducer
    }
)