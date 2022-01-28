import { employeeConstants, urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';

const fetchPayslipData = ({id}, handleErr) => async (dispatch) => {
    dispatch({
        type: employeeConstants.FETCH_PAYSLIP_LOADING,
    });
    await authClient
        .post(`/api/v1/employee/payslip/management/fetch?employeeId=${id}`)    
        .then((response) => {
            console.log(reponse + ' response from payslip')
            if (response.status == 200) {
                dispatch({
                    type: employeeConstants.FETCH_PAYSLIP_SUCCESS,
                    payload: response.data?.data,
                });
            } else {
                dispatch({
                    type: employeeConstants.FETCH_PAYSLIP_FAILURE,
                    status: response.status,
                    message: response.message,
                });
            }
        })
        .catch((e) => {
            dispatch({
                type: employeeConstants.FETCH_PAYSLIP_FAILURE,
                payload: {
                    status: e.status,
                    message: e.message,
                }
            });
            // handleErr(e?.response?.data?.data);
        });
};

export default { fetchPayslipData };
