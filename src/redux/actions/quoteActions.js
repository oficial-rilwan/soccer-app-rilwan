import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchQuoteData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_QUOTE_LOADING,
  });
  await authClient
    .get(`/api/v1/accounting/quotation/fetch-single?Id=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_QUOTE_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_QUOTE_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_QUOTE_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchQuoteData };
