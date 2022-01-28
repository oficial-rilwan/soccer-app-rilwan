import axios from 'axios';
import { LS } from 'lib';
import { urlConstants } from 'lib/constants/urlConstants';

export const settings = {
  baseURL: urlConstants.BASEURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
};

// accessToken
// TODO: read "accessToken" from local storage
let getToken = '';

try {
  getToken = LS.get('jureb_redux_state');
} catch (error) {
  console.log(error);
}

// Authorization headers should be set
settings.headers.Authorization =
  getToken &&
  getToken?.loginStats &&
  `Bearer ${
    getToken?.loginStats?.googleToken ||
    getToken.loginStats.token ||
    getToken?.auth?.token
  }`;

export const instance = axios.create(settings);

// Reference: https://github.com/axios/axios
// const AUTH_TOKEN = 'random string from cookie';

// const token = getSession();
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default {
  get(url, request) {
    return instance
      .get(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  post(url, request) {
    return instance
      .post(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  put(url, request) {
    return instance
      .put(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  patch(url, request) {
    return instance
      .patch(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  delete(url, request) {
    return instance
      .delete(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  all(args) {
    return Promise.all(args)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
