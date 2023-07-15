import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from '../RootReducer/rootReducer'

export const mainStore = configureStore(
    {
        reducer: rootReducer
    }

)