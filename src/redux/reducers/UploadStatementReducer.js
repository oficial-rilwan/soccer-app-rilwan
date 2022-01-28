import { importStatementConstants } from 'lib/constants';

const initialState = {
  isLoading: false,
  file: null,
};

const importFile = (state = initialState, action) => {
  switch (action.type) {
    case importStatementConstants.SAVE_FILE_SUCCESS:
      return {
        ...state,
        file: action.payload,
      };

    default:
      return state;
  }
};

export default importFile;
