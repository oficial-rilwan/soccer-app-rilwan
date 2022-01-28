import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  queryData: {},
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_QUERY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_QUERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        queryData: action.payload,
      };
      break;
    case employeeConstants.FETCH_QUERY_FAILURE:
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

export default query;
    