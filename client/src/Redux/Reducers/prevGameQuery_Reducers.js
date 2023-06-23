import {demo_Obj, LOADOBJDATABASE} from "../String/prevGameView_INITIALSTATE";

export function prevGameQueryReducer(state = demo_Obj, action) {
    switch (action.type) {
        case LOADOBJDATABASE: return action.payload
        default: return state;
    }
}