import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';

// 设置请求超时时间
axios.defaults.timeout = 10000;
// 设置POST请求头
axios.defaults.headers.Token = '92957a6b2e16a84cd5293001d07ae04f2c490d55';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'

// Request Interceptor
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Token = token;
    } else {
      router.push({path: '/login'});
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// Response Interceptor
axios.interceptors.response.use(
  response => {
    if (response.data.code === 10000) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      // 404请求不存在
      if (error.response.status === 404) {
        Message({
          message: '网络请求不存在',
          type: 'error',
          duration: 1500
        });
      } else { // 其他错误，直接抛出错误提示
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 1500
        });
      }
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

/**
 * Request function
 * @param {String} url [request address]
 * @param {Object} params [request parameters]
 */
export function Request ({url, method, ...params}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      ...params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    });
  });
}