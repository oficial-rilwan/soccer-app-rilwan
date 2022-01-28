import {
  InputAdornment,
  useMediaQuery,
  Select,
  MenuItem,
  Menu,
  Dialog,
  Icon,
  Typography,
  useTheme,
  makeStyles,
  Button,
  IconButton,
} from '@material-ui/core';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import { SuspendButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { CancelButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { Search, Add, ImportExport } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  MaterialDatePicker,
  MonthPicker,
} from 'modules/components/DatePickers/Date';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { GetAppOutlined } from '@material-ui/icons';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { ReactComponent as Download } from '../../../lib/assets/icons/downloadIcon.svg';
import memoActions from 'redux/actions/memoActions';

const { fetchMemoData } = memoActions;

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '2.5rem',
    marginBottom: '2rem',
  },
  titleWrapper: {
    width: '7rem',
    overflow: 'elipses',
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
  table: {
    minWidth: 650,
  },
  dialogPaper: {
    width: '39rem',
    height: '40rem',
    maxWidth: 'inherit',
  },
  dialogSuccess: {
    margin: '5rem 0 0',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  filter: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '5rem',
    cursor: 'select',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  menuItem: {
    padding: '.5rem',
    textTransform: 'capitalize',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  actionBtn: {
    textTransform: 'none',
    color: '#1F53D7',
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    color: theme.palette.grey[500],
  },
});

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

export default function Memo({ match }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down(436));
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const { issuerId } = useSelector((state) => state?.memoData?.memoData);

  const [values, setValues] = useState({
    memoData: {
      memoId: '',
      title: '',
      date: '',
      issuerName: '',
      recipients: {
        department: '',
        departmentId: '',
      },
      body: '',
    },
  });
  const [memoData, setMemoData] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [department, setDepartment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    let { value } = e.target;
    setRecipients(value);
  };
  // const handleSelectChange = (name`) => (e) => {
  //   let { value } = e.target;
  //   setValues({ ...values, data: { ...values.data, [name]: value } });

  //       const filteredItem = searchedItems?.filter((item) => {
  //         let data = `${item.department}`;
  //         return data.toLowerCase().includes(value.toLowerCase());
  //       });
  //       setEmployeesContent({ ...employeesContent, data: filteredItem });
  // };
  const columns = [
    { id: 'title', label: 'Memo Title', width: 350, align: 'flex-start' },
    { id: 'date', label: 'Date', width: 250, align: 'flex-start', icon: <ImportExport /> },
    { id: 'recipients', label: 'Recipients', width: 200, align: 'flex-start' },
    { id: 'issuerName', label: 'Issuer', width: 300, align: 'flex-start' },
    { id: 'action', label: '', width: 250, align: 'center' },
  ];

  const [monthlyCount, setMonthlyCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerm, setfilteredTerm] = useState('')
  const [err, setErr] = useState('');

  const searchedItems = memoData?.filter((item) => {
    let name = `${item.title}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });
  const handleMemoDate = (value) => {
    setValues({ ...values, data: { ...values.data, memoDate: value } });
  };
  // const handleSelectChange = (e) => {
  //   let { value } = e.target;
  //   let { name } = e.target;
  //   setfilteredTerm(value);
  // };

  const userRecord = useSelector((state) => state?.loginStats?.user);

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  const filteredItem = memoData?.filter((item) => {
    let dept = `${item.recipients.department}`;
    return dept.toLowerCase().includes(filteredTerm.toLowerCase());
  });
  const handleFilter = (name) => (e) => {
    let { value } = e.target;
    setfilteredTerm(value);
  };
  const handleFilterChange = (name) => (e) => {
    let { value } = e.target;
    setfilteredTerm(value);
    setMemoData({ ...memoData, data: filteredItem });
  };

  useEffect(() => {
    authClient
      .get('/api/v1/employee/department/management/fetch')
      .then((data) => {
        let recipients = data?.data?.data;
        setRecipients(recipients);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/memo/fetch?createdBy=${user?.subAdminId || userRecord?.userId || googleUser?.userId
        }`,
      )
      .then((res) => {
        setIsLoading(false);
        setMemoData(res?.data?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      <HeaderComp url={url} path={path} pathname={pathname} />
      <div
        style={{
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: matchesSm ? 'wrap' : 'nowrap',
        }}>
        <div className={classes.filters}>
          <InputForEmployeePage
            onChange={handleSearch}
            style={{
              fontStyle: 'italic',
              padding: 0,
            }}
            placeholder="Search Memo"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ color: '#828282' }} />
                </InputAdornment>
              ),
            }}
          />
          <Select
            labelId="departments-label"
            variant="outlined"
            fullWidth={matchesXs ? true : false}
            style={{
              marginRight: '1.5rem',
              marginLeft: '1.5rem',
              marginTop: 0,
              textTransform: 'capitalize',
            }}
            onChange={handleFilterChange}
            value={department}
            input={<SelectInput />}
            displayEmpty>
            <MenuItem disabled value="" className={classes.menuItem}>
              <em>Recipients</em>
            </MenuItem>
            {recipients?.map((item, i) => (
              <MenuItem
                value={item.deptName}
                onClick={() => setDepartment(item.deptName)}
                key={i}
                className={classes.menuItem}>
                {item.deptName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ textAlign: 'end' }}>
          <PrimaryButton
            color="primary"
            variant="contained"
            fullWidth={matchesXs ? true : false}
            onClick={() => history.push(`/dashboard/memo/add`)}
            style={{
              textAlign: 'end',
              marginRight: '0',
              marginTop: 0,
              height: 54,
              boxShadow: 'none'
            }}>
            New Memo
          </PrimaryButton>
        </div>
      </div>
      <section className={classes.tableWrapper}>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader type="line-scale" color="#2F49D0" />
          </div>
        ) : memoData.length <= 0 ? (
          <div className={classes.recordWrapper}>
            <TypographyBold variant="h6" className={classes.noRecord}>
              No Memo record at the moment
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
                        color: '#878181',
                        justifyContent: 'center'

                      }}
                      className={classes.cellWrapper}>
                      {column.label}{column.icon}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {memoData &&
                  searchedItems?.map((row, i) => (
                    <TableRow hover key={i} className={classes.tableRow}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={i}
                            style={{
                              fontFamily: 'Rubik, sans-serif',
                              backgroundColor: '#FCFFFF',
                              fontSize: '16px',
                              fontWeight: 400,
                              color: '#232323',
                              textTransform: 'capitalize',
                            }}>
                            {column.id == 'action' ? (
                              <div className={classes.actionsWrapper}>
                                <Button
                                  size="small"
                                  disableElevation
                                  className={classes.actionBtn}
                                  onClick={() => {
                                    dispatch(fetchMemoData(row.memoId, setErr));
                                    history.push(
                                      `/dashboard/memo/view/${row.memoId}`,
                                    );
                                  }}>
                                  View
                                </Button>
                                <GetAppOutlined
                                  style={{ width: '28px', margin: 'auto' }}
                                />
                              </div>
                            ) : column.id === 'recipients' ? (
                              value?.department
                            ) : column.id === 'date' ? (
                              new Date(value).toLocaleDateString('en-GB')
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                {/* {memoData &&
                  filteredItem?.map((row, i) => (
                    <TableRow hover key={i} className={classes.tableRow}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={i}
                            style={{
                              fontFamily: 'Rubik, sans-serif',
                              backgroundColor: '#FCFFFF',
                              fontSize: '16px',
                              fontWeight: 400,
                              color: '#232323',
                              textTransform: 'capitalize',
                            }}>
                            {column.id == 'action' ? (
                              <div className={classes.actionsWrapper}>
                                <Button
                                  size="small"
                                  disableElevation
                                  className={classes.actionBtn}
                                  onClick={() => {
                                    dispatch(fetchMemoData(row.memoId, setErr));
                                    history.push(
                                      `/dashboard/memo/view/${row.memoId}`,
                                    );
                                  }}>
                                  View
                                </Button>
                                <GetAppOutlined
                                  style={{ width: '28px', margin: 'auto' }}
                                />
                              </div>
                            ) : column.id === 'recipients' ? (
                              value?.department
                            ) : column.id === 'date' ? (
                              new Date(value).toLocaleDateString('en-GB')
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </>
  );
}
