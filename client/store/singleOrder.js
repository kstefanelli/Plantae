// import axios from "axios";
// const TOKEN = "token";

// //ACTION TYPES
// const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
// const SET_CURRENT_ORDER = "SET_CURRENT_ORDER ";
// const ADD_QUANTITY = "ADD_QUANTITY";
// const SUBTRACT_QUANTITY = "SUBTRACT_QUANTITY";
// const REMOVE_ITEM = "REMOVE_ITEM";

// //ACTION CREATORS
// export const setSingleOrder = (singleOrder) => {
//   return {
//     type: SET_SINGLE_ORDER,
//     singleOrder,
//   };
// };
// export const setCurrentOrder = (singleOrder) => {
//   return {
//     type: SET_CURRENT_ORDER,
//     singleOrder,
//   };
// };
// // export const _addQuantity = (item) => {
// //   return {
// //     type: ADD_QUANTITY,
// //   };
// // };
// // export const _subtractQuantity = (item) => {
// //   return {
// //     type: SUBTRACT_QUANTITY,
// //   };
// // };
// export const _removeItem = (item) => {
//   return {
//     type: REMOVE_ITEM,
//     item,
//   };
// };

// //THUNK CREATORS
// export const fetchSingleOrder = (id, orderId) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       if (token) {
//         const response = await axios.get(`/api/order/${id}/${orderId}`, {
//           headers: {
//             authorization: token,
//           },
//         });
//         const order = response.data;
//         dispatch(setSingleOrder(order));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const fetchCurrentOrder = (id) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       if (token) {
//         const response = await axios.get(`/api/order/currentOrder/${id}`, {
//           headers: {
//             authorization: token,
//           },
//         });
//         const order = response.data;
//         dispatch(setCurrentOrder(order));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const addQuantity = (id) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       if (token) {
//         const response = await axios.get(`/api/order/currentOrder/${id}`, {
//           headers: {
//             authorization: token,
//           },
//         });
//         const order = response.data;
//         dispatch(setCurrentOrder(order));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// // export const subtractQuantity = (id) => {
// //   return async (dispatch) => {
// //     try {
// //       const token = window.localStorage.getItem(TOKEN);
// //       if (token) {
// //         const response = await axios.get(`/api/order/currentOrder/${id}`, {
// //           headers: {
// //             authorization: token,
// //           },
// //         });
// //         const order = response.data;
// //         dispatch(setCurrentOrder(order));
// //       }
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// // };

// export const removeItem = (userId, cartItemId) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       if (token) {
//         const response = await axios.delete(
//           `/api/order/${userId}/${cartItemId}`,
//           {
//             headers: {
//               authorization: token,
//             },
//           }
//         );
//         const item = response.data;
//         dispatch(_removeItem(item));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// //INITIAL STATE
// const initialState = {};

// // //REDUCER
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SINGLE_ORDER:
//       return action.singleOrder;
//     case SET_CURRENT_ORDER:
//       return action.singleOrder;
//     // case ADD_QUANTITY:
//     //   return
//     // case SUBTRACT_QUANTITY:
//     //   return
//     case REMOVE_ITEM:
//       const currentItems = state.products;
//       return {
//         ...state,
//         products: currentItems.filter(
//           (item) => item.id !== action.item.productId
//         ),
//       };
//     default:
//       return state;
//   }
// };
