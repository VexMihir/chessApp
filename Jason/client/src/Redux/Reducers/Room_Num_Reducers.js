import { addRoomNum } from '../Action/Room_Num_Actions';
import { ADD_Room_Num, Room_Num_INITIALSTATE } from '../String/Room_num_INITIALSTATE'
//Source: https://chat.openai.com/share/3887c068-449f-458e-80c8-38e717a5232c
// Redux action creators
const fetchDataRequest = () => ({
    type: 'FETCH_DATA_REQUEST',
  });
  
  const fetchDataSuccess = (data) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  });
  
  const fetchDataFailure = (error) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  });

  // Thunk action creator
export const fetchData = (url) => {
    return (dispatch) => {
      dispatch(fetchDataRequest());
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {

            console.log("line 27", data);
            dispatch(addRoomNum(data))
        //   dispatch(fetchDataSuccess(data));
        })
        .catch((error) => {
          dispatch(fetchDataFailure(error));
        });
    };
  };


export const Room_Num_Reducers = (state = Room_Num_INITIALSTATE, action) => {
    switch (action.type) {
        case ADD_Room_Num: {
            const newRoom = action.payload
            // Source: https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux           
            return {...state, Room_Num: [...state.Room_Num, newRoom]}
        }
        default: return state
    }
}