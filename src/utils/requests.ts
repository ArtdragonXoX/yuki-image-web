import axios from 'axios';

export const instance = axios.create({
  baseURL: '/api/v1/',
  timeout: 1000 * 10,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
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


instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    if (error.response.data.code === 2) {
      const retryRequestConfig = error.config;
      localStorage.setItem('token', error.response.data.data);
      retryRequestConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

      return axios(retryRequestConfig).then(response => {
        return response;
      });
    }
    location.reload();
  } else if (error.response) {
    return error.response;
  }
  return Promise.reject(error);
});