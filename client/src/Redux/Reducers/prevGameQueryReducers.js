import {LOADOBJDATABASE} from "../String/prevGameQueryInit";
const initArr = {
    flag: false,
    databaseArr: []
}

export function prevGameQueryReducer(state = initArr, action) {
    switch (action.type) {
        case LOADOBJDATABASE: {
            return {
                ...state,
                flag: true,
                databaseArr: [
                    ...state.databaseArr,
                    ...action.payload
                ]
            }
        }
        default: return state;
    }
}