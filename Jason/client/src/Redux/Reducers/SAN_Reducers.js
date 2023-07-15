import { ADD_SAN, SAN_INITIALSTATE } from '../String/SAN_INITIALSTATE'

export const SANReducers = (state = SAN_INITIALSTATE, action) => {
    switch (action.type) {
        case ADD_SAN: {
            const newSAN = action.payload
            // Source: https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux           
            // Replace not push ()
            return newSAN
            // return {...state, SAN: [...state.SAN, newSAN]}
        }
        default: return state
    }
}