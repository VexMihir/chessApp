import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "../RootReducer/rootReducer";
import {loadDBIndexM} from "../Middleware/loadDBIndexM";

export const mainStore = configureStore(
    {
        reducer: rootReducer,
        //it seems that middleware is never used. 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadDBIndexM),
    }
)