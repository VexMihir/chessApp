import {combineReducers} from "@reduxjs/toolkit";
import {prevGameViewReducer} from "../Reducers/prevGameViewReducer";
import {prevGameQueryReducer} from "../Reducers/prevGameQueryReducers";
import {joinRoomReducer} from "../Reducers/joinPageReducers";
import {setErrorReducer} from "../Reducers/setErrorReducer";
import {analysisReducer} from "../Reducers/AnalysisReducer";

export const rootReducer = combineReducers(
    {
        JoinRoomReducer: joinRoomReducer,
        PrevGameView: prevGameViewReducer,
        PrevGameQuery: prevGameQueryReducer,
        SetError: setErrorReducer,
        AnalyisReducer: analysisReducer
    }
)