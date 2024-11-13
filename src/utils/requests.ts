import axios, { type AxiosRequestConfig } from 'axios';


export const instance = axios.create({
  baseURL: '/api/v1/',
  timeout: 1000 * 10,
  headers: {
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