import {combineReducers} from "@reduxjs/toolkit";
import {pgnReducers} from "../Reducers/PGN_Reducers";
import {prevGameQueryReducer} from "../Reducers/prevGameQuery_Reducers";
import { FENReducers } from '../Reducers/FEN_Reducers'
export const rootReducer = combineReducers(
    {
        PGNReducer: pgnReducers,
        FENReducer: FENReducers,
        PrevGameQuery: prevGameQueryReducer
    }
)
