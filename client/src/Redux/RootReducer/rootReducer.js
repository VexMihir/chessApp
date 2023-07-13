import {combineReducers} from '@reduxjs/toolkit'
import {PGNReducers} from '../Reducers/PGN_Reducers'
import { FENReducers } from '../Reducers/FEN_Reducers'
import { SANReducers } from '../Reducers/SAN_Reducers'

export const rootReducer = combineReducers(
    {
        PGNReducer: PGNReducers,
        FENReducer: FENReducers,
        SANReducer: SANReducers,
    }
)