import { Paper, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    height: 'auto',
    justifyContent: 'center',
    // padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '.5rem',
    },
    margin: '0 3rem',
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  loader: {
    textAlign: 'center',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  tableContainer: {
    padding: '.5rem',
  },
}));

const columns = [
  { id: 'from', label: 'Payment Date' },
  { id: 'amount', label: 'Amount', align: 'right' },
];
const rows = {
  data: [
    {
      from: 'Febuary 12,2020',
      amount: '300,000',
    },
  ],
};

export default function CompensationDetails({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [salaryDetails, setSalaryDetails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(`/api/v1/employee/fetch?employeeId=${match?.params?.id}`)
      .then(({ data }) => (setEmployeeData(data?.data), setIsLoading(false)))
      .catch((e) => console.log(e));
  }, [match?.params?.id]);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/history/management/fetch?type=SALARY&employeeId=${match?.params?.id}`,
      )
      .then(({ data }) => console.log(data?.data))
      .catch((e) => console.log(e));
  });

  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <Paper elevation={0} className={classes.container}>
          <div
            style={{
              background: '#F5F9FE',
              margin: '3rem 0 1.5rem',
              border: '0.5px solid #DFDFDF',
              padding: '2rem 4rem',
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
              <TypographyBold>
                {`Annual Salary: NGN ${Number(
                  employeeData?.annualSalary?.replace(/,/g, ''),
                ).toLocaleString()}`}
                .00
              </TypographyBold>
              <PrimaryButton
                onClick={() =>
                  history.push({
                    pathname: `/dashboard/employees/edit/personal-information/${match?.params?.id}`,
                    state: { to: 'work_info' },
                  })
                }>
                Change
              </PrimaryButton>
            </div>
          </div>
          <div style={{ padding: matchesMd ? 0 : '0 3rem' }}>
            <TypographyBold style={{ padding: '.5rem 1rem', fontSize: 18 }}>
              Salary History
            </TypographyBold>
            {salaryDetails.length > 0 ? (
              <TableContainer className={classes.tableContainer}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            width: column.width,
                            fontFamily: 'Rubik',
                            fontWeight: 500,
                            fontSize: '16px',
                          }}
                          className={classes.cellWrapper}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salaryDetails &&
                      salaryDetails?.map((row, i) => (
                        <TableRow hover key={i} className={classes.tableRow}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  fontFamily: 'Rubik, sans-serif',
                                  backgroundColor: '#FCFFFF',
                                  fontSize: '16px',
                                  fontWeight: 400,
                                  cursor: 'pointer',
                                  color: '#232323',
                                }}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div style={{ padding: '1rem 0 3rem' }}>
                <TypographyBold
                  style={{
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  No salary details for this employee
                </TypographyBold>
              </div>
            )}
          </div>
        </Paper>
      )}
    </>
  );
}
