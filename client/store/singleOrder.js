import axios from "axios";
const TOKEN = "token";

//ACTION TYPES
const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
const SET_CURRENT_ORDER = "SET_CURRENT_ORDER ";

//ACTION CREATORS
export const setSingleOrder = (singleOrder) => {
  return {
    type: SET_SINGLE_ORDER,
    singleOrder,
  };
};
export const setCurrentOrder = (singleOrder) => {
  return {
    type: SET_CURRENT_ORDER,
    singleOrder,
  };
};

//THUNK CREATORS
export const fetchSingleOrder = (id, orderId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.get(`/api/order/${id}/${orderId}`, {
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

export const fetchCurrentOrder = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.get(`/api/order/currentOrder/${id}`, {
          headers: {
            authorization: token,
          },
        });
        const order = response.data;
        dispatch(setCurrentOrder(order));
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
      return action.singleOrder;
    case SET_CURRENT_ORDER:
      return action.singleOrder;
    default:
      return state;
  }
};
