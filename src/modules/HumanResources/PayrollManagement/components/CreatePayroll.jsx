import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import HorizontalLabelPositionBelowStepper from './Steppers';

import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useDispatch, useSelector } from 'react-redux';

import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router';
import EnterPayroll from './EnterPayroll';
import RunPayroll from './RunPayroll';
import { useMediaQuery } from '@material-ui/core';
import BonusesDialog from './BonusesDialog';
import { useState, useEffect } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { urlConstants } from 'lib/constants';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { Delete } from '@material-ui/icons';
import SendPayslips from './SendPayslips';
import payrollActions from 'redux/actions/payrollManagement';

const { storePayrollData } = payrollActions;

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    margin: '.5rem 0',
  },
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  halfGrid: {
    gridColumn: '2/10',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  dialogPaper: {
    width: '33rem',
    height: '33rem',
    maxWidth: 'inherit',
    borderRadius: 8,
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  dialogSuccess: {
    margin: '5rem 0 0',
  },
  default: {
    border: 0,
    fontWeight: 400,
    color: '#FF0303',
    margin: '0 20px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      margin: 0,
    },
  },
}));

export default function CreatePayroll() {
  const classes = useStyles();
  const theme = useTheme();
  const { url } = useRouteMatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const responsive = useMediaQuery(theme.breakpoints.down(450));

  const longText = `Enter Date in which you want your pay period to
    start and end, as well as the day you want your 
    employees to be paid.
    Note: always give a 5 day space between pay period
    and pay date.`;

  const routes = [
    {
      title: 'Enter Payroll',
      path: `${url}/enter`,
      component: EnterPayroll,
    },
    {
      title: 'Run Payroll',
      path: `${url}/run`,
      component: RunPayroll,
    },
    {
      title: 'Send Payslips',
      path: `${url}/send`,
      component: SendPayslips,
    },
  ];

  const [reload, handleReload] = useState(false);
  const [openBonuses, setOpenBonuses] = useState(false);
  const [success, setSuccess] = useState(null);
  const [dialogData, setDialogData] = useState({
    data: {},
    firstName: '',
    lastName: '',
  });

  const handleClick = (row, firstName, lastName) => {
    setDialogData({ ...dialogData, data: row, firstName, lastName });
    setSuccess(false);
    setOpenBonuses(true);
  };

  const [progress, setProgress] = useState({});

  const [values, setValues] = useState({
    employeeRecord: [],
  });

  const [employeesRecord, setEmployeesRecord] = useState({
    data: {},
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const adminUser = useSelector((state) => state?.loginStats?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/fetch?page=1&limit=20&createdBy=${
          user?.subAdminId || googleUser?.userId || adminUser?.userId
        }`,
      )
      .then(({ data }) => {
        let content = data?.data;
        setValues({ ...values, employeeRecord: content });
      })
      .catch((e) => console.log(e));
  }, [reload]);

  return (
    <>
      <HeaderComp url="/dashboard/payroll" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ReturnBtn />
        {pathname.substring(26) == 'run' ? (
          <div
            style={
              matchesXs
                ? {
                    display: 'flex',
                    justifyContent: responsive ? 'space-between' : 'normal',
                    width: '100%',
                    margin: '11px 0',
                    flexWrap: 'wrap',
                  }
                : {
                    display: 'flex',
                    width: '25rem',
                    justifyContent: 'space-around',
                  }
            }>
            <DefaultButton
              startIcon={<Delete />}
              onClick={() => history.goBack()}
              classes={{ root: classes.default }}>
              Cancel Payroll
            </DefaultButton>
            <PrimaryButton
              onClick={() => history.push(`${url}/send`)}
              style={{
                width: matchesMd ? 'auto' : '100%',
                margin: responsive ? 0 : '0 14px',
              }}>
              Approve Payroll
            </PrimaryButton>
          </div>
        ) : pathname.substring(26) == 'enter' ? (
          <PrimaryButton
            style={{ width: matchesXs && 'auto' }}
            onClick={() =>
              employeesRecord?.data?.employeesArray &&
              employeesRecord?.data?.payDay &&
              employeesRecord?.data?.payPeriodStarts &&
              employeesRecord?.data?.payPeriodEnds &&
              (dispatch(storePayrollData(employeesRecord?.data)),
              history.push(`${url}/run`))
            }>
            Continue
          </PrimaryButton>
        ) : (
          ''
        )}
      </div>
      <TypographyBold variant="h5" style={{ fontSize: 17, margin: '10px 0' }}>
        Payroll Management
      </TypographyBold>
      <div className={classes.tableWrapper}>
        <HorizontalLabelPositionBelowStepper
          style={{ backgroundColor: '#fcffff' }}
        />
        <Switch>
          {routes.map(({ component: Component, ...route }, i) => (
            <Route
              key={i}
              {...route}
              render={(props) => (
                <Component
                  rows={values?.employeeRecord}
                  handleClick={handleClick}
                  values={values}
                  setValues={setValues}
                  setProgress={setProgress}
                  progress={progress}
                  employeesRecord={employeesRecord}
                  setEmployeesRecord={setEmployeesRecord}
                  {...props}
                />
              )}
            />
          ))}
          <Redirect
            from="/dashboard/payroll/create"
            to="/dashboard/payroll/create/enter"
          />
        </Switch>
      </div>
      {pathname.substring(26) == 'enter' && (
        <div>
          <TypographyH5
            style={{ color: '#878181', fontStyle: 'italic', fontSize: 15 }}>
            Paying {employeesRecord.data.employeesArray?.length} out of{' '}
            {values?.employeeRecord?.length} employees
          </TypographyH5>
        </div>
      )}
      <BonusesDialog
        setDialogOpen={setOpenBonuses}
        dialogOpen={openBonuses}
        classes={classes}
        setSuccess={setSuccess}
        success={success}
        dialogData={dialogData}
        handleReload={handleReload}
        reload={reload}
      />
    </>
  );
}
