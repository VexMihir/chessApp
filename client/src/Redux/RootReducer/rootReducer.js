import {combineReducers} from "@reduxjs/toolkit";
import {pgnReducers} from "../Reducers/PGN_Reducers";

export const rootReducer = combineReducers(
    {
        PGNReducer: pgnReducers
    }
)