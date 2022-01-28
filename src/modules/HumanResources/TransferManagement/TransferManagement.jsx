import { lazy, useEffect, useState } from 'react';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import {
  InputAdornment,
  useTheme,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import { Search, KeyboardArrowDown } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { authClient } from 'modules/authentication/requestClient';
import { useDispatch, useSelector } from 'react-redux';
import transferActions from 'redux/actions/transferActions';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';

const { fetchTransferData } = transferActions;

const DepartmentDialog = lazy(() => import('./components/DepartmentDialog'));
const BranchDialog = lazy(() => import('./components/BranchDIalog'));

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
  },
  dropdownButton: {
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
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
  popOverPaper: {
    [theme.breakpoints.down('xs')]: {
      width: '8rem',
    },
    width: 'auto',
  },
  dialogPaper: {
    width: '50rem',
    height: '44rem',
    maxWidth: 'inherit',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
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
    height: '5rem',
  },
}));

export default function TransferManagement() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);
  const [branchSuccess, setBranchSuccess] = useState(false);
  const [newBranch, setNewBranch] = useState(false);
  const [newDepartment, setNewDepartment] = useState(false);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [values, setValues] = useState({
    data: [],
    isLoading: false,
  });

  const handleClickOpen = () => {
    setAnchorEl(null);
    setSuccess(false);
    setOpen(true);
    setNewDepartment(false);
  };

  const handleBranchOpen = () => {
    setAnchorEl(null);
    setBranchSuccess(false);
    setOpenBranch(true);
    setNewBranch(false);
  };

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const columns = [
    { id: 'employeeToTransferName', label: 'Employee Name', width: 180 },
    { id: 'reason', label: 'Transfer Reason', width: 170 },
    { id: 'newDepartment', label: 'Location/Department', width: 190 },
    { id: 'reportingDate', label: 'Date', width: 10 },
  ];
  const [searchTerm, setSearchTerm] = useState('');

  const searchedItems = values?.data?.filter((item) => {
    let name = `${item.employeeToTransferName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);
  useEffect(() => {
    setValues({ ...values, isLoading: true });
    authClient
      .get(
        `/api/v1/employee/transfer/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then((res) => {
        if (res.status == 200) {
          setValues({ ...values, data: res?.data?.data, isLoading: false });
        }
      })
      .catch((e) => {
        setValues({ ...values, isLoading: false });
        console.log(e);
      });
  }, [refresh]);

  return (
    <>
      <HeaderComp url="/dashboard/transfer" />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '1rem 0',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
        <InputForEmployeePage
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            fontStyle: 'italic',
            backgroundColor: '#F5F9F7',
            padding: 0,
            width: matchesXs ? '100%' : '24rem',
          }}
          placeholder="Search Employees"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#828282' }} />
              </InputAdornment>
            ),
          }}
        />
        <PrimaryButton
          endIcon={<KeyboardArrowDown />}
          className={classes.dropdownButton}
          onClick={handleClick}>
          Add New
        </PrimaryButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          style={{ marginTop: '2.8rem' }}
          PopoverClasses={{
            paper: classes.popOverPaper,
          }}
          open={Boolean(anchorEl)}
          onClose={handleAnchorClose}>
          <MenuItem
            style={{ fontFamily: 'Rubik', fontSize: 15 }}
            onClick={handleClickOpen}>
            Department
          </MenuItem>
          <MenuItem
            style={{ fontFamily: 'Rubik', fontSize: 15 }}
            onClick={handleBranchOpen}>
            Branch
          </MenuItem>
        </Menu>
      </div>
      {values?.isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : values?.data.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Transfers at the moment
          </TypographyBold>
        </div>
      ) : searchedItems?.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            Sorry, could not find employee
          </TypographyBold>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
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
                {searchedItems?.map((row, i) => (
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
                            textTransform: 'capitalize',
                            fontWeight:
                              column.id == 'employeeToTransferName' ? 500 : 400,
                            color:
                              column.id == 'employeeToTransferName'
                                ? '#1F53D7'
                                : '#232323',
                            cursor: 'pointer',
                          }}
                          onClick={() => (
                            dispatch(
                              fetchTransferData(row?.transferId, setError),
                            ),
                            history.push(
                              `/dashboard/transfer/view/${row.transferId}`,
                            )
                          )}>
                          {column.id == 'reportingDate'
                            ? `${
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(0, 6) +
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(8)
                              }`
                            : column.id === 'newDepartment'
                            ? row.newDepartment || row.newBranch
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
      )}

      <DepartmentDialog
        open={open}
        setOpen={setOpen}
        success={success}
        setSuccess={setSuccess}
        setNewDepartment={setNewDepartment}
        newDepartment={newDepartment}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <BranchDialog
        openBranch={openBranch}
        setBranchSuccess={setBranchSuccess}
        branchSuccess={branchSuccess}
        setOpenBranch={setOpenBranch}
        setNewBranch={setNewBranch}
        setRefresh={setRefresh}
        refresh={refresh}
        newBranch={newBranch}
      />
    </>
  );
}
