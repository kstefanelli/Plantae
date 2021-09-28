import axios from "axios";
const TOKEN = 'token'

//ACTION TYPES
const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT"
const CREATE_PRODUCT = "CREATE_PRODUCT"

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

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
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
//look at user store
export const deleteSingleProduct = (id, history) => {
  return async(dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if(token){
      const { data: deleted } = await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: token
        }
        } );
      dispatch(deleteProduct(deleted))
      history.push('/products')
    }
  }
    catch (err) {
    console.log(err)
    }
  }
}

export const createNewProduct = (product, history) => {
  return async(dispatch) => {
    try {
      const { data: created } = await axios.post('/api/products', product);
      dispatch(createProduct(created))
      history.push('/products')
    }
    catch (err) {
      console.log(err)
    }
  }
};
//INITIAL STATE
const initialState = [];

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    case CREATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
};
