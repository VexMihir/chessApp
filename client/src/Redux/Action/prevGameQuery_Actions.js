import {LOADOBJDATABASE} from "../String/prevGameView_INITIALSTATE";

export function loadDataBaseObj(payload) {
    return {
        type: LOADOBJDATABASE,
        payload: payload
    }
}