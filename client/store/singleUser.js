import axios from "axios";

const SINGLE_USER = "SINGLE_USER"

export const setSingleUser = (singleUser) => {
  return {
    type: SINGLE_USER,
    singleUser,
  };
};

export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setSingleUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState =  {}

export default function (state = initialState, action) {
  switch (action.type) {
    case SINGLE_USER:
    return  action.singleUser;
    default:
      return state;
  }
}
