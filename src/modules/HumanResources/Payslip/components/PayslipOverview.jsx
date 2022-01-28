import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import Moment from 'react-moment';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import CompanyLogo from 'lib/assets/icons/fresible.svg';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authClient } from 'modules/authentication/requestClient';
import payslipActions from 'redux/actions/payslipActions';

const { fetchPayslipData } = payslipActions;
const useStyles = makeStyles((theme) => ({
  payslip: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px 5px 3px 3px',
    margin: '1rem 0',
    marginBottom: '2rem',
  },
  responsiveContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  spacing: {
    justifyContent: 'space-between',
    display: 'flex',
    minWidth: 450,
    padding: '.5rem 0',
  },
  deductions: {
    color: '#EB5757',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Rubik',
  },
}));

export default function PayslipOverview({ match }) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const { payrollData } = useSelector((state) => state?.payrollData);
  const { user } = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const { payslipData } = useSelector((state) => state?.payslipData);
  const [payslip, setpayslip] = useState([]);
  const [individualPayslip, setIndividualPayslip] = useState([]);
  const [err, setErr] = useState('');
  const [employeeData, setemployeeData] = useState({
    values: {
      employeeId: '',
      employeeName: '',
    },
  });
  const [values, setValues] = useState({
    employeeData: {
      employeeId: payslipData?.employeeId,
      employeeName: payslipData?.employeeName,
    },
    data: {
      payslipId: payslipData?.payslipId,
      payDay: payslipData?.payDay,
      salaryMonth: payslipData?.salaryMonth,
    },
  });

  // useEffect(() => {
  //   const {
  //     employeeName,
  //     employeeId,
  //     salaryMonth,
  //     datePaid,
  //     paymentType,
  //     salaryAmount
  //   } = payslipData
  //   console.log(payslipData)
  // }, [])
  // useEffect(() => {
  //   const {
  //     employeesArray,
  //     payDay,
  //     payPeriodEnds,
  //     payPeriodStarts,
  //   } = payrollData;

  //   // employeesArray?.some((item) =>
  //   //   item.firstName == data.firstName
  //   //     ? setValues({
  //   //         ...values,
  //   //         data: item,
  //   //         // image: item.meta.secure_url,
  //   //         payDay,
  //   //         payPeriodEnds,
  //   //         payPeriodStarts,
  //   //       })
  //   //     : null,
  //   // );
  // }, []);

  const userId = useSelector((state) => state?.loginStats?.user?.userId);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/payslip/management/fetch?payslipId=${match?.params?.id}`,
      )
      .then(({ data }) => {
        setpayslip(data?.data[0]);
      })
      .catch((e) => console.error(e));
  }, [match.params.id]);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/payslip/management/fetch?employeeId=${match?.params?.id}`,
      )
      .then(({ data }) => {
        setIndividualPayslip(data?.data);
      })
      .catch((e) => console.error(e));
  }, [match.params.id]);

  const [boxData, setBoxData] = useState({
    meta: '',
    address: '',
    businessName: '',
  });

  // console.log(individualPayslip);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/sub-admin/profile?subAdminId=${
          user?.subAdminId || googleUser?.userId || userId
        }`,
      )
      .then(({ data }) => {
        let { meta, address, businessName } = data?.data;
        setBoxData({ ...boxData, meta, address, businessName });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <HeaderComp url={'/dashboard/payslip'} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <ReturnBtn location={`/dashboard/payslip/view/${match?.params?.id}`} />
        <Typography
          variant="h5"
          style={{
            fontFamily: 'Rubik',
            fontSize: '20px',
            fontWeight: 500,
            flex: 1,
            marginLeft: '1rem',
          }}>
          Payslip {payslipData?.payslipNumber}
        </Typography>
        <Button
          variant="contained"
          disableElevation
          style={{
            borderRadius: '3px',
            border: '1px solid #00000033',
            backgroundColor: 'transparent',
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: 'Rubik',
            margin: '.5rem',
            width: matchesXs ? '100%' : '10rem',
            boxShadow: 'none',
          }}
          onClick={() => window.print()}>
          Print Payslip
        </Button>
        <Button
          disableElevation
          variant="contained"
          style={{
            borderRadius: '3px',
            backgroundColor: '#1F53D7',
            color: '#fff',
            textTransform: 'none',
            margin: '.5rem',
            width: matchesXs ? '100%' : '11rem',
            fontWeight: 500,
            fontFamily: 'Rubik',
          }}
          //   onClick={() => setSuccess(true)}
        >
          Download Payslip
        </Button>
      </div>

      <div style={{ padding: '.5rem 0' }}>
        <section className={classes.payslip}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Typography
              variant="h4"
              style={{ fontFamily: 'Rubik', fontWeight: 500, fontSize: 21 }}>
              Payslip for the month of{' '}
              {payslip?.salaryMonth || individualPayslip[0]?.salaryMonth}
            </Typography>
          </div>
          <div style={{ padding: '0 .8rem' }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: 'Rubik',
                fontWeight: 500,
                fontSize: 18,
                textAlign: 'right',
              }}>
              Payslip{' '}
              {payslip?.paySlipNumber || individualPayslip[0]?.paySlipNumber}
            </Typography>
            <img
              src={boxData?.meta?.secure_url}
              style={{
                borderRadius: '50%',
                width: 80,
                height: 80,
              }}
            />
            <div className={classes.responsiveContainer}>
              <div className={classes.spacing}>
                <div style={{ width: '10rem' }}>
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      fontWeight: 'normal',
                    }}>
                    {boxData?.businessName}
                    <br />
                    {boxData?.address}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      fontWeight: 'normal',
                    }}>
                    <span style={{ fontWeight: 500 }}>Pay Period </span>:
                    <Moment
                      format={'DD/MM/YYYY'}
                      date={
                        payslip?.payPeriodStarts ||
                        individualPayslip[0]?.payPeriodStarts
                      }
                    />{' '}
                    -{' '}
                    <Moment
                      format={'DD/MM/YYYY'}
                      date={
                        payslip?.payPeriodEnds ||
                        individualPayslip[0]?.payPeriodEnds
                      }
                    />
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      fontWeight: 'normal',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}>
                    <span style={{ fontWeight: 500 }}>Date of Payment </span>:
                    <Moment format={'DD/MM/YYYY'} date={payslip?.payDay} />
                  </Typography>
                </div>
              </div>
            </div>

            <div style={{ width: '10rem', padding: '1.3rem 0' }}>
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Rubik',
                  fontSize: '16px',
                  fontWeight: 'normal',
                }}>
                {payslip?.employeeName || individualPayslip[0]?.employeeName}
                <br />
                {payslip?.designation || individualPayslip[0]?.designation}
                <br />
                Employee ID:
                {payslip?.employeeID || individualPayslip[0]?.employeeID}
                <br />
                Joining Date:1 Jan 2013
              </Typography>
            </div>
            <div style={{ borderBottom: '1px solid #C4C4C4' }} />
            <div style={{ padding: '1.3rem 0' }}>
              <Typography
                variant="h4"
                style={{ fontFamily: 'Rubik', fontWeight: 500, fontSize: 16 }}>
                Breakdown
              </Typography>
              <div className={classes.responsiveContainer}>
                <div className={classes.spacing}>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'normal',
                      fontFamily: 'Rubik',
                    }}>
                    Base Salary
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'normal',
                      fontFamily: 'Rubik',
                    }}>
                    NGN
                    {payslip?.monthlySalary ||
                      Number(
                        individualPayslip[0]?.monthlySalary,
                      ).toLocaleString()}
                  </Typography>
                </div>
                {individualPayslip?.map((item) =>
                  item?.salaryDetails.deductions.map((content, idx) => (
                    <div className={classes.spacing} key={idx}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        {content.name}
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        {`NGN ${
                          payslip?.monthlySalary ||
                          Number(content.monthlyAmount).toLocaleString()
                        }.00`}
                      </Typography>
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
