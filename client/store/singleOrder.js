import axios from "axios";
const TOKEN = "token";

//ACTION TYPES
const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";

//ACTION CREATORS
export const setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

//THUNK CREATORS
export const fetchSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.get(`/api/order/${id}`, {
          headers: {
            authorization: token,
          },
        });
        const order = response.data;
        dispatch(setSingleOrder(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//INITIAL STATE
const initialState = {};

// //REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    default:
      return state;
  }
};
