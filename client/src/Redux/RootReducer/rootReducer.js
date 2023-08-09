import {combineReducers} from "@reduxjs/toolkit";
import {prevGameViewReducer} from "../Reducers/prevGameViewReducer";
import {prevGameQueryReducer} from "../Reducers/prevGameQueryReducers";
import {joinRoomReducer} from "../Reducers/joinPageReducers";
import {setErrorReducer} from "../Reducers/setErrorReducer";
import {analysisReducer} from "../Reducers/AnalysisReducer";
import { roomsReducers } from "../Reducers/roomsReducers";

export const rootReducer = combineReducers(
    {
        JoinRoomReducer: joinRoomReducer,
        RoomsReducer: roomsReducers,
        PrevGameView: prevGameViewReducer,
        PrevGameQuery: prevGameQueryReducer,
        SetError: setErrorReducer,
        AnalyisReducer: analysisReducer
    }
)