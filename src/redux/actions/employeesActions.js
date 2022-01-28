import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchEmployeeData = (id, handleErr) => async (dispatch) => {
  dispatch({
    type: employeeConstants.FETCH_EMPLOYEE_LOADING,
  });
  await authClient
    .get(`${urlConstants.EMPLOYEE_DATA}${id}`)
    .then((response) => {
      if (response.status == 200) {
        dispatch({
          type: employeeConstants.FETCH_EMPLOYEE_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: employeeConstants.FETCH_EMPLOYEE_FAILURE,
          status: response.status,
          message: response.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: employeeConstants.FETCH_EMPLOYEE_FAILURE,
      });
      handleErr(err);
    });
};

export default { fetchEmployeeData };
