import { employeeConstants } from '../../lib/constants/employeeConstants';

const initialState = {
  isLoading: false,
  promotionData: {},
};

const promotion = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.FETCH_PROMOTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case employeeConstants.FETCH_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        promotionData: action.payload,
      };
      break;
    case employeeConstants.FETCH_PROMOTION_FAILURE:
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

export default promotion;
