import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchMemoData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_MEMO_LOADING,
  });
  await authClient
    .get(`/api/v1/memo/fetch?memoId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_MEMO_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_MEMO_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_MEMO_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchMemoData };
