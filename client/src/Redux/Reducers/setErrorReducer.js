import {SETERROR} from "../String/error";

const initState = null;

export function setErrorReducer(state=initState, action) {
    switch (action.type) {
        case SETERROR: {
            state = action.payload
            return state
        }
        default: return state
    }
}