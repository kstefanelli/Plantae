import axios from "axios";

//ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';

//ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
};
//THUNK CREATORS
export const fetchProducts = () => {
  return async(dispatch) => {
    try {
      const response = await axios.get('/api/products');
      const products = response.data;
      dispatch(setCampuses(products))
    }
    catch (err){
      console.log(err)
    }
  }
};

//INITIAL STATE
const initialState = []

//REDUCER
export default function(state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return action.products
      default:
        return state
    }
  }
