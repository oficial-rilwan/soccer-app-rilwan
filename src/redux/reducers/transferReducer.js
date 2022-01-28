import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  transferData: {},
};

const transfer = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_TRANSFER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_TRANSFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        transferData: action.payload,
      };
      break;
    case employeeConstants.FETCH_TRANSFER_FAILURE:
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

export default transfer;
