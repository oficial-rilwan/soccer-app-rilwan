import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  payrollData: [],
};

const payroll = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.STORE_PAYROLL_DATA_REFRESH:
      return {
        ...state,
        payrollData: [],
      };
      break;
    case employeeConstants.STORE_PAYROLL_DATA:
      return {
        ...state,
        payrollData: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default payroll;
