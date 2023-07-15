import {combineReducers} from '@reduxjs/toolkit'
import {pgnReducers} from '../Reducers/PGN_Reducers'
import { FENReducers } from '../Reducers/FEN_Reducers'
import { SANReducers } from '../Reducers/SAN_Reducers'
import { Room_Num_Reducers } from '../Reducers/Room_Num_Reducers'

export const rootReducer = combineReducers(
    {
        PGNReducer: pgnReducers,
        FENReducer: FENReducers,
        SANReducer: SANReducers,
        Room_Num_Reducer: Room_Num_Reducers,
    }
)