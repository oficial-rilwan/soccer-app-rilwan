import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  makeStyles,
  withStyles,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Select,
  MenuItem,
  InputBase,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Lottie from 'react-lottie';
import successAnimation from 'modules/animations/sucessful.json';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { useSelector } from 'react-redux';

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
        }}>
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
    padding: '2.2rem 5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

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
    color: '#C3C5C4',
    borderColor: '#E7E8E8',
    fontSize: 16,
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    height: '1.8rem',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:fos': {
      borderRadius: 4,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '43rem',
    height: '44.5rem',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
  },
  newDepartment: {
    width: '33rem',
    height: '33rem',
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
  menuItem: {
    textTransform: 'capitalize',
  },
}));

export default function DepartmentDialog({
  open,
  setOpen,
  success,
  setSuccess,
  newDepartment,
  setNewDepartment,
  setRefresh,
  refresh,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));

  const [searchData, setSearchData] = useState([]);
  let loading = searchData.length > 0;

  const [dept, setDept] = useState([]);
  const [values, setValues] = useState({
    employeeData: {
      employeeId: '',
      employeeToTransferName: '',
      department: '',
    },
    data: {
      reportingDate: '',
      newDepartment: '',
      newDesignation: '',
      reason: '',
    },
    reload: false,
  });

  const [deptPayload, setDeptPayload] = useState({
    name: '',
    manager: '',
    description: '',
  });

  const handleClose = () => {
    setValues({
      ...values,
      data: {
        ...values.data,
        reportingDate: '',
        newDepartment: '',
        newDesignation: '',
        reason: '',
      },
      employeeData: {
        employeeId: '',
        employeeToTransferName: '',
      },
    });
    setDeptPayload({ ...deptPayload, name: '', manager: '', description: '' });
    setSearchData([]);
    setOpen(false);
  };
  const handleBtnClick = () => {
    let { data } = values;
    values.employeeData?.employeeId
      ? authClient
          .post(
            `/api/v1/employee/transfer/management/dept/create?employeeId=${values.employeeData.employeeId}`,
            data,
          )
          .then((res) => {
            if (res.status == 201) {
              setSuccess(true);
              setValues({ ...values, reload: !values.reload });
              setTimeout(() => {
                handleClose();
                setRefresh(!refresh);
              }, 6500);
            }
          })
          .catch((e) => console.log(e))
      : null;
  };

  const handleNewDept = () => {
    authClient
      .post(
        `/api/v1/employee/department/management/create?employeeId=${values.employeeData?.employeeId}`,
        {
          name: deptPayload?.name,
          manager: deptPayload?.manager,
          description: deptPayload?.description,
        },
      )
      .then((response) => {
        if (response.status == 200 || 201) {
          setSuccess(true);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const handleSearch = (name) => (e) => {
    let { value } = e.target;
    setValues({
      ...values,
      employeeData: { ...values.employeeData, [name]: value },
    });
  };

  const handleReportingDate = (value) => {
    setValues({ ...values, data: { ...values.data, reportingDate: value } });
  };

  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const handleListItem = (id, firstName, lastName, department) => {
    setDeptPayload({ ...deptPayload, name: `${firstName} ${lastName}` });
    setValues({
      ...values,
      employeeData: {
        ...values.employeeData,
        employeeToTransferName: `${firstName} ${lastName}`,
        employeeId: id,
        department,
      },
    });
  };

  useEffect(() => {
    const handler =
      deptPayload?.name &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${deptPayload?.name}`,
          )
          .then(({ data }) => {
            setSearchData(data?.data);
          });
      }, 1500);
    return () => clearTimeout(handler);
  }, [deptPayload?.name]);

  useEffect(() => {
    const handler =
      values?.employeeData?.employeeToTransferName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.employeeData?.employeeToTransferName}`,
          )
          .then(({ data }) => {
            setValues({ ...values });
            setSearchData(data?.data);
          })
          .catch((e) => {
            setValues({ ...values });
            console.log(e);
          });
      }, 500);
    return () => clearTimeout(handler);
  }, [values?.employeeData?.employeeToTransferName]);

  const handleDeptChange = (name) => (e) => {
    let { value } = e.target;
    setDeptPayload({ ...deptPayload, [name]: value });
  };

  useEffect(() => {
    authClient
      .get(`/api/v1/employee/department/management/fetch`)
      .then(({ data }) => {
        setDept(data?.data);
      })
      .catch((e) => console.log(e));
  }, [values?.reload]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: newDepartment ? classes.newDepartment : classes.dialogPaper,
        }}
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Transfer
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: 'flex',
            justifyContent: matchesXs
              ? 'center'
              : success
              ? 'center'
              : 'flex-start',
            alignItems: 'center',
          }}>
          {success ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '17rem',
              }}>
              <Lottie
                options={defaultOptions}
                height={300}
                width={300}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Transfer successful</DialogTypography>
            </div>
          ) : newDepartment ? (
            <section style={{ height: '100%', width: '100%' }}>
              <div
                style={{
                  display: matchesXs ? 'block' : 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '1rem 2rem',
                }}>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(e, v) => {
                      setValues({
                        ...values,
                        employeeData: {
                          ...values.employeeData,
                          employeeToTransferName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          employeeId: v[0]?.employeeId,
                          department: v[0]?.department,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('name')}
                        {...params}
                        variant="outlined"
                        label=""
                        size="small"
                        placeholder="Search Employees"
                      />
                    )}
                  />
                  {/* <InputForEmployeePage
                    placeholder="Search Employees"
                    size="small"
                    fullWidth
                    style={{
                      fontStyle: 'italic',
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                    value={deptPayload?.name}
                    onChange={handleDeptChange('name')}
                  /> */}
                  {/* {deptPayload?.name.length > 0 && (
                    <Paper
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        minWidth: matchesXs ? '88%' : matchesSm ? '73%' : '55%',
                      }}>
                      <ul
                        style={{
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0,
                        }}>
                        {searchData?.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              handleListItem(
                                item?.employeeId,
                                item?.firstName,
                                item?.lastName,
                                item?.department,
                              )
                            }>
                            <TypographyH5
                              style={{
                                padding: '0.7rem 2rem',
                                borderBottom: '1px solid #9e9e9ead',
                                textTransform: 'capitalize',
                              }}>
                              {item.firstName} {item.lastName}
                            </TypographyH5>
                          </li>
                        ))}
                      </ul>
                    </Paper>
                  )} */}
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Manager:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    style={{
                      fontStyle: 'italic',
                    }}
                    placeholder="Search Managers"
                    fullWidth
                    onChange={handleDeptChange('manager')}
                    size="small"
                    value={deptPayload.manager}
                  />
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start', marginTop: '1rem' }}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Description:
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    placeholder="Type reason here"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    onChange={handleDeptChange('description')}
                    value={deptPayload.description}
                  />
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : '1.3rem',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '10rem',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}
                      onClick={handleNewDept}>
                      Save
                    </Button>
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
                        width: matchesXs ? '100%' : '10rem',
                        boxShadow: 'none',
                        margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section style={{ height: '100%', width: '100%' }}>
              <div
                style={{
                  display: matchesXs ? 'block' : 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '1rem 2rem',
                }}>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(e, v) =>
                      setValues({
                        ...values,
                        employeeData: {
                          ...values.employeeData,
                          employeeToTransferName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          employeeId: v[0]?.employeeId,
                          department: v[0]?.department,
                        },
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        onChange={handleSearch('employeeToTransferName')}
                        {...params}
                        variant="outlined"
                        label=""
                        placeholder="Search Employees"
                        size="small"
                      />
                    )}
                  />
                  {/* <InputForEmployeePage
                    placeholder="Name"
                    size="small"
                    fullWidth
                    style={{
                      fontStyle: 'italic',
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                    value={values?.employeeData?.employeeToTransferName}
                    onChange={handleSearch('employeeToTransferName')}
                  />
                  {values?.employeeData?.employeeToTransferName.length > 0 && (
                    <Paper
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        minWidth: matchesXs ? '88%' : matchesSm ? '73%' : '55%',
                      }}>
                      <ul
                        style={{
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0,
                        }}>
                        {searchData?.map((item, i) => (
                          <li
                            key={i}
                            style={{ pointer: 'cursor' }}
                            onClick={() =>
                              handleListItem(
                                item?.employeeId,
                                item?.firstName,
                                item?.lastName,
                                item?.department,
                              )
                            }>
                            <TypographyH5
                              style={{
                                padding: '0.7rem 2rem',
                                borderBottom: '1px solid #9e9e9ead',
                                textTransform: 'capitalize',
                              }}>
                              {item.firstName} {item.lastName}
                            </TypographyH5>
                          </li>
                        ))}
                      </ul>
                    </Paper>
                  )} */}
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Issuer's Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      margin: '.5rem 0',
                    }}>
                    {`${
                      profile?.firstName ||
                      user?.firstName ||
                      googleUser?.firstName
                    } ${
                      profile?.lastName ||
                      user?.lastName ||
                      googleUser?.lastName
                    }`}
                  </Typography>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Old Department:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    size="small"
                    type="text"
                    disabled
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: '.5rem 0 0',
                      backgroundColor: '#E0E0E0',
                      fontStyle: 'italic',
                    }}
                    value={values.employeeData.department}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Department:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <Select
                    labelId="country-label"
                    variant="outlined"
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '10rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    onChange={handleChange('newDepartment')}
                    value={values?.data.newDepartment}
                    input={<SelectInput />}
                    displayEmpty>
                    <MenuItem disabled value="" className={classes.menuItem}>
                      <em>Select</em>
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
                    style={{
                      display: 'inline-flex',
                      verticalAlign: 'middle',
                      alignItems: 'center',
                      color: '#1F53D7',
                    }}>
                    <IconButton onClick={() => setNewDepartment(true)}>
                      <AddCircleOutlineIcon style={{ color: '#1F53D7' }} />
                    </IconButton>
                    <Typography
                      variant="h5"
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 14,
                        display: 'inline-flex',
                      }}>
                      Add New Department
                    </Typography>
                  </div>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Designation:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    size="small"
                    type="text"
                    placeholder="Enter here"
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: '.5rem 0 0',
                      fontStyle: 'italic',
                    }}
                    value={values.data.newDesignation}
                    onChange={handleChange('newDesignation')}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Reporting Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: responsive ? '2 / 8' : '2 / 10',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                  }}>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      handleDateChange={handleReportingDate}
                      value={values.data?.reportingDate}
                      notched
                    />
                  </div>
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start', paddingTop: 20 }}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Reason:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    placeholder="Enter short note here"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    value={values.data.reason}
                    onChange={handleChange('reason')}
                  />
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      // justifyContent: 'space-between',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '10rem',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}
                      onClick={handleBtnClick}>
                      Process Transfer
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        borderRadius: '3px',
                        border: '1px solid #00000033',
                        backgroundColor: 'transparent',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        width: matchesXs ? '100%' : '10rem',
                        boxShadow: 'none',
                        margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
