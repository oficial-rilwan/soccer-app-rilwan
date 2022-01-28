import { employeeConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchTerminationData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_TERMINATION_LOADING,
  });
  await authClient
    .get(`/api/v1/employee/terminate/management/fetch?terminationId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_TERMINATION_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_TERMINATION_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_TERMINATION_FAILURE,
      });
      handleErr(err);
    });
};

const fetchRetirementData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_RETIREMENT_LOADING,
  });
  await authClient
    .get(`/api/v1/employee/retire/management/fetch?retirementId=${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_RETIREMENT_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_RETIREMENT_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_RETIREMENT_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchTerminationData, fetchRetirementData };
