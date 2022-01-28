import axios from 'axios';
import backendUrl from '../../.config';

const url = process.env.REACT_APP_BASE_URL;
export const LoginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post(
      backendUrl.baseUrl + '/api/v1/user/auth/auth-tokens',
      userCredentials,
    );
    console.log(res);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res?.data?.data?.accessToken });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error?.response?.data });
    console.log(error?.response?.data);
  }
};
