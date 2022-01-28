import {
  InputAdornment,
  MenuItem,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import ReturnBtn from '../Employees/AddEmployees/components/ReturnBtn';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    backgroundColor: '#EEF5FC',
    padding: '2.5rem 1.5rem',
    margin: '1rem 0',
    borderRadius: 4,
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid #DFDFDF',
    [theme.breakpoints.down('xs')]: {
      padding: '3.5rem 1rem',
    },
  },
  selectInpt: {
    height: 41,
    backgroundColor: '#fff',
    color: '#828282',
    marginRight: 20,
  },
  heading: {
    fontSize: 14,
  },
  root: {
    borderRadius: '5px',
    backgroundColor: '#FCFFFF',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
  },
  container: { marginBottom: '17px !important' },
  recordWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontStyle: 'italic',
    margin: '1rem 0',
  },
  badge: {
    backgroundColor: '#EEF5FC',
    color: '#000',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  nameWrapper: {
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
  },
  nameCard: {
    height: '43px',
    width: '43px',
    background: '#251F47',
    borderRadius: '50%',
    marginRight: '.7rem',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  name: {
    margin: 0,
    textAlign: 'center',
    color: '#00DC7D',
    fontSize: '1.2rem',
    marginTop: '0.55rem',
  },
}));

const SelectItem = withStyles((theme) => ({
  root: {
    fontFamily: 'Rubik',
    fontSize: 15,
    padding: '.7rem',
  },
}))(MenuItem);

const columns = [
  { id: 'employeeName', label: 'Employee Name', minWidth: 120 },
  { id: 'employeeDept', label: 'Department', minWidth: 100 },
  { id: 'employeeSurveyMonth', label: 'Month', minWidth: 120 },
  { id: 'employeeSurveyYear', label: 'Year', minWidth: 120 },
];

export default function ViewPerformance({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [employeesContent, setEmployeesContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchedItems = employeesContent.data?.filter((item) => {
    let name = `${item.employeeName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/performance/management/fetch?surveyId=${match.params.id}`,
      )
      .then(({ data }) => setEmployeesContent(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <HeaderComp url="/dashboard/performance" />
      <ReturnBtn location="/dashboard/performance-evaluation" />
      <section>
        <div className={classes.formWrapper}>
          <InputForEmployeePage
            placeholder="Search Employee"
            size="small"
            style={{
              fontStyle: 'italic',
              marginRight: 20,
              width: matchesXs ? '100%' : 'auto',
            }}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ color: '#828282' }} />
                </InputAdornment>
              ),
            }}
          />
          {/* <Select
            value=""
            variant="outlined"
            displayEmpty
            className={classes.selectInpt}>
            <SelectItem value="" disabled>
              <em>Status</em>
            </SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="ON-LEAVE">On Leave</SelectItem>
          </Select>
          <Select
            value=""
            variant="outlined"
            displayEmpty
            style={{
              margin: 0,
            }}
            className={classes.selectInpt}>
            <SelectItem value="" disabled>
              <em>Department</em>
            </SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Accounting">Accounting</SelectItem>
          </Select> */}
        </div>
        <section className={classes.root}>
          <div className={classes.tableWrapper}>
            {
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
                            minWidth: column.minWidth,
                            fontSize: '15px',
                            fontWeight: 400,
                          }}
                          className={classes.cellWrapper}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody
                  //   style={isLoading ? { display: 'none' } : {}}
                  >
                    {employeesContent.data &&
                      searchedItems?.map((row, i) => (
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
                                  fontWeight:
                                    column.id == 'name'
                                      ? '500'
                                      : column.id == 'status'
                                      ? 500
                                      : 400,
                                  fontSize: '15px',
                                  textTransform:
                                    column.id == 'name' ? 'capitalize' : 'none',
                                  color:
                                    column.id == 'name'
                                      ? '#1F53D7'
                                      : column.id == 'status'
                                      ? '#000'
                                      : '#000',
                                }}>
                                {column.id == 'employeeName' ? (
                                  <div className={classes.nameWrapper}>
                                    {row?.employeeDetails?.meta.url ? (
                                      <LazyLoad
                                        style={{ marginRight: '.7rem' }}>
                                        <Avatar
                                          src={row?.employeeDetails.meta?.url}
                                          alt={row?.firstName}
                                          className={classes.avatar}
                                        />
                                      </LazyLoad>
                                    ) : (
                                      <div className={classes.nameCard}>
                                        <Typography
                                          variant="h4"
                                          className={classes.name}>
                                          {row?.employeeName
                                            ?.substring(0, 1)
                                            .toUpperCase()}
                                        </Typography>
                                      </div>
                                    )}
                                    {`${row.employeeName}`}
                                  </div>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            {/* {isLoading ? (
              <div className={classes.loader}>
                <Loader type="line-scale" color="#2F49D0" />
              </div>
            ) : (
              employeesContent?.data?.length == 0 && (
                <div className={classes.recordWrapper}>
                  <TypographyH5 variant="h6" className={classes.noRecord}>
                    Customer record not found
                  </TypographyH5>
                </div>
              )
            )} */}
          </div>
        </section>
      </section>
    </>
  );
}
