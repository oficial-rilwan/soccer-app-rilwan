import {
  InputAdornment,
  useMediaQuery,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import { Search } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  MaterialDatePicker,
  MonthPicker,
} from 'modules/components/DatePickers/Date';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '2.5rem',
    marginBottom: '2rem',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  table: {
    minWidth: 650,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
}));

export default function Payslip() {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const theme = useTheme();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down(436));
  const history = useHistory();
  const [values, setValues] = useState({
    month: '',
    year: '',
    name: '',
  });

  const [paySlipData, setPaySlipData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = (value) => {
    setValues({ ...values, month: new Date(value) });
  };

  const handleYearChange = (value) => {
    setValues({ ...values, year: new Date(value) });
  };

  const columns = [
    { id: 'employeeName', label: 'Employee Name', width: 250 },
    { id: 'salaryMonth', label: 'Salary Month', width: 250 },
    { id: 'payDay', label: 'Paid Date', width: 190 },
    { id: 'paymentType', label: 'Payment Type', width: 220 },
    { id: 'monthlySalary', label: 'Paid Amount', width: 140 },
  ];

  const [monthlyCount, setMonthlyCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const searchedItems = paySlipData?.filter((item) => {
    let name = `${item.employeeName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  const { user } = useSelector((state) => state?.auth);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/payslip/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        setIsLoading(false);
        setPaySlipData(data?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let counter = 0;
    searchedItems?.forEach((item) =>
      setMonthlyCount((counter += Number(item?.monthlySalary))),
    );
  }, [searchedItems]);

  return (
    <>
      <HeaderComp url={'/dashboard/payslip'} path={path} pathname={pathname} />
      <div
        style={{
          paddingTop: '1rem',
          display: 'flex',
          flexWrap: matchesSm ? 'wrap' : 'nowrap',
        }}>
        <InputForEmployeePage
          onChange={handleSearch}
          style={{
            fontStyle: 'italic',
            padding: 0,
            width: matchesSm ? '100%' : '35%',
            background: '#EEF5FC',
          }}
          placeholder="Search Employees"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#828282' }} />
              </InputAdornment>
            ),
          }}
        />
        {/* <div
          style={{
            display: 'flex',
            flexWrap: matchesXs ? 'wrap' : 'nowrap',
          }}>
          <MonthPicker
            size="medium"
            views={['month']}
            placeholder="Select Month"
            handleDateChange={handleMonthChange}
            value={values.month}
            notched
            fontItalic
            style={{
              margin: matchesSm ? '.7rem 0' : '0 .8rem',
              width: responsive ? '100%' : '12rem',
            }}
          />
          <MaterialDatePicker
            size="medium"
            views={['year']}
            handleDateChange={handleYearChange}
            placeholder="Select Year"
            value={values.year}
            format="yyyy"
            fontItalic
            notched
            style={{
              margin: matchesSm ? '.7rem 0 0' : '0 .5rem',
              width: responsive ? '100%' : '12rem',
              marginLeft: responsive ? 0 : '20px',
            }}
          />
        </div> */}
      </div>
      <section className={classes.tableWrapper}>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader type="line-scale" color="#2F49D0" />
          </div>
        ) : paySlipData.length <= 0 ? (
          <div className={classes.recordWrapper}>
            <TypographyBold variant="h6" className={classes.noRecord}>
              No Payslip record at the moment
            </TypographyBold>
          </div>
        ) : searchedItems.length === 0 ? (
          <div className={classes.recordWrapper}>
            <TypographyBold variant="h6" className={classes.noRecord}>
              Sorry, could not find employee
            </TypographyBold>
          </div>
        ) : (
          <TableContainer className={classes.container}>
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
                {paySlipData &&
                  searchedItems?.map((row, i) => (
                    <TableRow hover key={i} className={classes.tableRow}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() =>
                              history.push(
                                `/dashboard/payslip/view/${row.employeeId}`,
                              )
                            }
                            style={{
                              fontFamily: 'Rubik, sans-serif',
                              backgroundColor: '#FCFFFF',
                              fontSize: '16px',
                              fontWeight:
                                column.id == 'employeeName'
                                  ? 500
                                  : column.id == 'paymentType' &&
                                    row.paymentType == 'Total:'
                                  ? 500
                                  : 400,
                              cursor: 'pointer',
                              color:
                                column.id == 'status' &&
                                row.status == 'Approved'
                                  ? '#27AE60'
                                  : column.id == 'employeeName'
                                  ? '#1F53D7'
                                  : '#232323',
                            }}>
                            {column.id == 'payDay'
                              ? new Date(value).toLocaleDateString('en-GB')
                              : column.id === 'monthlySalary'
                              ? `NGN ${Number(value).toLocaleString()}`
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell
                    style={{
                      borderBottom: 0,
                    }}
                    rowSpan={0}
                  />
                  <TableCell
                    style={{
                      borderBottom: 0,
                    }}
                    rowSpan={0}
                  />
                  <TableCell
                    style={{
                      borderBottom: 0,
                    }}
                    rowSpan={0}
                  />
                  <TableCell
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      borderBottom: 0,
                      paddingLeft: '5rem',
                    }}>
                    Total:
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      borderBottom: 0,
                    }}>
                    {`NGN ${
                      searchedItems.length == 0
                        ? 0
                        : Number(monthlyCount).toLocaleString()
                    }`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </>
  );
}
