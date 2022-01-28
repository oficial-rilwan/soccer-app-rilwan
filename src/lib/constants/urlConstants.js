import Config from '../../config/Config';

const { baseUrl } = Config;

export const urlConstants = {
  BASEURL: `${baseUrl}/`,
  SIGNUP_URL: `${baseUrl}/api/v1/sub-admin/create`,
  SIGNIN_URL: `${baseUrl}/api/v1/auths/login`,
  GOOGLE_SIGNUP_URL: `${baseUrl}/api/v1/auths/login/google/initiate`,
  APPLE_SIGNUP_URL: `${baseUrl}/api/v1/auths/login/apple/initiate`,
  RESET_PASSWORD_URL: `${baseUrl}/api/v1/auths/reset/password`,
  FACEBOOK_SIGNUP_URL: `${baseUrl}/api/v1/auths/login/facebook/initiate`,
  UPDATE_PROFILE_URL: `${baseUrl}/api/v1/sub-admin/update/profile?subAdminId=`,
  EMPLOYEES_DATA: `${baseUrl}/api/v1/employee/fetch/employee?page=1&limit=20&createdBy=`,
  EMPLOYEE_DATA: `${baseUrl}/api/v1/employee/fetch?employeeId=`,
  PLANS_URL: `${baseUrl}/api/v1/sub-admin/update/plan?_id=`,
  PROMOTION_DATA: `${baseUrl}/api/v1/employee/promotion/management/fetch?promotionId=`,
  LEAVE_DATA_APPROVED: `${baseUrl}/api/v1/employee/history/management/fetch?type=LEAVE&permission=APPROVED&employeeId=`,
  LEAVE_DATA_REJECTED: `${baseUrl}/api/v1/employee/history/management/fetch?type=LEAVE&permission=REJECTED&employeeId=`,
  FETCH_CHARTS: `${baseUrl}/api​/v1​/accounting​/charts​/accounts​/fetch`,
};
