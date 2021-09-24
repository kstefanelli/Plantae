import axios from "axios";
const TOKEN = "token";

//ACTION TYPES
const SET_ALL_ORDERS = "SET_ALL_ORDERS";
// const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";

//ACTION CREATORS
export const setAllOrders = (orders) => {
  return {
    type: SET_ALL_ORDERS,
    orders,
  };
};
// export const setSingleOrder = (order) => {
//   return {
//     type: SET_SINGLE_ORDER,
//     order,
//   };
// };

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

// export const fetchSingleOrder = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`/api/order/${id}`);
//       const order = response.data;
//       dispatch(setSingleOrder(order));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

//INITIAL STATE
const initialState = {};

// //REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders;
    // case SET_SINGLE_ORDER:
    //   return action.order;
    default:
      return state;
  }
};
