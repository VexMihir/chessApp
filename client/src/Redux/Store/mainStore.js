import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "../RootReducer/rootReducer";
import {loadDBIndexM} from "../Middleware/loadDBIndexM";

export const mainStore = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadDBIndexM),

    }

)