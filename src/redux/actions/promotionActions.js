import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchPromotionData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_PROMOTION_LOADING,
  });
  await authClient
    .get(`${urlConstants.PROMOTION_DATA}${id}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: employeeConstants.FETCH_PROMOTION_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_PROMOTION_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_PROMOTION_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchPromotionData };
