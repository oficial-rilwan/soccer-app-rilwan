import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  suspensionData: {},
};

const suspension = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_SUSPENSION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_SUSPENSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        suspensionData: action.payload,
      };
      break;
    case employeeConstants.FETCH_SUSPENSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        message: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default suspension;
