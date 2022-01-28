import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  payroll: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#fff',
    padding: '.6rem',
    borderRadius: '5px 5px 3px 3px',
    margin: '1rem 0',
    marginBottom: '2rem',
  },
  cellData: {
    fontFamily: 'Rubik, sans-serif',
    backgroundColor: '#FCFFFF',
    fontSize: '16px',
    // fontWeight: column.id == 'name' ? 500 : 400,
    color: '#232323',
    textTransform: 'capitalize',
    borderBottom: 0,
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
  responsiveContainer: {
    width: '100%',
    overflowX: 'auto',
  },
}));

export default function BoxComp({ data, boxData }) {
  const history = useHistory();

  const classes = useStyles();

  const { payrollData } = useSelector((state) => state?.payrollData);

  const [values, setValues] = useState({
    data: '',
    payPeriodStarts: '',
    payPeriodEnds: '',
    payDay: '',
  });

  useEffect(() => {
    const {
      employeesArray,
      payDay,
      payPeriodEnds,
      payPeriodStarts,
    } = payrollData;

    employeesArray?.some((item) =>
      item.firstName == data.firstName
        ? setValues({
            ...values,
            data: item,
            // image: item.meta.secure_url,
            payDay,
            payPeriodEnds,
            payPeriodStarts,
          })
        : null,
    );
  }, []);

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;

  return (
    <>
      <Box margin={1}>
        <div style={{ padding: '.5rem 0' }}>
          <section className={classes.payroll}>
            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography
                variant="h4"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 17,
                  flex: 1,
                }}>
                {`Payslip for the month of ${monthName(
                  new Date(payrollData.payDay || data.payDay),
                )}`}
              </Typography>
            </div>
            <div style={{ padding: '0 .8rem' }}>
              <Typography
                variant="h4"
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: 14,
                  textAlign: 'right',
                }}>
                Payslip #0001
              </Typography>
              {boxData?.meta && (
                <img
                  src={boxData?.meta && boxData.meta.secure_url}
                  style={{
                    borderRadius: '50%',
                    padding: '1rem',
                    width: '100px',
                    height: '100px',
                  }}
                />
              )}

              <div className={classes.responsiveContainer}>
                <div className={classes.spacing}>
                  <div style={{ width: '13npm rem' }}>
                    <Typography
                      variant="h6"
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: '16px',
                        fontWeight: 'normal',
                      }}>
                      {`${
                        boxData?.businessName
                          ? boxData.businessName
                          : values?.data?.businessName
                      }`}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: '16px',
                        fontWeight: 'normal',
                      }}>
                      {`${
                        boxData?.address
                          ? boxData.address
                          : values?.data?.address
                      }`}
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
                      <span style={{ fontWeight: 500 }}>Pay Period</span>
                      {`: ${new Date(
                        values?.payPeriodStarts || data?.payPeriodStarts,
                      ).toLocaleDateString('en-GB')} - ${new Date(
                        values?.payPeriodEnds || data.payPeriodEnds,
                      ).toLocaleDateString('en-GB')}`}
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
                      <span style={{ fontWeight: 500 }}>Date of Payment</span>
                      {`: ${new Date(
                        values?.payDay || data?.payDay,
                      ).toLocaleDateString('en-GB')}`}
                    </Typography>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '18rem',
                  padding: '1.3rem 0',
                }}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: 'Rubik',
                    fontSize: '16px',
                    fontWeight: 'normal',
                  }}>
                  {data?.firstName
                    ? `${data.firstName} ${data.lastName}
                 `
                    : data.employeeName}
                  <br />
                  {`${data.designation}`}
                  <br />
                  {`Employee ID: ${data.employeeID}`}
                </Typography>
              </div>
              <div
                style={{
                  borderBottom: '1px solid #C4C4C4',
                }}
              />
              <div style={{ padding: '1.3rem 0' }}>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: 16,
                  }}>
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
                      {`NGN ${Number(data.annualSalary).toLocaleString()}.00`}
                    </Typography>
                  </div>
                  {/* <div className={classes.spacing}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Rubik',
                      }}>
                      Bonuses
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Rubik',
                        color: '#27AE60',
                      }}>
                      NGN30,000.00
                    </Typography>
                  </div>
                  <div className={classes.spacing}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Rubik',
                      }}>
                      NHF
                    </Typography>
                    <Typography variant="h6" className={classes.deductions}>
                      NGN0.00
                    </Typography>
                  </div>
                  <div className={classes.spacing}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Rubik',
                      }}>
                      Pension
                    </Typography>
                    <Typography variant="h6" className={classes.deductions}>
                      NGN10,000.00
                    </Typography>
                  </div>
                  <div className={classes.spacing}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Rubik',
                      }}>
                      PAYE
                    </Typography>
                    <Typography variant="h6" className={classes.deductions}>
                      {/* -NGN30,000.00 */}
                  {/* </Typography> */}
                  {/* </div>  */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Box>
    </>
  );
}
