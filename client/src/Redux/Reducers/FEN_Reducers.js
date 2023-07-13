import { ADD_FEN, FEN_INITIALSTATE } from '../String/FEN_INITIALSTATE'

export const FENReducers = (state = FEN_INITIALSTATE, action) => {
    switch (action.type) {
        case ADD_FEN: {
            const newFEN = action.payload
            // Source: https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux           
            return {...state, FEN: [...state.FEN, newFEN]}
        }
        default: return state
    }
}