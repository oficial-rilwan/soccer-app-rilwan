import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchSuspensionData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_SUSPENSION_LOADING,
  });
  await authClient
    .get(`/api/v1/employee/suspension/management/fetch?suspensionId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_SUSPENSION_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_SUSPENSION_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_SUSPENSION_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchSuspensionData };
