import axios from "axios";
const TOKEN = "token";

const SET_ACTIVE_CART = "SET_ACTIVE_CART"
const UPDATE_ORDER = "UPDATE_ORDER";

export const setActiveCart = (activeCart) => {
  return {
    type: SET_ACTIVE_CART,
    activeCart,
  };
};

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

export const fetchActiveCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.get(`/api/order/currentOrder/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        const cart = response.data;
        dispatch(setActiveCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUserOrder = (productId, userId, cartId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.put(`/api/order/${cartId}/${userId}`, {
          headers: {
            authorization: token,
          },
          body: {
            productId: productId,
            quantity: quantity
          }
        });
        const order = response.data;
        dispatch(updateOrder(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.order
    case SET_ACTIVE_CART:
      return action.activeCart
    default:
      return state;
  }
};
