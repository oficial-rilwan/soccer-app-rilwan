import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  quoteData: {},
};

const quote = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_QUOTE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_QUOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        quoteData: action.payload,
      };
      break;
    case employeeConstants.FETCH_QUOTE_FAILURE:
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

export default quote;
    