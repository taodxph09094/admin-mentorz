import * as types from "redux/types";

export const login = (account, password) => ({
  type: types.REQUEST_LOGIN,
  payload: {
    account,
    password,
  },
});

export const checkAuth = () => ({
  type: types.REQUEST_CHECK_AUTH,
});

export const logout = () => ({
  type: types.REQUEST_LOGOUT,
});
