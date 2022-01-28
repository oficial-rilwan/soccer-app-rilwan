import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  employeeData: {},
};

const employees = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_EMPLOYEE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        employeeData: action.payload,
      };
      break;
    case employeeConstants.FETCH_EMPLOYEE_FAILURE:
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

export default employees;
