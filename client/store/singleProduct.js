import axios from "axios";

//ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

//ACTION CREATORS
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct
  }
};
//THUNK CREATORS
export const fetchSingleProduct = (id) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
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
export default (state = initialState, action) => {
    switch (action.type) {
      case SET_SINGLE_PRODUCT:
        return action.singleProduct
      default:
        return state
    }
  }
