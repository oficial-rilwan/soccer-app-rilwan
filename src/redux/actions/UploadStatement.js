import { importStatementConstants } from 'lib/constants';

const UploadStatement = (file) => async (dispatch) => {
  dispatch({
    type: importStatementConstants.SAVE_FILE_SUCCESS,
    payload: file,
  });
};

export default UploadStatement;
