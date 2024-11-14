import axios, { type AxiosRequestConfig } from 'axios';


export const instance = axios.create({
  baseURL: '/api/v1/',
  timeout: 1000 * 10,
  headers: {
    'Authorization': localStorage.getItem('token') || '',
    'Content-Type': 'application/json',
  },
})

export const instanceNotApi = axios.create({
  baseURL: '/',
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
})

instanceNotApi.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    // 如果状态码是401，表示未认证，清空token
    localStorage.removeItem('token');
    // 可以选择重定向到登录页面或者显示一个错误消息给用户
  }
  return Promise.reject(error);
});