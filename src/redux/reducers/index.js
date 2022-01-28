import auth from './usersReducer';
import loginStats from './authReducers';
import employeeData from './employeeReducer';
import promotionData from './promotionReducer';
import suspensionData from './suspensionReducer';
import terminationData from './terminationReducer';
import transferData from './transferReducer';
import queryData from './queryReducer';
import payrollData from './payrollManagement';
import leaveData from './leaveReducer';
import memoData from './memoReducer';
import quoteData from './quoteReducer';
import payslipData from './payslipReducer';
import statementUpload from './UploadStatementReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  employeeData,
  promotionData,
  memoData,
  payslipData,
  loginStats,
  suspensionData,
  terminationData,
  transferData,
  queryData,
  payrollData,
  leaveData,
  statementUpload,
  quoteData,
});
