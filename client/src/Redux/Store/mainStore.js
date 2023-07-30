import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "../RootReducer/rootReducer";
import {loadDBIndexM} from "../Middleware/loadDBIndexM";
import {loadAnalysisObj} from "../Middleware/loadAnalysisObj";

export const mainStore = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            [loadDBIndexM, loadAnalysisObj]
        ),
    }
)