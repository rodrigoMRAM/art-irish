import { SET_USER, LOGOUT_USER } from '../actions/userActions';

const initialState = {
  user: null,
  jwt: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { 
        ...state,
        user: action.payload.user,
        jwt: action.payload.jwt,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        jwt: null,
      };
    default:
      return state;
  }
};

export default userReducer;