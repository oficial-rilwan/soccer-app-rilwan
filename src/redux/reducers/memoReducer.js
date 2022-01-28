import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  memoData: {},
};

const memo = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_MEMO_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_MEMO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        memoData: action.payload,
      };
      break;
    case employeeConstants.FETCH_MEMO_FAILURE:
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

export default memo;
    