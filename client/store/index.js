import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";

//added reducers//
import users from "./user";
import singleUser from './singleUser'
import order from "./order";
import product from "./product";

const reducer = combineReducers({ 
  auth,
  users,
  singleUser
 }); //add reducers here
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
