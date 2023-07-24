import {SETERROR} from "../String/error";


export function setERROR(payload) {
    return {
        type: SETERROR,
        payload: payload
    }
}
