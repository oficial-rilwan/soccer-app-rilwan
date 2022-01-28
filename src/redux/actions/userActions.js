const { LS } = require('lib');
import { userConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const signup = (
  { email, password, firstName, lastName, newsletter },
  handleError,
  setValue,
) => (dispatch) => {
  dispatch({
    type: userConstants.SIGN_UP_LOADING,
  });
  authClient
    .post('https://jureb-api-staging.herokuapp.com/api/v1/user/auth/signup', {
      email,
      password,
      firstName,
      lastName,
      newsletter,
    })
    .then((response) => {
      if (response.status == 201) {
        dispatch({
          type: userConstants.SIGN_UP_SUCCESS,
          payload: {
            user: response.data.data,
            status: response.status,
            token: response.data.accessToken,
            message: response.message,
            verified: false,
            activeTab: 'Profile',
          },
        });
        LS.setI;
        console.log(response);
      } else {
        LS.remove('accessToken');
        LS.remove('firstName');
        LS.remove('lastName');
        dispatch({
          type: userConstants.SIGN_UP_FAILURE,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: userConstants.SIGN_UP_FAILURE,
        payload: {
          status: error?.response?.status,
          message: error?.response?.data?.data,
        },
      });
      handleError('email', {
        type: 'manual',
        message: error?.response?.data?.data,
      });
      setValue('password', '');
    });
};

const update = (userId, data, handleError) => (dispatch) => {
  dispatch({
    type: userConstants.UPDATE_PROFILE_LOADING,
  });
  authClient
    .put(`${urlConstants.UPDATE_PROFILE_URL}${userId}`, data)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: userConstants.UPDATE_PROFILE_SUCCESS,
          payload: {
            user: response.data.data,
            status: response.status,
            telephone: response.data.data.phone,
            token: response.data.data.accessToken,
            message: response.message,
            verified: false,
            activeTab: 'Complete',
          },
        });
      } else {
        LS.remove('accessToken');
        LS.remove('firstName');
        LS.remove('lastName');

        dispatch({
          type: userConstants.UPDATE_PROFILE_FAILURE,
          payload: {
            status: error.response.status,
            message: error.response.data.error,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({
        type: userConstants.UPDATE_PROFILE_FAILURE,
        payload: {
          status: error.status,
          message: error.message || error.response.data.error,
        },
      });
      handleError(error?.response?.data?.data);
    });
};

const completeProfile = (userId, otp, handleError) => (dispatch) => {
  dispatch({
    type: userConstants.COMPLETE_PROFILE_LOADING,
  });
  authClient
    .post(`/api/v1/sub-admin/verify/otp?subAdminId=${userId}`, otp)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: userConstants.COMPLETE_PROFILE_SUCCESS,
          payload: {
            status: response.status,
            token: response.data.data.token,
            activeTab: 'Successful',
            verified: false,
            path: '/plans',
          },
        });
      } else {
        LS.remove('accessToken');
        LS.remove('firstName');
        LS.remove('lastName');

        dispatch({
          type: userConstants.COMPLETE_PROFILE_FAILURE,
          payload: {
            status: response.status,
            message: response.data.error,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: userConstants.COMPLETE_PROFILE_FAILURE,
        payload: {
          // status: error.response.status,
          message: error.response.data.error,
        },
      });
      handleError(error?.response?.data?.error);
    });
};

const userVerified = () => (dispatch) => {
  dispatch({
    type: userConstants.USER_VERIFIED,
    payload: {
      verified: true,
    },
  });
};

// Plans action

const plansData = (data) => (dispatch) => {
  dispatch({
    type: userConstants.PLANS_DATA,
    payload: {
      data: data,
    },
  });
};

const clearHistory = () => (dispatch) => {
  dispatch({
    type: userConstants.CLEAR_LOGS,
  });
};

export default {
  signup,
  update,
  completeProfile,
  userVerified,
  plansData,
  clearHistory,
};
