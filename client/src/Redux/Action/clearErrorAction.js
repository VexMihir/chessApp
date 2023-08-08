import {CLEARERROR} from "../String/error";

export function clearError(payload) {
    return {
        type: CLEARERROR,
        payload: payload
    }
}
