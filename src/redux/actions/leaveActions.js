import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchLeaveDataApproved = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_LEAVE_LOADING,
  });
  await authClient
    .get(`${urlConstants.LEAVE_DATA_APPROVED}${id}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: employeeConstants.FETCH_LEAVE_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_LEAVE_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: employeeConstants.FETCH_LEAVE_FAILURE,
        status: response.status,
        message: response.message,
      });
      handleErr(e);
    });
};

const fetchLeaveDataRejected = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_LEAVE_LOADING,
  });
  await authClient
    .get(`${urlConstants.LEAVE_DATA_REJECTED}${id}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: employeeConstants.FETCH_LEAVE_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_LEAVE_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: employeeConstants.FETCH_LEAVE_FAILURE,
        status: response.status,
        message: response.message,
      });
      handleErr(e);
    });
};

export default { fetchLeaveDataApproved, fetchLeaveDataRejected };
