import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";

//added reducers//
// import user from "./user";
// import order from "./order";
import product from "./product";
import singleProduct from "./singleProduct"

const reducer = combineReducers({ auth, product, singleProduct }); //add reducers here
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
