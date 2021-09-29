import axios from "axios";
const TOKEN = 'token'

//ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT"

//ACTION CREATORS
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

export const updateSingleProduct = (product) => {
  return {
      type: UPDATE_PRODUCT,
      product,
  };
};

//THUNK CREATORS
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      const product = response.data;
      dispatch(setSingleProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (id, product, history) => {
  return async (dispatch) => {
    try {
      console.log("ID", id)
      const token = window.localStorage.getItem(TOKEN);
      console.log(token)
      if(token){
      const { data: updated } = await axios.put(`/api/products/${id}`, {
        headers: {
          authorization: token
        },
        body: product
        });
        console.log("UPDATED", updated)
      dispatch(updateSingleProduct(updated));
      history.push(`/products/${id}`)
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//INITIAL STATE
const initialState = {};

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case UPDATE_PRODUCT:
      return {...state, name: action.name, description: action.description, price: action.price, inventory: action.inventory}
    default:
      return state;
  }
};
