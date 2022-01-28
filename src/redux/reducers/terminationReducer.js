import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  terminationData: {},
  retirementData: {},
};

const terminate = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_TERMINATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_TERMINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        terminationData: action.payload,
      };
      break;
    case employeeConstants.FETCH_TERMINATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        message: action.payload,
      };
      break;
    case employeeConstants.FETCH_RETIREMENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_RETIREMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        retirementData: action.payload,
      };
      break;
    case employeeConstants.FETCH_RETIREMENT_FAILURE:
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

export default terminate;
