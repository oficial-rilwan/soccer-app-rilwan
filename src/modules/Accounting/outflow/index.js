import React, { useEffect, useState, useRef } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import Alert from '@material-ui/lab/Alert';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { GridContainer, GridItem } from 'modules/components/Grid';
import TextField from '@material-ui/core/TextField';
import {
  Close,
  CreateOutlined,
  DeleteForeverOutlined,
  DeleteOutline,
  SearchOutlined,
} from '@material-ui/icons';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import {
  Select,
  MenuItem,
  InputBase,
  useMediaQuery,
  Typography,
  InputAdornment,
  Dialog,
  IconButton,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import InputField from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { DeleteDialog } from './DeleteDialog';
import { EditDialog } from './EditDialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ReactComponent as Attach_file } from 'lib/assets/icons/attach_file.svg';
import AccountSelect from '../inflow/AccountSelect';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#EEF5FC',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    marginBottom: '4rem',
    marginTop: '1rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  stickyHeader: { backgroundColor: 'transparent' },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
  },
  tableContainer: {
    overflowX: 'auto',
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
      height: '5px',
    },
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: '#F5F5F5',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
      backgroundColor: '#5559',
    },
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  container: { marginBottom: '17px !important' },
  dialogPaper: {
    width: '42rem',
    height: '40rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  inputAdornment: {
    color: '#878181',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  input: {
    display: 'none',
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
  selectInput: {
    height: 42,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  select: {
    padding: 12,
  },
  selectRoot: {
    height: '30rem',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  deleteBtn: {
    borderRadius: '3px',
    backgroundColor: '#EB5757',
    color: '#fff',
    textTransform: 'none',
    width: '7rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    boxShadow: 'none',
  },
}));

const columns = [
  { id: 'name', label: 'Expenses Name', minWidth: 120 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'debitAccountType', label: 'Category', minWidth: 120 },
  { id: 'amount', label: 'Amount', minWidth: 120 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
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
          fontWeight: 500,
          fontSize: '19.6787px',
          lineHeight: '20px',
          marginTop: '1rem',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '16px 0px 16px 0px',
  },
}))(MuiDialogContent);

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#fff',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
  },
})(TextField);

const accountType = [
  {
    title: 'Income account',

    children: [
      ' Gain on foreign exchange',
      'Sales',
      'Uncategorised income ',
      'Discount ',
    ],
  },
  {
    title: 'Asset account',
    children: [' Account receivables ', ' Opening stock '],
  },
  {
    title: 'Liability account',
    children: [' Account payable', ' Wages payable'],
  },
  {
    title: 'Equity Account',
    children: ["Owner's investment and withdrawal", "Owner's equity "],
  },
];

const WTTRates = [
  {
    title: 'Types of Payment',
    children: [
      'Dividdends, Interest and Rent(10%)',
      'Director"s fee (10% Individuals)',
      'Hire of Equipment 10%)',
      'Royalties (Companies - 10%) ',
      'Royalties (Individuals -5%)',
    ],
  },
];
const paymentType = [
  'Accounting Fee',
  'Advertisement and Promotion',
  'Hospital expenses',
  'Internet Exp',
  'Transport exp',
];
export default function Inflow() {
  const [path, , pathname] = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const [credit, setCredit] = useState([]);
  const [debit, setDebit] = useState([]);

  const [values, setValues] = useState({
    date: '',
    dueDate: '',
    tax: '',
    amount: '',
    debitAccountType: {
      code: '',
      id: '',
      name: '',
    },
    creditAccountType: {
      code: '',
      id: '',
      name: '',
    },
    recipient: {
      type: 'vendor',
      id: '',
      name: '',
    },
    description: '',
    paymentType: '',
    transactionType: 'outflow',
  });
  const handleSearch = () => {};

  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(false);
  const [reload, setReload] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const handleDialogClose = () => {
    setValues({
      ...values,
      tax: 'yes',
      date: '',
      amount: '',
      description: '',
      paymentType: '',
      debitAccountType: {
        code: '',
        id: '',
        name: '',
      },
      creditAccountType: {
        code: '',
        id: '',
        name: '',
      },
      recipient: {
        type: 'vendor',
        id: '',
        name: '',
      },
    });
    setSearchData([]);
    setOpen(false);
  };
  const [isTaxable, setTax] = useState('yes');

  const handleInputChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'amount':
        setValues({
          ...values,
          [name]: Number(value.replace(/,/g, '')).toLocaleString(),
        });
        break;
      case 'vendorName':
        setSearchKeyword(!searchKeyword);
        setValues({
          ...values,
          recipient: { ...values.recipient, name: value },
        });
        break;
      case 'tax':
        setTax(value);
        break;
      default:
        setValues({ ...values, [name]: value });
        break;
    }
  };

  const handleDateChange = (e, type) => setValues({ ...values, [type]: e });

  const handleSelectChange = (e) => {
    let { value } = e.target;
    setValues({ ...values, tax: value });
  };

  const [imageData, setImageData] = useState('');
  const handleSubmit = () => {
    const {
      name,
      date,
      dueDate,
      paymentType,
      description,
      transactionType,
      tax,
      creditAccountType,
      recipient,
      debitAccountType,
    } = values;

    authClient
      .post('/api/v1/accounting/transaction', {
        name,
        amount: values?.amount.replace(/\,/g, ''),
        paymentType,
        description,
        date,
        dueDate,
        tax,
        transactionType,
        receipt: imageData,
        creditAccountType,
        recipient,
        debitAccountType,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log({ res });
          setSuccess(true);
          setReload(!reload);
          setTimeout(() => {
            handleDialogClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const [data, setData] = useState([]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleDeleteOpen = (id) => {
    setTransactionId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleListItem = (id, name) => {
    setSearchKeyword(!searchKeyword);
    setValues({
      ...values,
      recipient: {
        ...values.recipient,
        name,
        id,
      },
    });
  };

  const [edit, setEdit] = useState(false);

  const handleEditDialogOpen = (id) => {
    setTransactionId(id);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };
  const [imageName, setImageName] = useState('No Image');

  const handleReceiptChange = (e) => {
    let { files } = e.target;
    setImageName(files[0]?.name);
    files[0] && setImageData(URL.createObjectURL(files[0]));
  };

  const handleAccountSelect = (name) => (e) => {
    switch (name) {
      case 'credit':
        setValues({
          ...values,
          creditAccountType: {
            ...values.creditAccountType,
            name: e.accountName,
            id: e.chartOfAccountsId,
            code: e.accountCode,
          },
        });
        break;
      case 'debit':
        setValues({
          ...values,
          debitAccountType: {
            ...values.debitAccountType,
            name: e.accountName,
            id: e.chartOfAccountsId,
            code: e.accountCode,
          },
        });
        break;
    }
  };

  useEffect(() => {
    const handler =
      values.recipient.name &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/accounting/vendor/search?keyword=${values.recipient.name}`,
          )
          .then(({ data }) => {
            setSearchData(data?.data);
          });
      }, 1500);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  useEffect(() => {
    authClient
      .get(
        'https://jureb-backend.herokuapp.com/api/v1/accounting/charts/accounts/fetch?accountType.type=Expense',
      )
      .then(({ data }) => {
        console.log({ data });
      })
      .catch((e) => console.log({ e }));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    authClient
      .get(`/api/v1/accounting/transaction?transactionType=outflow`)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [reload]);

  const fileInput = useRef();

  useEffect(() => {
    authClient
      .get(
        `/api/v1/accounting/accounts?transaction=outflow&transactionType=credit`,
      )
      .then(({ data }) => setCredit(data?.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/accounting/accounts?transaction=outflow&transactionType=debit`,
      )
      .then(({ data }) => setDebit(data?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header path={path} url={'/dashboard/outflow'} pathname={pathname} />
      <Alert
        icon={<CloudUpload color="primary" fontSize="inherit" />}
        severity="info"
        action={
          <Button variant="outlined" color="primary">
            Connect your Bank
          </Button>
        }>
        Import transactions securely to automate your bookkeeping and reports.
      </Alert>
      <div
        style={{
          marginRight: matchesXs ? 0 : '1.5rem',
          marginTop: tabUp ? '1rem' : '.5rem',
          textAlign: 'end',
        }}>
        <PrimaryButton onClick={() => history.push('/dashboard/outflow/form')}>
          Add Outflow
        </PrimaryButton>
      </div>

      <section className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={1}>
            <TypographyBold component="h4">Filter:</TypographyBold>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <TypographyBold component="h6">Expenses Name :</TypographyBold>

            <CssTextField
              placeholder="Search Customer"
              variant="outlined"
              onChange={handleSearch}
              style={{
                width: matchesXs ? '100%' : '12rem',
                margin: matchesXs ? '1rem 0' : 0,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3}>
            <Typography component="h6">To:</Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <HireDateInput
                fullWidth
                size="medium"
                font
                handleDateChange={() => {}}
                helperText={''}
                value={''}
                error={false}
              />
            </div>
          </GridItem>

          <GridItem xs={12} sm={3}>
            <Typography component="h6">From:</Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <HireDateInput
                fullWidth
                size="medium"
                font
                handleDateChange={() => {}}
                helperText={''}
                value={''}
                error={false}
              />
            </div>
          </GridItem>
        </GridContainer>
      </section>
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
              {data?.data?.map((row, i) => (
                <TableRow hover key={i} className={classes.tableRow}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        style={{
                          fontFamily: 'Rubik, sans-serif',
                          backgroundColor: '#FCFFFF',
                          fontSize: '16px',
                          textTransform: 'capitalize',
                        }}>
                        {column.id === 'action' ? (
                          <>
                            <IconButton
                              onClick={() =>
                                handleDeleteOpen(row.transactionId)
                              }>
                              <DeleteForeverOutlined
                                style={{ color: '#EB5757' }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleEditDialogOpen(row.transactionId)
                              }>
                              <CreateOutlined />
                            </IconButton>
                          </>
                        ) : column.id === 'date' ? (
                          new Date(value).toLocaleDateString('en-GB')
                        ) : column.id === 'amount' ? (
                          `NGN ${Number(value).toLocaleString()}`
                        ) : column.id === 'debitAccountType' ? (
                          value?.name
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
        {isLoading ? (
          <div className={classes.loader}>
            <Loader type="line-scale" color="#2F49D0" />
          </div>
        ) : (
          data?.data?.length == 0 && (
            <div className={classes.recordWrapper}>
              <Typography variant="h6" className={classes.noRecord}>
                No outflows record found
              </Typography>
            </div>
          )
        )}
      </div>
      <Dialog
        fullWidth
        maxWidth="xl"
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          container: classes.dialogContainer,
          paper: classes.dialogPaper,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Add Outflow
        </DialogTitle>
        <DialogContent dividers style={{ padding: success && 0 }}>
          {success ? (
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Successful</DialogTypography>
            </div>
          ) : (
            <GridContainer>
              <GridItem xs={12} sm={9}>
                <div style={{ marginBottom: '10px' }}>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <GridContainer>
                        <GridItem
                          style={{ display: 'flex', alignItems: 'center' }}
                          xs={12}
                          sm={3}>
                          <TypographyH5
                            variant="h6"
                            className={classes.formTitle}>
                            Date:
                            <span className={classes.required}>*</span>
                          </TypographyH5>
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                          <MaterialDatePicker
                            fontItalic
                            notched
                            value={values.date}
                            handleDateChange={(e) =>
                              handleDateChange(e, 'date')
                            }
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <GridContainer>
                        <GridItem
                          style={{ display: 'flex', alignItems: 'center' }}
                          xs={12}
                          sm={4}>
                          <TypographyH5
                            variant="h6"
                            className={classes.formTitle}>
                            Due Date:
                            <span className={classes.required}>*</span>
                          </TypographyH5>
                        </GridItem>
                        <GridItem xs={12} sm={8}>
                          <MaterialDatePicker
                            fontItalic
                            notched
                            value={values.dueDate}
                            handleDateChange={(e) =>
                              handleDateChange(e, 'dueDate')
                            }
                          />
                        </GridItem>{' '}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </div>
                <div
                  style={{
                    display: matchesXs ? 'block' : 'grid',
                    gridTemplateColumns: 'repeat(2,1fr)',
                    gap: '1rem 2rem',
                  }}>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Expense Name:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <InputForEmployeePage
                      style={{
                        fontStyle: 'italic',
                      }}
                      placeholder="Enter Expenses"
                      fullWidth
                      value={values.name}
                      size="small"
                      onChange={handleInputChange('name')}
                    />
                    {searchKeyword && (
                      <Paper
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          minWidth: matchesXs ? '68%' : '49%',
                        }}>
                        <ul
                          style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                          }}>
                          {[]?.map((item, i) => (
                            <li
                              key={i}
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() =>
                                handleListItem(item?.vendorId, item?.name)
                              }>
                              <TypographyH5
                                style={{
                                  padding: '0.7rem 2rem',
                                  borderBottom: '1px solid #9e9e9ead',
                                  textTransform: 'capitalize',
                                }}>
                                {item?.name}
                              </TypographyH5>
                            </li>
                          ))}
                        </ul>
                      </Paper>
                    )}
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Vendor:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <InputForEmployeePage
                      style={{
                        fontStyle: 'italic',
                      }}
                      placeholder="Search Vendor"
                      fullWidth
                      value={values.recipient.name}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            classes={{ root: classes.inputAdornment }}
                            position="start">
                            <SearchOutlined />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleInputChange('vendorName')}
                    />
                    {searchKeyword && (
                      <Paper
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          minWidth: matchesXs ? '68%' : '49%',
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
                                handleListItem(item?.vendorId, item?.name)
                              }>
                              <TypographyH5
                                style={{
                                  padding: '0.7rem 2rem',
                                  borderBottom: '1px solid #9e9e9ead',
                                  textTransform: 'capitalize',
                                }}>
                                {item?.name}
                              </TypographyH5>
                            </li>
                          ))}
                        </ul>
                      </Paper>
                    )}
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Amount Paid:
                    </TypographyH5>
                    <span className={classes.required}>*</span>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <InputField
                      placeholder="Enter amount"
                      fullWidth
                      naira={'NGN'}
                      size="small"
                      value={values.amount}
                      onChange={handleInputChange('amount')}
                    />
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <div className={classes.formFieldWrapper}>
                      <TypographyH5 variant="h6" className={classes.formTitle}>
                        Are you withholding tax from this transaction ?{' '}
                      </TypographyH5>
                    </div>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <RadioGroup
                      row
                      aria-label="withholding tax from this transaction"
                      value={isTaxable}
                      onChange={handleInputChange('tax')}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </div>
                  {isTaxable == 'yes' && (
                    <>
                      <div className={classes.formFieldWrapper}>
                        <TypographyH5
                          variant="h6"
                          className={classes.formTitle}>
                          Withholding Tax Rates{' '}
                        </TypographyH5>
                      </div>
                      <div style={{ gridColumn: '2 / 6' }}>
                        <Select
                          value={values.tax}
                          fullWidth
                          size="small"
                          variant="outlined"
                          classes={{
                            select: classes.select,
                          }}
                          onChange={handleSelectChange}
                          className={classes.selectInput}>
                          <div
                            style={{
                              textAlign: 'center',
                              borderBottom: '1px solid #eee',
                              padding: '0 0 .5rem',
                            }}>
                            <TypographyBold>
                              Withholding Tax Rates
                            </TypographyBold>
                          </div>
                          {WTTRates.map((type, i) => {
                            return [
                              <ListSubheader key={i} disableSticky>
                                <TypographyBold style={{ color: '#000' }}>
                                  {type.title}
                                </TypographyBold>
                              </ListSubheader>,
                              type.children.map((child, idx) => (
                                <MenuItem
                                  style={{ padding: '.2rem 2rem' }}
                                  key={idx}
                                  value={child}>
                                  <TypographyH5 style={{ fontSize: 15 }}>
                                    {child}
                                  </TypographyH5>
                                </MenuItem>
                              )),
                            ];
                          })}
                        </Select>
                      </div>
                    </>
                  )}
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Expense Account:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <AccountSelect
                      value={values.debitAccountType.name}
                      handleItemClose={handleAccountSelect('debit')}
                      menuItem={debit}
                      account
                      fullWidth
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Credit Account:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <AccountSelect
                      value={values.creditAccountType.name}
                      handleItemClose={handleAccountSelect('credit')}
                      menuItem={credit}
                      account
                      fullWidth
                    />
                  </div>
                  <div
                    className={classes.formFieldWrapper}
                    style={{ alignItems: 'flex-start' }}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
                      Description:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2 / 6' }}>
                    <InputForEmployeePage
                      placeholder="Enter description"
                      fullWidth
                      size="small"
                      multiline
                      onChange={handleInputChange('description')}
                      rows={3}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1.2rem 0 0px 5rem',
                  }}>
                  <PrimaryButton
                    style={{ margin: '.5rem' }}
                    onClick={handleSubmit}>
                    Save
                  </PrimaryButton>
                  <DefaultButton
                    style={{ margin: '.5rem' }}
                    onClick={handleDialogClose}>
                    Cancel
                  </DefaultButton>
                </div>
              </GridItem>

              <GridItem xs={12} sm={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="logo"
                  onChange={handleReceiptChange}
                  ref={fileInput}
                />

                <label htmlFor="contained-button-file">
                  <div
                    style={{
                      border: '1px dotted #000',
                      height: '170px',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '20px',
                    }}>
                    <Attach_file />
                    <p style={{ fontSize: '9px', color: 'blue' }}>
                      Attach reciept
                    </p>
                  </div>
                  <p style={{ fontSize: '5px', fontWeight: 'bold' }}>
                    {imageName}
                  </p>
                </label>
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </Dialog>
      <DeleteDialog
        deleteOpen={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        id={transactionId}
        reload={reload}
        setReload={setReload}
      />
      {edit && (
        <EditDialog
          id={transactionId}
          handleDialogClose={handleEditClose}
          open={edit}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  );
}
