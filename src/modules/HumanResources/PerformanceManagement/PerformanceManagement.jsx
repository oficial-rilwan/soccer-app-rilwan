import { useEffect, useState } from 'react';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import {
  Button,
  useTheme,
  useMediaQuery,
  makeStyles,
  LinearProgress,
  Typography,
  InputAdornment,
  IconButton,
  withStyles,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { Add, Search } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';
import Loader from 'react-loaders';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  table: {
    minWidth: 650,
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
  progress: {
    margin: '.3rem',
    borderRadius: '5px',
    height: '10px',
    width: '70%',
  },
  linearPrimaryColor: {
    backgroundColor: '#EACEFF',
  },
  linearBar: {
    borderRadius: '5px',
    backgroundColor: '#940CFE',
  },
  list_1: {
    color: '#000000ad',
    backgroundColor: '#56CCF2',
    borderRadius: 8,
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
  list_2: {
    color: '#EB5757',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  typography_1: {
    padding: theme.spacing(2),
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  typography_2: {
    padding: theme.spacing(2),
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  popOver: {
    boxShadow:
      '0px 0px 0px rgba(89, 88, 97, 0.14), 0px 6px 13px rgba(97, 97, 97, 0.14)',
    borderRadius: '12px',
    width: '8rem',
    cursor: 'pointer',
  },
  dialog: {
    background: '#fff',
    /* tab shade */
    boxShadow: '0px 8px 24px 0.694947px rgba(51, 63, 81, 0.15)',
    borderRadius: '7.85156px',
    width: '40rem',
    height: '20rem',
    [theme.breakpoints.down('xs')]: {
      height: '25rem',
    },
  },
  dialogTitle: {
    fontFamily: 'Rubik',
    fontSize: 15,
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  deleteBtn: {
    borderRadius: '3px',
    backgroundColor: '#EB5757',
    color: '#fff',
    textTransform: 'none',
    width: '7rem',
    marginRight: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: 0,
    },
    fontWeight: 500,
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EB5757',
    },
  },
  cancelBtn: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '7rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    background: '#EB5757',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
    marginTop: 8,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={useStyles().dialogTitle}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))(MuiDialogContent);

export default function PerformanceManagement() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  const [surveyId, setPerformanceId] = useState('');
  const [refresh, setRefresh] = useState(false);
  const handleDelete = () => {
    authClient
      .delete(
        `/api/v1/employee/performance/management/delete?surveyId=${surveyId}`,
      )
      .then((res) => {
        if (res.status === 200 || 201) {
          setDialogOpen(false);
          setRefresh(!refresh);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = (id) => (event) => {
    setPerformanceId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const columns = [
    { id: 'name', label: 'Survey Name', width: matchesSm ? 180 : 10 },
    // { id: 'participation', label: 'Participation', width: 180 },
    { id: 'endDate', label: 'End Date', width: 10 },
    { id: 'status', label: 'Status', width: 10 },
    { id: 'action', label: 'Action', width: matchesXs ? 120 : 10 },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const [values, setValues] = useState({
    data: {
      nameOfSurvey: '',
      periodicity: '',
      startDate: '',
      endDate: '',
      question: '',
      mandatory: '',
      fieldType: '',
      surveyUsers: [],
    },
  });

  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/performance/management/fetch?createdBy=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        setRowData(data?.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [refresh]);

  const searchedItems = rowData?.filter((item) => {
    let title = item.name;
    return title.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const normalise = (value) => ((value - 0) * 100) / (14 - 0);

  return (
    <>
      <HeaderComp url="/dashboard/performance" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '1rem',
        }}>
        <Button
          variant="contained"
          disableElevation
          endIcon={<Add />}
          onClick={() =>
            history.push('/dashboard/performance-evaluation/survey')
          }
          style={{
            borderRadius: '5px',
            backgroundColor: '#1F53D7',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: 'Rubik',
            width: matchesXs ? '100%' : 'auto',
          }}>
          Create Survey
        </Button>
      </div>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : rowData.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Performance evaluation at the moment
          </TypographyBold>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
          <InputForEmployeePage
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              fontStyle: 'italic',
              backgroundColor: '#EEF5FC',
              margin: '.5rem 0',
              padding: 0,
              width: matchesXs ? '100%' : '20rem',
            }}
            placeholder="Search Survey"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ color: '#828282' }} />
                </InputAdornment>
              ),
            }}
          />
          <TableContainer className={classes.container}>
            {searchedItems.length === 0 ? (
              <div className={classes.recordWrapper}>
                <TypographyBold variant="h6" className={classes.noRecord}>
                  Sorry, could not find survey
                </TypographyBold>
              </div>
            ) : (
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
                          color: '#6C6B6B',
                        }}
                        className={classes.cellWrapper}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData &&
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
                                fontSize: '16px',
                                fontWeight: column.id == 'name' ? 500 : 400,
                                color: '#232323',
                              }}>
                              {column.id == 'status' ? (
                                <Button
                                  variant="contained"
                                  disableElevation
                                  size="small"
                                  style={{
                                    background:
                                      row.status == 'ACTIVE'
                                        ? '#DBFFD6'
                                        : row.status == 'FINISHED'
                                        ? '#AFE0FC'
                                        : row.status == 'CLOSED'
                                        ? '#FFE0D6'
                                        : '',
                                    borderRadius: '4px',
                                    color:
                                      row.status == 'ACTIVE'
                                        ? '#00DC7D'
                                        : row.status == 'FINISHED'
                                        ? '#2F80ED'
                                        : row.status == 'CLOSED'
                                        ? '#EB5757'
                                        : '',
                                    textTransform: 'none',
                                    width: '5rem',
                                  }}>
                                  {row.status == 'ACTIVE'
                                    ? 'Active'
                                    : row.status == 'FINISHED'
                                    ? 'Finished'
                                    : row.status == 'CLOSED'
                                    ? 'Closed'
                                    : ''}
                                </Button>
                              ) : column.id == 'participation' ? (
                                <div style={{ display: 'flex', gap: '.7rem' }}>
                                  <LinearProgress
                                    variant="determinate"
                                    className={classes.progress}
                                    value={10}
                                    classes={{
                                      colorPrimary: classes.linearPrimaryColor,
                                      bar: classes.linearBar,
                                    }}
                                  />
                                  <Typography
                                    variant="h5"
                                    style={{
                                      fontFamily: 'Rubik',
                                      fontSize: '13px',
                                      width: '4rem',
                                    }}>
                                    {`${10} / 14`}
                                  </Typography>
                                </div>
                              ) : column.id == 'action' ? (
                                <div>
                                  <IconButton
                                    size="small"
                                    aria-describedby={id}
                                    onClick={handleClick(row.surveyId)}>
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Popover
                                    elevation={0}
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    classes={{
                                      paper: classes.popOver,
                                    }}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}>
                                    <ul
                                      style={{
                                        listStyle: 'none',
                                        margin: 0,
                                        padding: 0,
                                      }}>
                                      <li
                                        className={classes.list_2}
                                        onClick={handleClickOpen}>
                                        <Typography
                                          className={classes.typography_2}>
                                          Delete
                                        </Typography>
                                      </li>
                                    </ul>
                                  </Popover>
                                  <IconButton
                                    onClick={() =>
                                      history.push(
                                        `/dashboard/performance-evaluation/view/${row.surveyId}`,
                                      )
                                    }
                                    size="small"
                                    style={{ backgroundColor: '#EEF5FC' }}>
                                    <NavigateNextIcon />
                                  </IconButton>
                                </div>
                              ) : column.id == 'endDate' ? (
                                new Date(value).toLocaleDateString('en-GB')
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
            )}
          </TableContainer>
        </div>
      )}

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        classes={{
          paper: classes.dialog,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Delete Survey
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.dialogContent}>
            Are you sure you want to delete this Survey?
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: matchesXs ? 'column' : 'row',
              gap: matchesXs ? '1rem' : '3rem',
              justifyContent: 'flex-end',
              margin: '2rem',
            }}>
            <Button
              variant="contained"
              disableElevation
              onClick={handleDelete}
              className={classes.deleteBtn}>
              Delete
            </Button>
            <Button
              variant="contained"
              disableElevation
              className={classes.cancelBtn}
              onClick={handleDialogClose}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
