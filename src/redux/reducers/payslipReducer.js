import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  payslipData: {},
};

const payslip = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_PAYSLIP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_PAYSLIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        payslipData: action.payload,
      };
      break;
    case employeeConstants.FETCH_PAYSLLIP_FAILURE:
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

export default payslip;
    