import {combineReducers} from "@reduxjs/toolkit";
import {pgnReducers} from "../Reducers/PGN_Reducers";
import {prevGameQueryReducer} from "../Reducers/prevGameQuery_Reducers";

export const rootReducer = combineReducers(
    {
        PGNReducer: pgnReducers,
        PrevGameQuery: prevGameQueryReducer
    }
)