import React, { useEffect, useState } from 'react';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import ViewDetails from './ViewDetails';
import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
  Paper,
  Icon,
  Menu,
  MenuItem,
  Typography,
  Select,
  ListSubheader,
} from '@material-ui/core';
import classname from 'classnames';
import { SearchOutlined, AddCircleOutline } from '@material-ui/icons';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Lock } from 'lib/assets/icons/lock.svg';
import { authClient } from 'modules/authentication/requestClient';
import './index.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogTypography } from 'modules/components/Typography/Typography';
import animationData from 'modules/animations/mail.json';
import Lottie from 'react-lottie';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import SelectComp from 'lib/components/Select/SelectCOmp';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { useSelector } from 'react-redux';

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

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#FCFFFF',
    padding: '1rem 1rem 0',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    margin: '1.5rem 0',
  },
  popOver: {
    boxShadow:
      '0px 0px 0px rgba(89, 88, 97, 0.14), 0px 6px 13px rgba(97, 97, 97, 0.14)',
    borderRadius: '2px',
    border: '0.5px solid #878181',
    width: '12rem',
    cursor: 'pointer',
  },
  tab: {
    padding: '7px 12px',
    background: 'rgba(197, 197, 197, 0.5)',
    border: '0.2px solid #878181',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'scroll',
    },
  },
  tabText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    color: '#fff',
    margin: 7,
    [theme.breakpoints.down('xs')]: {
      padding: '0px 6px',
      fontWeight: 0,
      fontSize: '.7rem',
      margin: 7,
    },
  },
  tabTextActive: {
    color: '#1F53D7',
    margin: 7,
    fontSize: 16,
  },
  tabMenu: {
    background: 'transparent',
    borderRadius: '5px',
    width: '140px',
    textAlign: 'center',
    border: 'none',
    height: '100%',
  },
  tabMenuActive: {
    background: '#FFFFFF',
    border: '0.3px solid #878181',
    height: '100%',
  },
  table: {
    background: '#FCFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: '3px',
    minWidth: 950,
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
  dialogPaper: {
    width: '32rem',
    height: '34rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'inherit',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
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
}));

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
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '16px 65px 16px 16px',
  },
}))(MuiDialogContent);

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#F5F9F7',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
  },
})(TextField);

const initialLinks = {
  assets: false,
  liabilities: false,
  income: false,
  expense: false,
  equity: false,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'transparent',
    color: '#474747',
    fontSize: '19px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableHead = withStyles((theme) => ({
  body: {
    backgroundColor: 'transparent',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    color: '#000000',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: '#EEF5FC',
  },
}))(TableRow);

const initial = {
  'current asset': [],
  'cash and bank': [],
  'expected payments': [],
  inventory: [],
  'vendor payments and credits': [],
  'Non Current Asset': [],
  'depreciation and amortization': [],
  'property, plant and equipment': [],
  'other short-term assets': [],
  'other long-term assets': [],
  'current liabilities': [],
  'expected payments to vendors': [],
  'sales tax': [],
  'due for payroll': [],
  'loan and line of credit': [],
  'non-current liabilities': [],
  'other short-term liabilities': [],
  'other long-term liabilities': [],
  income: [],
  discount: [],
  'other income': [],
  'uncategorized income': [],
  'gain on foreign exchange': [],
  'operating expense': [],
  'cost of sales': [],
  'payment and processing fees': [],
  'payroll expense': [],
  'uncategorized expense': [],
  'loss on foreign exchange': [],
  'owner investment and withdrawal': [],
  'retained earnings': [],
};

const tax = [
  '7.5% S',

  'Exempt export',

  'Exempt',

  '0.0% Z import',

  '0.0% Z',

  'No VAT',

  '  7.5% S import',

  '  0.0% Z export',
];

const accountType = [
  {
    title: 'Assets',
    children: [
      'Cash and Bank',
      'Accounts Receivables',
      'Inventory',
      'Vendor Payments and Credits',
      'Depreciation and Amortization',
      'Property, Plant and Equipment',
      'Other short-term Assets',
      'Other long-term Assets',
    ],
  },
  {
    title: 'Liabilities',
    children: [
      'Accounts Payables',
      'Tax Payable',
      'Due for Payroll',
      'Loan and Line of Credit',
      //'Other Short-Term Liabilities',
      'Other Long-term Liabilities',
    ],
  },
  {
    title: 'Income',
    children: [
      'Income',
      'Discount Received',
      'Other Income',
      'Uncategorized Income',
      'Gain on Foreign Exchange',
    ],
  },
  {
    title: 'Expense',
    children: [
      'Operating Expense',
      'Cost of Sales',
      'Payment and Processing Fees',
      'Uncategorized Expenses',
      'Loss on Foreign Exchange',
    ],
  },
  {
    title: 'Equity',
    children: ['Owner investment and withdrawal', 'Retained Earnings'],
  },
];

export default function ChartsOfAccounts() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const [anchorEl, setAnchorEl] = useState(null);
  const [linksItems, setActive] = useState({ ...initialLinks, assets: true });
  const [accountsCode, setCode] = useState('');
  const [display, setDisplay] = useState('assets');
  const [chart, setChart] = useState({ ...initial });
  const [reload, setReload] = useState(false);

  const { user } = useSelector((state) => state?.auth);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    tax: '',
    accountType: {
      type: '',
      category: '',
      typeCode: '',
    },
    description: '',
    accountCode: '',
    accountName: '',
  });

  const handleDialogClose = () => {
    setValues({
      ...values,
      accountCode: '',
      accountName: '',
      accountType: {
        ...values.accountType,
        type: '',
        category: '',
        typeCode: '',
      },
      description: '',
      tax: '',
    });
    setOpen(false);
  };

  const handleSelectChange = (e) => {
    let { value } = e.target;
    setValues({ ...values, tax: value });
  };

  const handleSubmit = () => {
    authClient
      .post('/api/v1/accounting/charts/accounts/create', values)
      .then((res) => {
        if (res.status === 201) {
          setOpen(false);
          setReload(!reload);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleInputChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'description':
        setValues({ ...values, [name]: value });
        break;
      case 'accountName':
        setValues({ ...values, [name]: value });
        break;
      default:
        seetValues({ ...values, [name]: value });
        break;
    }
  };

  const classes = useStyles();
  const [activeRow, setActiveRow] = useState('');

  useEffect(() => {
    authClient
      .get(
        `/api/v1/accounting/accounts?createdBy=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then((res) => {
        accountSubTypes(res.data.data);
      })
      .catch((err) => console.log({ err }));
  }, [reload]);

  const makeTabActive = (type) => {
    setActive({ ...initialLinks, [type]: true });
    setDisplay(type);
  };

  const data = {
    assets: {
      title: 'Asset',
      types: [
        {
          accountName: 'Current Asset',
          classes: [
            {
              accountCode: '1000',
              accountName: 'Cash and Bank',
              children: chart['cash and bank'],
            },
            {
              accountCode: '1010',
              accountName: 'Accounts Receivables',
              children: chart['expected payments'],
            },
            {
              accountCode: '1020',
              accountName: 'Inventory',
              children: chart['inventory'],
            },
            {
              accountCode: '1060',
              accountName: 'Vendor Payments and Credits',
              children: chart['vendor payments and credits'],
            },
          ],
        },
        {
          accountName: 'Non Current Asset',
          classes: [
            {
              accountCode: '1050',
              accountName: 'Depreciation and Amortization',
              children: chart['depreciation and amortization'],
            },
            {
              accountCode: '1030',
              accountName: 'Property, Plant and Equipment',
              children: chart['property, plant and equipment'],
            },
            // {
            //   accountCode: '1070',
            //   accountName: 'Other short-term Assets',
            //   children: chart['other short-term assets'],
            // },
            // {
            //   accountCode: '1080',
            //   accountName: 'Other long-term Assets',
            //   children: chart['other long-term assets'],
            // },
          ],
        },
      ],
    },
    liabilities: {
      title: 'Liabilities',
      types: [
        {
          accountName: 'Current Liabilities',
          classes: [
            {
              accountCode: '2000',
              accountName: 'Accounts Payables',
              children: chart['expected payments to vendors'],
            },
            {
              accountCode: '2010',
              accountName: 'Sales Tax',
              children: chart['sales tax'],
            },
            {
              accountCode: '2030',
              accountName: 'Due for Payroll',
              children: chart['due for payroll'],
            },
            {
              accountCode: '1040',
              accountName: 'Loan and Line of Credit',
              children: chart['loan and line of credit'],
            },
          ],
        },
        {
          accountName: 'Non-Current Liabilities',
          classes: [
            {
              accountCode: '2040',
              accountName: 'Other Short-Term Liabilities',
              children: chart['other short-term liabilities'],
            },
            {
              accountCode: '2050',
              accountName: 'Other Long-Term Liabilities',
              children: chart['other short-term liabilities'],
            },
          ],
        },
      ],
    },
    income: {
      title: 'income',
      types: [
        {
          accountName: '',
          classes: [
            {
              accountCode: '4000',
              accountName: 'Income',
              children: chart['income'],
            },
            {
              accountCode: '4010',
              accountName: 'Discount Received',
              children: chart['discount'],
            },
            {
              accountCode: '4020',
              accountName: 'Other Income',
              children: chart['other income'],
            },
            {
              accountCode: '4020',
              accountName: 'Uncategorized Income',
              children: chart['uncategorized income'],
            },
            {
              accountCode: '4030',
              accountName: 'Gain on Foreign Exchange',
              children: chart['gain on foreign exchange'],
            },
          ],
        },
      ],
    },
    expense: {
      title: 'expenses',
      types: [
        {
          accountName: '',
          classes: [
            {
              accountCode: '5000',
              accountName: 'Operating Expense',
              children: chart['operating expense'],
            },
            {
              accountCode: '5010',
              accountName: 'Cost of Sales',
              children: chart['cost of sales'],
            },
            {
              accountCode: '5020',
              accountName: 'Payment and Processing Fees',
              children: chart['payment and processing fees'],
            },
            {
              accountCode: '5020',
              accountName: 'Payroll Expense',
              children: chart['payroll expense'],
            },
            {
              accountCode: '5040',
              accountName: 'Uncategorized Expenses',
              children: chart['uncategorized expense'],
            },
            {
              accountCode: '5050',
              accountName: 'Loss on Foreign Exchange',
              children: chart['loss on foreign exchange'],
            },
          ],
        },
      ],
    },
    equity: {
      title: 'Equity',
      types: [
        {
          accountName: '',
          classes: [
            {
              accountCode: '3000',
              accountName: 'Owner investment and withdrawal',
              children: chart['owner investment and withdrawal'],
            },
            {
              accountCode: '3010',
              accountName: 'Retained Earnings',
              children: chart['retained earnings'],
            },
          ],
        },
      ],
    },
  };

  const [table, setTable] = useState(data);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const subGroup = data[values.accountType?.type.toLowerCase()]?.types;
    let newCode;
    if (subGroup) {
      if (subGroup.length > 1) {
        //Assets and liabilities have more than one array List
        newCode = [...subGroup[0].classes, ...subGroup[1].classes].find(
          (el) =>
            el.accountName.toLowerCase() ==
            values.accountType.category.toLowerCase(),
        );
      } else {
        //Others 2 less than one array List apart from Assets and liabilities
        newCode = subGroup[0].classes.find(
          (el) =>
            el.accountName.toLowerCase() ==
            values.accountType.category.toLowerCase(),
        );
      }
    } else {
      newCode = '';
    }
    newCode =
      newCode == ''
        ? 1000
        : `${newCode.accountCode}-${newCode.children.length + 1}`;

    setCode(newCode);
    setValues({
      ...values,
      accountCode: newCode,
      accountType: {
        ...values.accountType,
        typeCode: String(newCode).substring(0, 4),
      },
    });
  }, [update, values.accountCode]);

  const handleChange = (e) => {
    setUpdate(update + 1);
    let { value } = e.target;
    const type = accountType
      .filter((item) => item.children.includes(value))
      .map((item) => item.title)
      .join();
    setValues({
      ...values,
      accountCode: accountsCode,
      accountType: {
        ...values.accountType,
        type,
        category: value,
      },
    });
  };

  useEffect(() => {
    authClient
      .get('/api/v1/accounting/charts/accounts/fetch')
      .then((res) => accountSubTypes(res.data.data))
      .catch((err) => console.log({ err }));
  }, [reload]);

  // COA Data
  function accountSubTypes(apiResponse) {
    let updatedChart = { ...initial };
    apiResponse.forEach((el) => {
      if (
        el.accountType.category &&
        !chart[el.accountType.category.toLowerCase()]
          .map((el) => el.chartOfAccountsId)
          .includes(el.chartOfAccountsId)
      ) {
        updatedChart[el.accountType.category.toLowerCase()].push(el);
      }
    });
    setChart(updatedChart);
  }

  const { assets, liabilities, income, expense, equity } = linksItems;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOver = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [viewDetail, setViewDetail] = useState({
    data: false,
    id: '',
    row: '',
  });

  const handleView = (row) => (e) => {
    setViewDetail({
      ...viewDetail,
      open: true,
      id: row.chartOfAccountsId,
      row,
    });
  };

  const calculateAcctsCounts = function (type) {
    const subGroup = data[type]?.types;
    let counts = 0;
    if (subGroup.length > 1) {
      //Assets and liabilities have more than one array List
      counts = [...subGroup[0].classes, ...subGroup[1].classes];
    } else {
      //Others 2 less than one array List apart from Assets and liabilities
      counts = subGroup[0].classes;
    }
    counts = counts.reduce((acc, cur) => acc + cur.children.length, 0);
    return counts;
  };

  return (
    <>
      <HeaderComp url="/dashboard/charts-of-accounts" />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        <CssTextField
          placeholder="Search Accounts"
          variant="outlined"
          onChange={() => {}}
          style={{
            width: matchesXs ? '100%' : '19rem',
            margin: matchesXs ? '1rem 0' : '0 auto 0 0',
            // marginRight: 'auto',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <PrimaryButton
          color="primary"
          variant="contained"
          fullWidth={matchesXs ? true : false}
          onClick={handleClick}
          style={{
            marginRight: matchesXs ? 0 : '1.5rem',
            marginTop: tabUp ? 0 : '.5rem',
            height: 54,
          }}
          endIcon={<Icon>keyboard_arrow_down</Icon>}>
          Add Account
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
          onClose={handleClose}>
          <MenuItem
            style={{ fontFamily: 'Rubik', fontSize: 15 }}
            onClick={handlePopOver}>
            Add Manually
          </MenuItem>
          <MenuItem
            classes={{
              root: classes.retirement,
            }}>
            Import
          </MenuItem>
        </Menu>
      </div>
      <div>
        <div className={classes.tab}>
          <div
            onClick={() => makeTabActive('assets')}
            className={classname({
              [classes.tabMenu]: true,
              [classes.tabMenuActive]: assets,
            })}>
            <p
              className={classname({
                [classes.tabText]: true,
                [classes.tabTextActive]: assets,
              })}>
              Assets (<>{calculateAcctsCounts('assets')}</>)
            </p>
          </div>
          <div
            onClick={() => makeTabActive('liabilities')}
            className={classname({
              [classes.tabMenu]: true,
              [classes.tabMenuActive]: liabilities,
            })}>
            <p
              className={classname({
                [classes.tabText]: true,
                [classes.tabTextActive]: liabilities,
              })}>
              Liabilities (<>{calculateAcctsCounts('liabilities')}</>)
            </p>
          </div>

          <div
            onClick={() => makeTabActive('income')}
            className={classname({
              [classes.tabMenu]: true,
              [classes.tabMenuActive]: income,
            })}>
            <p
              className={classname({
                [classes.tabText]: true,
                [classes.tabTextActive]: income,
              })}>
              Income (<>{calculateAcctsCounts('income')}</>)
            </p>
          </div>
          <div
            onClick={() => makeTabActive('expense')}
            className={classname({
              [classes.tabMenu]: true,
              [classes.tabMenuActive]: expense,
            })}>
            <p
              className={classname({
                [classes.tabText]: true,
                [classes.tabTextActive]: expense,
              })}>
              Expense (<>{calculateAcctsCounts('expense')}</>)
            </p>
          </div>
          <div
            onClick={() => makeTabActive('equity')}
            className={classname({
              [classes.tabMenu]: true,
              [classes.tabMenuActive]: equity,
            })}>
            <p
              className={classname({
                [classes.tabText]: true,
                [classes.tabTextActive]: equity,
              })}>
              Equity (<>{calculateAcctsCounts('equity')}</>)
            </p>
          </div>
        </div>
        <div>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Code</StyledTableCell>
                  <StyledTableCell align="center">Account Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table[display].types.map(({ accountName, classes }) => (
                  <>
                    {accountName != '' && (
                      <TableRow>
                        <StyledTableCell colSpan="5" component="th" scope="row">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              height: 30,
                            }}>
                            <TypographyH5
                              style={{
                                fontSize: 23,
                              }}>
                              {accountName}
                            </TypographyH5>
                            <span className="sample"></span>
                          </div>
                        </StyledTableCell>
                      </TableRow>
                    )}
                    {classes.map(({ accountCode, accountName, children }) => {
                      return (
                        <>
                          <StyledTableRow>
                            <StyledTableHead>
                              <span style={{ color: '#940CFE' }}>
                                {accountCode}
                              </span>
                            </StyledTableHead>
                            <StyledTableHead colSpan="3">
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'start',
                                  fontFamily: 'Rubik',
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                }}>
                                <span style={{ marginRight: '5px' }}>
                                  {accountName}
                                </span>
                                <Lock />
                              </div>
                            </StyledTableHead>
                          </StyledTableRow>
                          {children.length > 0 ? (
                            <>
                              {children.map((row) => {
                                return (
                                  <TableRow key={row.accountName}>
                                    <StyledTableCell component="th" scope="row">
                                      <span style={{ color: '#940CFE' }}>
                                        {row.accountCode}
                                      </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      <span
                                        style={{
                                          display: 'block',
                                          color: '#000',
                                        }}>
                                        {row.accountName}
                                      </span>
                                      <span style={{ color: '#DFDFDF' }}>
                                        {`Last transaction on ${new Date(
                                          row.createdAt,
                                        )
                                          .toDateString()
                                          .substr(4)}`}
                                      </span>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {row.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <span
                                        onClick={handleView(row)}
                                        style={{
                                          fontFamily: 'Rubik',
                                          fontStyle: 'normal',
                                          fontWeight: 'normal',
                                          fontSize: '16px',
                                          textAlign: 'right',
                                          color: '#1F53D7',
                                          cursor: 'pointer',
                                        }}>
                                        View Details
                                      </span>
                                    </StyledTableCell>
                                  </TableRow>
                                );
                              })}
                              <TableRow>
                                <StyledTableCell
                                  component="th"
                                  scope="row"></StyledTableCell>
                                <StyledTableCell
                                  colSpan="3"
                                  component="th"
                                  scope="row">
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'end',
                                      cursor: 'pointer',
                                    }}>
                                    <AddCircleOutline
                                      onClick={() => (
                                        setValues({
                                          ...values,
                                          accountCode: accountCode,
                                          accountType: {
                                            ...values.accountType,
                                            category: accountName,
                                          },
                                        }),
                                        setOpen(true)
                                      )}
                                    />
                                    <p
                                      style={{
                                        color: 'blue',
                                        marginLeft: '5px',
                                      }}>
                                      Add New Ledger Account
                                    </p>
                                  </div>
                                </StyledTableCell>
                              </TableRow>
                            </>
                          ) : (
                            <TableRow>
                              <StyledTableCell
                                component="th"
                                scope="row"></StyledTableCell>
                              <StyledTableCell
                                colSpan="3"
                                component="th"
                                scope="row">
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'end',
                                    cursor: 'pointer',
                                  }}>
                                  <AddCircleOutline
                                    onClick={() => (
                                      setValues({
                                        ...values,
                                        accountCode: accountCode,
                                        accountType: {
                                          ...values.accountType,
                                          category: accountName,
                                        },
                                      }),
                                      setOpen(true)
                                    )}
                                  />
                                  <p
                                    style={{
                                      color: 'blue',
                                      marginLeft: '5px',
                                    }}>
                                    Add New Ledger Account
                                  </p>
                                </div>
                              </StyledTableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          container: classes.dialogContainer,
          paper: classes.dialogPaper,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Create New Account
        </DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: matchesXs ? 'block' : 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: '1rem 2rem',
            }}>
            <div className={classes.formFieldWrapper}>
              <Typography variant="h6" className={classes.formTitle}>
                Account name:
                <span className={classes.required}>*</span>
              </Typography>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputForEmployeePage
                style={{
                  fontStyle: 'italic',
                }}
                placeholder="Enter here"
                fullWidth
                size="small"
                onChange={handleInputChange('accountName')}
              />
              {/* <span>
                <TypographyH5 style={{ fontStyle: 'italic', fontSize: 9 }}>
                  What would you like to call this account?
                </TypographyH5>
              </span> */}
            </div>
            <div className={classes.formFieldWrapper}>
              <Typography variant="h6" className={classes.formTitle}>
                Account type:
                <span className={classes.required}>*</span>
              </Typography>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Select
                value={values.accountType.category}
                fullWidth
                size="small"
                variant="outlined"
                classes={{
                  select: classes.select,
                  // paper: classes.selectRoot,
                }}
                onChange={handleChange}
                className={classes.selectInput}>
                <div
                  style={{
                    textAlign: 'center',
                    borderBottom: '1px solid #eee',
                    padding: '0 0 .5rem',
                  }}>
                  <TypographyBold>Account Types</TypographyBold>
                </div>
                {accountType.map((type, i) => {
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
            <div className={classes.formFieldWrapper}>
              <Typography variant="h6" className={classes.formTitle}>
                Account code:
              </Typography>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputForEmployeePage
                disabled
                style={{
                  backgroundColor: '#E0E0E0',
                }}
                placeholder="1000-3"
                fullWidth
                size="small"
                value={values.accountCode || accountsCode}
              />
            </div>
            <div
              className={classes.formFieldWrapper}
              style={{ alignItems: 'flex-start' }}>
              <Typography variant="h6" className={classes.formTitle}>
                Description:
              </Typography>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputForEmployeePage
                placeholder="Enter description"
                fullWidth
                size="small"
                multiline
                onChange={handleInputChange('description')}
                rows={4}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <Typography variant="h6" className={classes.formTitle}>
                Tax:
              </Typography>
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
                {tax.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1.2rem 0 0px 5rem',
            }}>
            <PrimaryButton style={{ margin: '.5rem' }} onClick={handleSubmit}>
              Save
            </PrimaryButton>
            <DefaultButton
              style={{ margin: '.5rem' }}
              onClick={handleDialogClose}>
              Cancel
            </DefaultButton>
          </div>
        </DialogContent>
      </Dialog>
      <ViewDetails
        open={viewDetail.open}
        handleViewClose={() => setViewDetail({ ...viewDetail, open: false })}
        setView={setViewDetail}
        viewDetail={viewDetail}
        id={viewDetail.id}
        reload={reload}
        setReload={setReload}
        row={viewDetail.row}
      />
    </>
  );
}
