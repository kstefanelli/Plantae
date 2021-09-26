import axios from "axios";
const TOKEN = "token";

//ACTION TYPES
const SET_ALL_ORDERS = "SET_ALL_ORDERS";

//ACTION CREATORS
export const setAllOrders = (orders) => {
  return {
    type: SET_ALL_ORDERS,
    orders,
  };
};

//THUNK CREATORS
export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.get(`/api/order`, {
          headers: {
            authorization: token,
          },
        });
        const orders = response.data;
        dispatch(setAllOrders(orders));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//INITIAL STATE
const initialState = [];

// //REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders;
    default:
      return state;
  }
};
