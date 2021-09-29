import axios from "axios";
const TOKEN = "token";

const SET_ACTIVE_CART = "SET_ACTIVE_CART";
const UPDATE_ORDER = "UPDATE_ORDER";
const REMOVE_ITEM = "REMOVE_ITEM";
const CHECKOUT = "CHECKOUT";

//ACTION CREATORS
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
export const _removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};
export const _checkout = (order) => {
  return {
    type: CHECKOUT,
    order,
  };
};

//THUNKS
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
            quantity: quantity,
          },
        });
        const order = response.data;
        dispatch(updateOrder(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const removeItem = (userId, productId, activeCart) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.delete(
          `/api/order/${userId}/${productId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const item = response.data;
        dispatch(_removeItem(item.productId, activeCart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//"/checkout/:orderId/:userId"
export const checkout = (userId, activeCartId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await axios.put(
          `/api/order/checkout/${activeCartId}/${userId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const order = response.data;
        console.log(order);
        dispatch(_checkout(order));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.order;
    case SET_ACTIVE_CART:
      return action.activeCart;
    case REMOVE_ITEM:
      const currentItems = state.products.filter(
        (item) => item.id !== action.itemId
      );
      return {
        ...state,
        products: currentItems,
      };
    case CHECKOUT:
      return { ...state, orders: [...orders, action.order] };
    default:
      return state;
  }
};
