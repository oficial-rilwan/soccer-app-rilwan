import Header from '../../SiteLayout/Header/Header';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
  InputAdornment,
  Select,
  MenuItem,
  Icon,
  useMediaQuery,
  Typography,
  Menu,
  Avatar,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SearchOutlined } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import employeeActions from '../../../redux/actions/employeesActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Loader from 'react-loaders';
import InputBase from '@material-ui/core/InputBase';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { authClient } from 'modules/authentication/requestClient';
import { urlConstants } from 'lib/constants';
import LazyLoad from 'react-lazyload';

const { fetchEmployeeData } = employeeActions;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#FCFFFF',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
  },
  businessNotched: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#F5F9F7',

    border: '1px solid red',
    borderRadius: '5px',
  },
  adornment: {
    color: '#DEE1E0',
  },
  selectInput: {
    '& :focus': {
      backgroundColor: 'transparent',
    },
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    backgroundColor: '#F5F9F7',
    color: '#C3C5C4',
  },
  addEmployeeBtn: {
    [theme.breakpoints.down('xs')]: {
      // height: '2.4rem',
    },
    // height: '100%',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    padding: 0,
    textTransform: 'none',
    borderRadius: '5px',
    // width: '11rem',
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
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10rem',
  },
  menuItem: {
    padding: '.5rem',
    textTransform: 'capitalize',
  },
  cellWrapper: {
    backgroundColor: '#F6F9F7',
    fontFamily: 'Rubik, sans-serif',
    color: '#AEAFAE',
  },
  tableWrapper: {
    width: '100%',
    fontFamily: 'Rubik, sans-serif',
    marginTop: '2rem',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
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
  listStyles: {
    paddingBottom: '0px',
    height: '4.75rem',
    overflowY: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: '6.5rem',
    },
  },
  menuStyles: {
    boxShadow:
      '6.96262px 16.5362px 18.2769px 0.870327px rgba(44, 43, 74, 0.29)',
  },
  popOverPaper: {
    width: '9.8rem',
    [theme.breakpoints.down('xs')]: {
      width: '86%',
    },
  },
  retirement: {
    fontFamily: 'Rubik',
    fontSize: 15,
    borderRadius: '7px 7px 0 0',
  },
  avatar: {
    width: 50,
    height: 50,
  },
}));

const SelectInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    height: '3.4rem',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    backgroundColor: '#F5F9F7',
    color: '#C3C5C4',
    borderColor: '#E7E8E8',
    fontSize: 16,
    padding: '13px 26px 10px 12px',
    display: 'flex',
    alignItems: 'center',
    height: '1.8rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:fos': {
      borderRadius: 4,
    },
  },
}))(InputBase);

const CssTextField = withStyles((theme) => ({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#F5F9F7',
    width: '32rem',
    [theme.breakpoints.down('lg')]: {
      width: '25rem',
    },
    [theme.breakpoints.up('sm')]: {
      width: '32rem',
    },
    margin: '0 1.5rem 0.5rem 0',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0,
    },
  },
}))(TextField);

const columns = [
  { id: 'name', label: 'Employee Name', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 120 },
  { id: 'department', label: 'Department', minWidth: 120 },
  { id: 'dateOfHire', label: 'Join Date', minWidth: 120 },
  { id: 'designation', label: 'Role', minWidth: 10 },
  { id: 'employmentStatus', label: 'Status', minWidth: 120 },
];

export default function HumanResources() {
  const theme = useTheme();
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const matchesSm = useMediaQuery(theme.breakpoints.down('1300'));
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const [employeesContent, setEmployeesContent] = useState({
    data: [],
  });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    data: {
      department: '',
      position: '',
    },
    error: '',
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const { user } = useSelector((state) => state?.auth);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `${urlConstants.EMPLOYEES_DATA}${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(
        ({ data }) => (
          setIsLoading(false),
          setEmployeesContent({ ...employeesContent, data: data?.data })
        ),
      )
      .catch(() => setIsLoading(false));
  }, []);

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  const searchedItems = employeesContent?.data.filter((item) => {
    let name = `${item.firstName} ${item.lastName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
    switch (name) {
      case 'department':
        const filteredItem = searchedItems?.filter((item) => {
          let data = `${item.department}`;
          return data.toLowerCase().includes(value.toLowerCase());
        });
        setEmployeesContent({ ...employeesContent, data: filteredItem });
        break;
      case 'position':
        const filteredPosition = searchedItems?.filter((item) => {
          let data = `${item.designation}`;
          return data.toLowerCase().includes(value.toLowerCase());
        });
        setEmployeesContent({ ...employeesContent, data: filteredPosition });
        break;
    }
  };

  const [dept, setDept] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    authClient
      .get(`/api/v1/employee/department/management/fetch`)
      .then(({ data }) => {
        setDept(data?.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    authClient
      .get(`/api/v1/employee/role/management/fetch`)
      .then(({ data }) => {
        setRole(data?.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header path={path} url={url} pathname={pathname} />
      <section className={classes.root}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <CssTextField
            placeholder="Search Employee"
            variant="outlined"
            onChange={handleSearch}
            classes={{
              inputAdornedStart: classes.adornStart,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  classes={{ root: classes.adornment }}>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Select
            labelId="country-label"
            variant="outlined"
            fullWidth={matchesXs ? true : false}
            style={{
              marginRight: matchesXs ? 0 : '1.5rem',
              marginTop: tabUp ? 0 : '.5rem',
              textTransform: 'capitalize',
            }}
            onChange={handleSelectChange('department')}
            value={values?.data?.department}
            input={<SelectInput />}
            displayEmpty>
            <MenuItem disabled value="" className={classes.menuItem}>
              <em>Department</em>
            </MenuItem>
            {dept &&
              dept?.map((item, i) => (
                <MenuItem
                  value={item.deptName}
                  key={i}
                  className={classes.menuItem}>
                  {item.deptName}
                </MenuItem>
              ))}
          </Select>
          <div
            style={
              matchesXs ? { width: '100%' } : matchesSm ? {} : { flex: 1 }
            }>
            <Select
              variant="outlined"
              onChange={handleSelectChange('position')}
              value={values?.data?.position}
              fullWidth={matchesXs ? true : false}
              style={{
                marginRight: matchesXs ? 0 : '1.5rem',
                marginTop: tabUp ? 0 : '.5rem',
                textTransform: 'capitalize',
              }}
              input={<SelectInput />}
              displayEmpty>
              <MenuItem disabled value="" className={classes.menuItem}>
                <em>Role/Position</em>
              </MenuItem>
              {role &&
                role?.map((item, i) => (
                  <MenuItem
                    value={item.roleName}
                    key={i}
                    className={classes.menuItem}>
                    {item.roleName}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <PrimaryButton
            color="primary"
            variant="contained"
            disableElevation
            fullWidth={matchesXs ? true : false}
            onClick={handleClick}
            style={{
              marginRight: matchesXs ? 0 : '1.5rem',
              marginTop: tabUp ? 0 : '.5rem',
              height: 54,
            }}
            endIcon={<Icon>keyboard_arrow_down</Icon>}>
            Add Employee
          </PrimaryButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            style={{ marginTop: '2.8rem' }}
            className={classes.menuStyles}
            classes={{
              list: classes.listStyles,
            }}
            PopoverClasses={{
              paper: classes.popOverPaper,
            }}
            open={Boolean(anchorEl)}
            onClose={handleAnchorClose}>
            <MenuItem
              style={{ fontFamily: 'Rubik', fontSize: 15 }}
              onClick={() => history.push(`${url}/add`)}>
              Add Manually
            </MenuItem>
            <MenuItem
              onClick={() => history.push(`${url}/import`)}
              classes={{
                root: classes.retirement,
              }}>
              Import
            </MenuItem>
          </Menu>
        </div>

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
                <TableBody style={isLoading ? { display: 'none' } : {}}>
                  {employeesContent &&
                    searchedItems?.map((row, i) => (
                      <TableRow hover key={i} className={classes.tableRow}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => (
                                dispatch(
                                  fetchEmployeeData(row?.employeeId, setError),
                                ),
                                history.push(
                                  `${url}/view/overview/${row?.employeeId}`,
                                )
                              )}
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
                                cursor: 'pointer',
                                textTransform:
                                  column.id == 'name' ? 'capitalize' : 'none',
                                color:
                                  column.id == 'name'
                                    ? '#1F53D7'
                                    : column.id == 'employmentStatus' &&
                                      row?.employmentStatus == 'ACTIVE'
                                    ? '#00DC7D'
                                    : column.id == 'employmentStatus' &&
                                      row?.employmentStatus == 'ON-LEAVE'
                                    ? '#F2994A'
                                    : column.id == 'employmentStatus' &&
                                      row?.employmentStatus == 'SUSPENDED'
                                    ? '#EB5757'
                                    : column.id == 'employmentStatus'
                                    ? '#EB5757'
                                    : '#000',
                              }}>
                              {column.id == 'name' ? (
                                <div className={classes.nameWrapper}>
                                  {row?.meta?.url ? (
                                    <LazyLoad style={{ marginRight: '.7rem' }}>
                                      <Avatar
                                        src={row?.meta?.url}
                                        alt={row?.firstName}
                                        className={classes.avatar}
                                      />
                                    </LazyLoad>
                                  ) : (
                                    <div className={classes.nameCard}>
                                      <Typography
                                        variant="h4"
                                        className={classes.name}>
                                        {row?.firstName
                                          ?.substring(0, 1)
                                          .toUpperCase()}
                                      </Typography>
                                    </div>
                                  )}
                                  {`${row.firstName} ${row.lastName}`}
                                </div>
                              ) : column.id == 'dateOfHire' ? (
                                new Date(value).toLocaleDateString('en-GB')
                              ) : column.id === 'employmentStatus' ? (
                                value.substring(0, 1) +
                                value.substr(1).toLowerCase()
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
          {isLoading ? (
            <div className={classes.loader}>
              <Loader type="line-scale" color="#2F49D0" />
            </div>
          ) : (
            searchedItems?.length == 0 && (
              <div className={classes.recordWrapper}>
                <Typography variant="h6" className={classes.noRecord}>
                  Employee record not found
                </Typography>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
