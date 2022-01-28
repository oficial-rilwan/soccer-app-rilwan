import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  Dialog,
  IconButton,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Close, SearchOutlined } from '@material-ui/icons';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import InputField from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';

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
    width: '36rem',
    height: '36rem',
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
    padding: '16px 65px 16px 16px',
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

const paymentType = ['Cash', 'Cheque', 'Bank Transfers', 'Others'];

const EditDialog = ({ open, handleDialogClose, id, reload, setReload }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));

  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [values, setValues] = useState({
    date: '',
    amount: '',
    accountType: {
      category: '',
      type: '',
    },
    description: '',
    paymentType: '',
    transactionType: 'inflow',
    customerName: '',
    customerId: '',
  });

  const handleInputChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'amount':
        setValues({
          ...values,
          [name]: Number(value.replace(/,/g, '')).toLocaleString(),
        });
        break;
      case 'customerName':
        setSearchKeyword(!searchKeyword);
        setValues({ ...values, [name]: value });
        break;
      default:
        setValues({ ...values, [name]: value });
        break;
    }
  };

  const handleDateChange = (val) => {
    setValues({ ...values, date: val });
  };

  const handleSelectChange = (e) => {
    let { value } = e.target;
    setValues({ ...values, paymentType: value });
  };

  const handleChange = (e) => {
    let { value } = e.target;
    const type = accountType
      .filter((item) => item.children.includes(value))
      .map((item) => item.title)
      .join();
    setValues({
      ...values,
      accountType: { ...values.accountType, type, category: value },
    });
  };

  const handleSubmit = () => {
    // const {
    //   name,
    //   accountType,
    //   date,
    //   paymentType,
    //   description,
    //   transactionType,
    //   customerName,
    //   customerId,
    // } = values;
    // authClient
    //   .put(`/api/v1/accounting/transaction?transactionId=${id}`, {
    //     name,
    //     amount: values?.amount.toString().replace(/\,/g, ''),
    //     accountType,
    //     paymentType,
    //     description,
    //     date,
    //     transactionType,
    //     customerName,
    //     customerId,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       handleDialogClose();
    //       setReload(!reload);
    //     }
    //   })
    //   .catch((e) => console.log(e));
  };

  useEffect(() => {
    // authClient
    //   .get(`/api/v1/accounting/transaction?transactionId=${id}`)
    //   .then(({ data }) => {
    //     const {
    //       recipient,
    //       amount,
    //       description,
    //       paymentType,
    //       date,
    //       accountType,
    //     } = data?.data;
    //     const { name, id } = recipient;
    //     setValues({
    //       ...values,
    //       customerId: id,
    //       customerName: name,
    //       amount: amount.toLocaleString(),
    //       description,
    //       date,
    //       paymentType,
    //       accountType,
    //     });
    //   })
    // .catch((e) => console.log(e));
  }, []);

  return (
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
        Edit Transaction
      </DialogTitle>
      <DialogContent dividers>
        <>
          <div
            style={{
              display: matchesXs ? 'block' : 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: '1rem 2rem',
            }}>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Date:
                <span className={classes.required}>*</span>
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <MaterialDatePicker
                fontItalic
                notched
                value={values.date}
                handleDateChange={handleDateChange}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Customer:
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputForEmployeePage
                style={{
                  fontStyle: 'italic',
                }}
                placeholder="Search Customer"
                fullWidth
                disabled
                value={values.customerName}
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
                onChange={handleInputChange('customerName')}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Amount Received:
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
            <div
              className={classes.formFieldWrapper}
              style={{ alignItems: 'flex-start' }}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Account:
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Select
                value={values.accountType.category}
                fullWidth
                size="small"
                variant="outlined"
                classes={{
                  select: classes.select,
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
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Payment Type:
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Select
                value={values.paymentType}
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
                  <TypographyBold>Payment Types</TypographyBold>
                </div>
                {paymentType.map((child, idx) => (
                  <MenuItem
                    style={{ padding: '.2rem 2rem' }}
                    key={idx}
                    value={child}>
                    <TypographyH5 style={{ fontSize: 15 }}>
                      {child}
                    </TypographyH5>
                  </MenuItem>
                ))}
              </Select>
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
                value={values.description}
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
            <PrimaryButton style={{ margin: '.5rem' }} onClick={handleSubmit}>
              Save
            </PrimaryButton>
            <DefaultButton
              style={{ margin: '.5rem' }}
              onClick={handleDialogClose}>
              Cancel
            </DefaultButton>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
