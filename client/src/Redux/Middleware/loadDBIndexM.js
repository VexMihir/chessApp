import {LOADGAME} from "../String/prevGameViewInit";

export const loadDBIndexM = store => next => action => {
    if (action.type === LOADGAME) {
        const newPayload = JSON.stringify(store.getState().PrevGameQuery.databaseArr[action.payload])
        action.payload = newPayload;
        return next(action)
    }
    return next(action)
}
