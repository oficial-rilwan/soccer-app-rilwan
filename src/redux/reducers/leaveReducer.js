import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  leaveData: {},
};

const leaveStatus = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_LEAVE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_LEAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveData: action.payload,
      };
      break;
    case employeeConstants.FETCH_LEAVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        message: action.message,
      };
      break;
    default:
      return state;
  }
};

export default leaveStatus;
