import { lazy } from 'react';

const Home = lazy(() => import('modules/Home/index'));
const Signup = lazy(() => import('modules/authentication/Signup/SignUp'));
const SignIn = lazy(() => import('modules/authentication/SignIn/SignIn'));
const ForgotPassword = lazy(() =>
  import('modules/authentication/forgotPassword/forgotPassword'),
);
const EmailSent = lazy(() =>
  import('modules/authentication/forgotPassword/emailSent'),
);
const ResetPassword = lazy(() =>
  import('modules/authentication/forgotPassword/changePassword'),
);
const Plans = lazy(() => import('modules/Plans/Plans'));
const Payments = lazy(() => import('modules/Payments'));
const Invites = lazy(() => import('modules/Invites'));
const SubAdminInvites = lazy(() => import('modules/Invites/SubAdmin/index'));
const HRAdmin = lazy(() => import('modules/Invites/HRAdmin/index'));
const Staff = lazy(() => import('modules/Invites/Staff/index'));
const SiteLayout = lazy(() => import('modules/SiteLayout/SiteLayout'));

const routes = [
  {
    title: 'Home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    title: 'Sign Up',
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    title: 'Sign In',
    path: '/signin',
    component: SignIn,
    exact: true,
  },
  {
    title: 'Forgot Password',
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    title: 'Forgot Password',
    path: '/email-sent',
    component: EmailSent,
    exact: true,
  },
  {
    title: 'Reset Password',
    path: '/reset-password',
    component: ResetPassword,
    exact: true,
  },
  {
    title: 'Plans',
    path: '/plans',
    component: Plans,
    exact: true,
  },
  {
    title: 'Payments',
    path: '/payments',
    component: Payments,
    exact: true,
  },
  {
    title: 'Invites',
    path: '/invites',
    component: Invites,
    exact: true,
    private: true,
  },
  {
    title: 'Sub-Admin Invites',
    path: '/invites/subadmin',
    component: SubAdminInvites,
    exact: true,
    private: true,
  },
  {
    title: 'HR-Admin Invites',
    path: '/invites/hradmin',
    component: HRAdmin,
    exact: true,
    private: true,
  },
  {
    title: 'Staff Invites',
    path: '/invites/staff',
    exact: true,
    component: Staff,
    private: true,
  },
  {
    title: 'DashBoard',
    path: '/dashboard',
    component: SiteLayout,
    private: true,
  },
];

export default routes;
