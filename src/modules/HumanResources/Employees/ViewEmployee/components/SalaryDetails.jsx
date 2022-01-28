import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Loader from 'react-loaders';
import TableRow from '@material-ui/core/TableRow';
import { authClient } from 'modules/authentication/requestClient';

const useStyles = makeStyles((theme) => ({
  salaryTitle: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  subHeading1: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#7B7B7B',
    padding: '.5rem 0',
  },
  salaryContent: {
    fontFamily: 'Rubik',
    fontSize: '18px',
    lineHeight: '21px',
    padding: '.5rem 0',
  },
  gridBox: {
    background: '#FCFFFF',
    border: '0.5px solid #DFDFDF',
  },
  loader: {
    textAlign: 'center',
  },
}));

export default function SalaryDetails({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    data: {},
  });
  const {
    monthlyTakeHome,
    grossIncome,
    payeMonthly,
    payeYearly,
  } = values?.data;

  const [rows, setRows] = useState({
    data: [
      {
        component: 'PAYE',
        monthlyAmount: '',
        annualAmount: '',
      },
      {
        component: 'Pension',
        monthlyAmount: 'NGN150,000',
        annualAmount: 'NGN1,800,000',
      },
      {
        component: 'NHF',
        monthlyAmount: 'NGN150,000',
        annualAmount: 'NGN1,800,000',
      },
      {
        component: 'Take Home',
        monthlyAmount: 'NGN150,000',
        annualAmount: 'NGN1,800,000',
      },
    ],
  });
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    {
      id: 'name',
      label: 'Deductions',
      minWidth: matchesXs ? 170 : 350,
    },
    {
      id: 'monthlyAmount',
      label: 'Amount monthly',
      minWidth: matchesXs ? 200 : 400,
    },
    {
      id: 'amount',
      label: 'Amount annually',
      minWidth: matchesXs ? 150 : 150,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(`/api/v1/employee/salary/details?employeeId=${match?.params?.id}`)
      .then(
        ({ data }) => (
          setIsLoading(false),
          setValues({
            ...values,
            data: { ...values.data, ...data?.data },
          }),
          setRows({
            ...rows,
            data: rows.data.map((el) =>
              el.component == 'PAYE'
                ? {
                    ...el,
                    annualAmount: `NGN ${Math.floor(
                      Number(data?.data?.payeYearly),
                    ).toLocaleString()}`,
                    monthlyAmount: `NGN ${Math.floor(
                      Number(data?.data?.payeMonthly),
                    ).toLocaleString()}`,
                  }
                : el.component == 'Pension'
                ? {
                    ...el,
                    annualAmount: `NGN ${Math.floor(
                      Number(data?.data?.pensionYearly),
                    ).toLocaleString()}`,
                    monthlyAmount: `NGN ${Math.floor(
                      Number(data?.data?.pensionMonthly),
                    ).toLocaleString()}`,
                  }
                : el.component == 'NHF'
                ? {
                    ...el,
                    annualAmount: `NGN ${Math.floor(
                      Number(data?.data?.NHFYearly),
                    ).toLocaleString()}`,
                    monthlyAmount: `NGN ${Math.floor(
                      Number(data?.data?.NHFMonthly),
                    ).toLocaleString()}`,
                  }
                : el.component == 'Take Home'
                ? {
                    ...el,
                    annualAmount: `NGN ${Math.floor(
                      Number(data?.data?.totalYearlyTakeHome),
                    ).toLocaleString()}`,
                    monthlyAmount: `NGN ${Math.floor(
                      Number(data?.data?.totalMonthlyTakeHome),
                    ).toLocaleString()}`,
                  }
                : el,
            ),
          })
        ),
      )
      .catch((e) => console.log(e));
  }, [match.params.id]);
  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <section>
          <Paper
            elevation={1}
            style={{ padding: '1rem' }}
            className={classes.gridBox}>
            <Typography variant="h3" className={classes.salaryTitle}>
              Salary Details
            </Typography>
            <div
              style={{
                padding: '1.4rem 0',
                display: ' flex',
                flexDirection: matchesXs ? 'column' : 'row',
              }}>
              <div>
                <Typography variant="h5" className={classes.subHeading1}>
                  Annual Income
                </Typography>
                <Typography variant="h5" className={classes.salaryContent}>
                  NGN {Number(grossIncome?.replace(/,/g, '')).toLocaleString()}
                  /year
                </Typography>
              </div>
              <div
                style={{
                  marginLeft: matchesXs ? 0 : '4rem',
                }}>
                <Typography variant="h5" className={classes.subHeading1}>
                  Monthly Income
                </Typography>
                <Typography variant="h5" className={classes.salaryContent}>
                  NGN{' '}
                  {Math.floor(
                    Number(monthlyTakeHome?.toString().replace(/,/g, '')),
                  ).toLocaleString()}
                </Typography>
              </div>
            </div>
            <div style={{ width: '100%', fontFamily: 'Rubik, sans-serif' }}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns?.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontFamily: 'Rubik, sans-serif',
                            color: '#AEAFAE',
                            backgroundColor: '#FCFFFF',
                            fontWeight: 500,
                            fontSize: matchesSm ? '0.875rem' : '19px',
                            color: '#474747',
                            borderBottom: '2px solid #C4C4C4',
                            // cursor: 'pointer',
                          }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.data?.deductions?.map((row, i) => (
                      <TableRow hover key={i}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontFamily: 'Rubik, sans-serif',
                                backgroundColor: '#FCFFFF',
                                fontWeight:
                                  row.component == 'Take Home' ? '500' : '400',
                                fontSize: matchesSm ? '0.875rem' : '18px',
                                padding: '10px',
                                borderBottom:
                                  row.component == 'Gratuity'
                                    ? '2px solid #C4C4C4'
                                    : 'none',
                              }}>
                              {column.id === 'amount' ||
                              column.id === 'monthlyAmount'
                                ? `NGN ${Number(value).toLocaleString()}`
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </section>
      )}
    </>
  );
}
