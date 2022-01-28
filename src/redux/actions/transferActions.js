import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchTransferData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_TRANSFER_LOADING,
  });
  await authClient
    .get(`/api/v1/employee/transfer/management/fetch?transferId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_TRANSFER_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_TRANSFER_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_TRANSFER_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchTransferData };
