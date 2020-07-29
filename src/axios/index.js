import router from '../router'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL

// http request 拦截器
axios.interceptors.request.use(
  config => {

    // if (userInfo.token) {
    //   config.headers.token = userInfo.token;
    // }
    // config.headers = {
    //   'Content-Type':'multipart/form-data'
    // };
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
