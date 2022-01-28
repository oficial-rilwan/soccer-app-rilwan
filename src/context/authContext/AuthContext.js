import { createContext, useEffect, useReducer } from 'react';
import Reducer from './AuthReducer';

const LOGIN_STATE = {
  loginUser: JSON.parse(localStorage.getItem('jureb-user-token')) || null,
  loading: false,
  error: false,
};

export const LoginContext = createContext(LOGIN_STATE);

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, LOGIN_STATE);

  useEffect(() => {
    localStorage.setItem('jureb-user-token', JSON.stringify(state.loginUser));
  }, [state.loginUser]);

  return (
    <LoginContext.Provider
      value={{
        loginUser: state.loginUser,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}>
      {children}
    </LoginContext.Provider>
  );
};
