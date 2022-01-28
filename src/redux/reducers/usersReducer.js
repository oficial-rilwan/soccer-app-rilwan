import { userConstants } from '../../lib/constants/userConstants';

const initialState = {
  isLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        user: action.payload.user,
        nextTab: action.payload.activeTab,
      };
      break;

    case userConstants.SIGN_UP_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case userConstants.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        message: action.payload.message,
      };
      break;
    case userConstants.LOGOUT:
      return {
        ...state,
        isLoading: false,
        user: '',
        status: '',
        nextTab: '',
        redirect: false,
      };
      break;

    case userConstants.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.data,
        phone: action.payload.telephone,
        isLoading: false,
        nextTab: action.payload.activeTab,
      };
      break;

    case userConstants.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        message: action.payload.message,
      };
      break;

    case userConstants.UPDATE_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case userConstants.COMPLETE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        token: action.payload.token,
        path: action.payload.path,
        nextTab: action.payload.activeTab,
      };
      break;

    case userConstants.COMPLETE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        message: action.payload.message,
      };
      break;

    case userConstants.COMPLETE_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case userConstants.USER_VERIFIED:
      return {
        ...state,
        isLoading: false,
        verified: action.payload.verified,
      };
      break;

    // Plans reducer
    case userConstants.PLANS_DATA:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
      break;
    case userConstants.CLEAR_LOGS:
      return {
        ...state,
        isLoading: false,
        data: {},
        user: '',
        status: '',
        message: '',
      };
      break;
    default:
      return state;
  }
};

export default auth;
