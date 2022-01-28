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
import { GridContainer, GridItem } from 'modules/components/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ReactComponent as Attach_file } from 'lib/assets/icons/attach_file.svg';

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
  input: {
    display: 'none',
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
    fontSize: '12px',
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
  root: {},
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

const paymentType = [
  'Accounting Fee',
  'Advertisement and Promotion',
  'Hospital expenses',
  'Internet Exp',
  'Transport exp',
];

export const EditDialog = ({
  open,
  handleDialogClose,
  id,
  reload,
  setReload,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const [searchKeyword, setSearchKeyword] = useState(false);
  const [isTaxable, setTax] = useState('yes');
  const [imageName, setImageName] = useState('No Image');
  const [imageData, setImageData] = useState('');

  const [data, setData] = useState([]);

  const [values, setValues] = useState({
    date: '',
    dueDate: '',

    amount: '',
    accountType: {
      category: 'expenses',
      type: '',
    },
    description: '',
    paymentType: '',
    transactionType: 'outflow',
    customerName: '',
    customerId: '',
    name,
    tax: '',
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

  const handleReceiptChange = (e) => {
    let { files } = e.target;
    setImageName(files[0]?.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => setImageData(e.target.result);
  };

  const handleDateChange = (val, name) => {
    setValues({ ...values, [name]: val });
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
    const {
      name,
      accountType,
      date,
      dueDate,
      paymentType,
      description,
      transactionType,
      vendorName,
      vendorId,
      tax,
    } = values;
    authClient
      .put(`/api/v1/accounting/transaction?transactionId=${id}`, {
        name,
        amount: values?.amount.toString().replace(/\,/g, ''),
        accountType,
        date,
        dueDate,
        paymentType,
        description,
        transactionType,
        vendorName,
        vendorId,
        tax,
      })
      .then((res) => {
        if (res.status === 200) {
          handleDialogClose();
          setReload(!reload);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    authClient
      .get(`/api/v1/accounting/transaction?transactionId=${id}`)
      .then(({ data }) => {
        const {
          recipient,
          amount,
          description,
          paymentType,
          date,
          dueDate,
          tax,
          accountType,
          name,
        } = data?.data;

        setValues({
          ...values,
          customerId: recipient.id,
          customerName: recipient.name,
          amount: amount.toLocaleString(),
          name,
          description,
          date,
          dueDate,
          paymentType,
          accountType,
          tax,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Dialog
      fullScreen
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
        Edit Outflow
      </DialogTitle>
      <DialogContent dividers>
        <GridContainer>
          <GridItem xs={12} sm={9}>
            <div style={{ marginBottom: '10px' }}>
              <GridContainer>
                <GridItem xs={12} sm={6}>
                  <div style={{ marginLeft: '-30px' }}>
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
                          handleDateChange={(e) => handleDateChange(e, 'date')}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <GridContainer>
                    <GridItem
                      style={{ display: 'flex', alignItems: 'center' }}
                      xs={12}
                      sm={3}>
                      <TypographyH5 variant="h6" className={classes.formTitle}>
                        Due Date:
                        <span className={classes.required}>*</span>
                      </TypographyH5>
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                      <MaterialDatePicker
                        fontItalic
                        notched
                        value={values.dueDate}
                        handleDateChange={(e) => handleDateChange(e, 'dueDate')}
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
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
              {isTaxable == 'yes' && (
                <>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 variant="h6" className={classes.formTitle}>
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
                        <TypographyBold>Withholding Tax Rates</TypographyBold>
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
                    <TypographyBold>Expenses Account</TypographyBold>
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
                  multiline
                  onChange={handleInputChange('description')}
                  rows={3}
                  value={values.description}
                />
              </div>
            </div>
          </GridItem>

          <GridItem xs={12} sm={3}>
            <div style={{ marginLeft: '5px' }}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="logo"
                onChange={handleReceiptChange}
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
            </div>
          </GridItem>
        </GridContainer>
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
  );
};
