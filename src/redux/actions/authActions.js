const { LS } = require('lib');
import axios from 'axios';
import { userConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const login = ({ email, password }, handleErr) => (dispatch) => {
  dispatch({
    type: userConstants.SIGN_IN_LOADING,
  });
  axios
    .post(
      'https://jureb-api-staging.herokuapp.com/api/v1/user/auth/auth-tokens',
      {
        email,
        password,
      },
    )
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: userConstants.SIGN_IN_SUCCESS,
          payload: {
            user: response?.data?.data?.user,
            token: response?.data?.data?.accessToken,
            status: response?.status,
          },
          // payload: response?.data?.data?.accessToken,
        });
        console.log(response?.data?.data?.accessToken);
      } else {
        LS.remove('user');
        LS.remove('token');
        LS.remove('profile');

        dispatch({
          type: userConstants.SIGN_IN_FAILURE,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: userConstants.SIGN_IN_FAILURE,
        payload: {
          error: e.message,
          status: e.status,
        },
      });
      handleErr(e?.response?.data?.error);
    });
};

const logout = (dispatch) => {
  dispatch({
    type: userConstants.LOGOUT,
  });
};

const googleSignin = ({ id_token, access_token }, handleErr, nextTab) => (
  dispatch,
) => {
  dispatch({
    type: userConstants.GOOGLE_SIGNIN_LOADING,
  });
  authClient
    .get(urlConstants.GOOGLE_SIGNUP_URL, {
      params: {
        id_token,
        access_token,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        response?.data?.data?.googleUser?.emailVerified == false
          ? dispatch({
              type: userConstants.GOOGLE_SIGNIN_SUCCESS,
              payload: {
                user: response?.data?.data?.user,
                token: response?.data?.data?.token,
                nextTab: nextTab,
              },
            })
          : dispatch({
              type: userConstants.GOOGLE_SIGNIN_SUCCESS,
              payload: {
                user: response?.data?.data?.user,
                token: response?.data?.data?.token,
                nextTab: nextTab,
              },
            });
      } else {
        LS.remove('user');
        LS.remove('token');
        dispatch({
          type: userConstants.GOOGLE_SIGNIN_FAILURE,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: userConstants.GOOGLE_SIGNIN_FAILURE,
        payload: {
          error: e.message,
          status: e.status,
        },
      });
      handleErr(e?.response?.data?.data);
    });
};

const facebookSignin = ({ id_token, access_token }, handleErr, nextTab) => (
  dispatch,
) => {
  dispatch({
    type: userConstants.FACEBOOK_SIGNIN_LOADING,
  });
  authClient
    .get(urlConstants, {
      params: {
        id_token,
        access_token,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: userConstants.FACEBOOK_SIGNIN_SUCCESS,
          payload: {
            user: response?.data?.data?.user,
            token: response?.data?.data?.token,
            nextTab: nextTab,
          },
        });
      } else {
        LS.remove('user');
        LS.remove('token');
        dispatch({
          type: userConstants.FACEBOOK_SIGNIN_FAILURE,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: userConstants.FACEBOOK_SIGNIN_FAILURE,
        payload: {
          error: e.message,
          status: e.status,
        },
      });
      handleErr(e?.response?.data?.data);
    });
};

const appleSignIn = ({ user, authorization }, handleErr, nextTab) => (
  dispatch,
) => {
  dispatch({
    type: userConstants.APPLE_SIGNIN_LOADING,
  });
  authClient
    .get(urlConstants.APPLE_SIGNUP_URL, {
      params: {
        user,
        authorization,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        response?.data?.data?.apple?.emailVerified == false
          ? dispatch({
              type: userConstants.APPLE_SIGNIN_SUCCESS,
              payload: {
                user: response?.data?.data?.user,
                email: response?.data?.data?.user.email,
                authorization: response?.data?.data?.authorization,
                token: response?.data?.data?.authorization.id_token,
                nextTab: nextTab,
              },
            })
          : dispatch({
              type: userConstants.APPLE_SIGNIN_SUCCESS,
              payload: {
                user: response?.data?.data?.user,
                authorization: response?.data?.data?.authorization,
                token: 'response?.data?.data?.authorization.id_token',
                nextTab: nextTab,
              },
            });
      } else {
        LS.remove('user');
        LS.remove('token');
        dispatch({
          type: userConstants.APPLE_SIGNIN_FAILURE,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: userConstants.APPLE_SIGNIN_FAILURE,
        payload: {
          error: e.message,
          status: e.status,
        },
      });
    });
};

const resetPassword = ({ email }, handleErr) => (dispatch) => {
  console.log(email + ' reset password');
  dispatch({
    type: userConstants.RESET_PASSWORD_LOADING,
  });
  authClient
    .get(urlConstants.RESET_PASSWORD_URL, {
      params: {
        email,
      },
    })
    .then((response) => {
      console.log(response?.data + 'response 1');
      if (response.status == 200) {
        response?.data?.data?.emailVerified == false;
        dispatch({
          type: userConstants.RESET_PASSWORD_SUCCESS,
          payload: {
            email: response?.data?.data?.user.email,
          },
        });
      } else {
        LS.remove('user');
        dispatch({
          type: userConstants.RESET_PASSWORD_FAILURE,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: userConstants.RESET_PASSWORD_FAILURE,
        payload: {
          error: e.message,
          status: e.status,
        },
      });
      handleErr(e?.response?.data?.data);
    });
};

export default {
  login,
  googleSignin,
  facebookSignin,
  appleSignIn,
  resetPassword,
  logout,
};
