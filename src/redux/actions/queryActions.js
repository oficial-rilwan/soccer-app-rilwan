import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchQueryData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_QUERY_LOADING,
  });
  await authClient
    .get(`/api/v1/employee/query/management/fetch?employeeToqueryId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_QUERY_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_QUERY_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_QUERY_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchQueryData };
