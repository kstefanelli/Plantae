import axios from "axios";
const TOKEN = "token";

const SET_ACTIVE_CART = "SET_ACTIVE_CART";
const UPDATE_ORDER = "UPDATE_ORDER";
const REMOVE_ITEM = "REMOVE_ITEM";

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
export const _removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
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
export const removeItem = (userId, productId) => {
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
        dispatch(_removeItem(item));
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
      //need to filter out item just removed from product list
      //action.order => product array => items
      //action.item => has productId
      // const itemId = action.item.id;
      // const productArr = state.activeCart.products;
      // const updatedProducts = productArr.filter((item) => item.id !== )
      console.log("STATE ACTIVECART PRODUCTS", state.activeCart.products);
      console.log("ACTION ITEM", action.item);
      const currentItems = state.activeCart.products.filter(
        (item) => item.id !== action.item.id
      );
      return {
        ...state,
        products: currentItems,
      };

    default:
      return state;
  }
};
