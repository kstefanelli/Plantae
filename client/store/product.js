import axios from "axios";

//ACTION TYPES
const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT"
//ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}
//THUNK CREATORS
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/products");
      const products = response.data;
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteSingleProduct = (productId, history) => {
  return async(dispatch) => {
    try {
      const { data: deleted } = await axios.delete(`/api/products/${productId}`);
      dispatch(deleteProduct(deleted))
      history.push('/products')
    }
    catch (err) {
    console.log(err)
    }
  }
}

//INITIAL STATE
const initialState = [];

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    default:
      return state;
  }
};
