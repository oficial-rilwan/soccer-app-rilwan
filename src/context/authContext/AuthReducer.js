const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        loginUser: null,
        loading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        loginUser: action.payload,
        loading: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        loginUser: null,
        loading: false,
        error: action.payload,
      };
  }
};
export default Reducer;
