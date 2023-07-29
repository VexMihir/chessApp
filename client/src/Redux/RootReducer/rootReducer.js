import {combineReducers} from "@reduxjs/toolkit";
// import {pgnReducers} from "../Reducers/prevGameViewReducer";
import {prevGameViewReducer} from '../Reducers/prevGameViewReducer';
import {prevGameQueryReducer} from "../Reducers/prevGameQueryReducers";
import {joinRoomReducer} from "../Reducers/joinPageReducers";
import {setErrorReducer} from "../Reducers/setErrorReducer";
import { pgnReducer } from "../Reducers/pgnReducer";
import { joinRoomReducer2 } from "../Reducers/joinPageReducers2";

export const rootReducer = combineReducers(
    {
        JoinRoomReducer: joinRoomReducer,
        JoinRoomReducer2: joinRoomReducer2,
        PGNReducer: pgnReducer,
        PrevGameViewReducer: prevGameViewReducer, // Should be called Previous PGN Reducer
        PrevGameQuery: prevGameQueryReducer,
        SetError: setErrorReducer
    }
)