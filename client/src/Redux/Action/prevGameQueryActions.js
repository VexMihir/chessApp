import {LOADOBJDATABASE} from "../String/prevGameQueryInit";

export function loadDataBaseObj(payload) {
    return {
        type: LOADOBJDATABASE,
        payload: payload
    }
}