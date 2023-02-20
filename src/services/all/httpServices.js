import axios from "axios";
import { logout } from "redux/modules/auth";
import { API_URL_EDU } from "../../constants/api";
import { CodeConstants } from "../../constants/ApiCode";
import store from "../../redux/store";

const instance = axios.create({
  baseURL: API_URL_EDU,
  timeout: 30000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Do something with response error
    const { response, message } = error || {};
    const { data } = response || {};
    if (response.status === CodeConstants.UnAuthorized) {
      if (response?.data?.code !== CodeConstants.BAD_CREDENTIALS) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(response);
  }
);

export const getData = (url, data) => {
  return instance.get(url, { params: data });
};

export const postData = (url, data) => {
  return instance.post(url, data);
};

export const putData = (url, data) => {
  return instance.put(url, data);
};

export const deleteData = (url, data) => {
  return instance.delete(url, data);
};
