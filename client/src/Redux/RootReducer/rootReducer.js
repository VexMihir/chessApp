import {combineReducers} from "@reduxjs/toolkit";
import {pgnReducers} from "../Reducers/prevGameViewReducer";
import {prevGameQueryReducer} from "../Reducers/prevGameQueryReducers";
import {joinRoomReducer} from "../Reducers/joinPageReducers";
import {setErrorReducer} from "../Reducers/setErrorReducer";

export const rootReducer = combineReducers(
    {
        JoinRoomReducer: joinRoomReducer,
        PGNReducer: pgnReducers,
        PrevGameQuery: prevGameQueryReducer,
        SetError: setErrorReducer
    }
)