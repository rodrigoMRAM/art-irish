export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
