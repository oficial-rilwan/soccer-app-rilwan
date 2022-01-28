import { userConstants } from '../../lib/constants/userConstants';

const initialState = {
  isLoading: false,
};

const loginStats = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGN_IN_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        redirect: false,
        isLoading: false,
      };

    case userConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        token: action.payload.token,
        user: action.payload.user,
        redirect: true,
        isLoading: false,
      };

    case userConstants.LOGOUT:
      return {
        ...state,
        token: '',
        user: '',
        isLoading: false,
        googleUser: '',
        googleToken: '',
        redirect: false,
        nextTab: '',
      };

    case userConstants.SIGN_IN_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case userConstants.GOOGLE_SIGNIN_SUCCESS:
      return {
        ...state,
        googleUser: action.payload.user,
        googleToken: action.payload.token,
        nextTab: action.payload.nextTab,
        isLoading: false,
      };
    case userConstants.GOOGLE_SIGNIN_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.error,
        isLoading: false,
      };
    case userConstants.GOOGLE_SIGNIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    // case userConstants.FACEBOOK_SIGNIN_SUCCESS:
    //   return {
    //     ...state,
    //     facebookUser: action.payload.user,
    //     facebookToken: action.payload.token,
    //     redirect: true,
    //     nextTab: action.payload.nextTab,
    //     isLoading: false,
    //   };
    //   break;
    // case userConstants.FACEBOOK_SIGNIN_FAILURE:
    //   return {
    //     ...state,
    //     status: action.payload.status,
    //     message: action.payload.error,
    //     isLoading: false,
    //   };
    //   break;
    // case userConstants.FACEBOOK_SIGNIN_LOADING:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    //   break;
    default:
      return state;
  }
};

export default loginStats;
