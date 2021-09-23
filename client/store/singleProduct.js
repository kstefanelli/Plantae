import axios from "axios";

//ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

//ACTION CREATORS
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
};
//THUNK CREATORS
export const fetchSingleProduct = (productId) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      const product = response.data;
      dispatch(setSingleProduct(product))
    }
    catch (err){
      console.log(err)
    }
  }
};

//INITIAL STATE
const initialState = {}

//REDUCER
export default function(state = initialState, action) {
    switch (action.type) {
      case SET_SINGLE_PRODUCT:
        return action.product
      default:
        return state
    }
  }
