import {
  Dialog,
  IconButton,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import CloseIcon from '@material-ui/icons/Close';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';

const styles = (theme) => ({
  root: {
    margin: '12px 0 0 0',
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
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '50rem',
    height: '32rem',
    maxWidth: '60rem',
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
    margin: '0 0 11px',
    paddingLeft: 25,
    width: 160,
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
    width: '59%',
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
    padding: '16px',
  },
}))(MuiDialogContent);

const accountType = [
  {
    title: 'Assets',
    children: [
      'Cash and bank',
      'Expected Payments',
      'Inventory',
      'Vendor payment and credit',
      'Depreciation and amortisation',
      'Property, plant and equipment',
      'Other short term assets',
      'Other long term assets',
    ],
  },
  {
    title: 'Liabilities',
    children: [
      'Expected Payments to vendors',
      'Sales tax',
      'Due for payroll',
      'Loan and line of credit',
      'Other short term liabilities',
      'Other long term liabilities',
    ],
  },
  {
    title: 'Income',
    children: ['Income', 'Discount', 'Other income'],
  },
  {
    title: 'Expense',
    children: [
      ' Operating expense',
      'Cost of goods sold',
      'Payment processing fees',
      'Uncategorized expense',
    ],
  },
  {
    title: 'Equity',
    children: ['Owner investment and withdrawal', 'Retained earnings'],
  },
];

export default function ViewDetails({
  open,
  handleViewClose,
  setView,
  viewDetail,
  row,
  reload,
  setReload,
}) {
  const classes = useStyles();
  const theme = useTheme();
  //   const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [values, setValues] = useState({
    accountName: '',
    accountType: '',
    description: '',
  });

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

  useEffect(() => {
    row?.chartOfAccountsId &&
      authClient
        .get(
          `/api/v1/accounting/accounts?chartOfAccountsId=${row?.chartOfAccountsId}`,
        )
        .then(({ data }) => setValues({ ...values, ...data?.data }))
        .catch((e) => console.log(e));
  }, [row?.chartOfAccountsId]);

  const handleSelectChange = (e) => {
    let { value } = e.target;
    setValues({ ...values, tax: value });
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
    authClient
      .put(
        `/api/v1/accounting/charts/accounts/update?chartOfAccountsId=${row.chartOfAccountsId}`,
        values,
      )
      .then((res) => {
        if (res.status === 200) {
          setReload(!reload);
          handleViewClose();
        }
      })
      .catch((e) => console.log(e));
  };

  const clearRecord = () => {
    setValues({
      ...values,
      accountName: '',
      accountType: '',
      description: '',
    });
  };

  const handleDeactivate = () => {
    authClient
      .put(
        `api/v1/accounting/charts/accounts/deactivate/account?chartOfAccountsId=${row.chartOfAccountsId}&accountStatus=true`,
      )
      .then((res) => {
        if (res.status === 200) {
          handleViewClose();
          setReload(!reload);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog
      onClose={handleViewClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      classes={{
        container: classes.dialogContainer,
        paper: classes.dialogPaper,
      }}
      disableBackdropClick>
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => setView({ ...viewDetail, open: false })}>
        Account Details
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ display: 'flex', padding: '0 .5rem' }}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 30px',
              }}>
              <Typography variant="h6" className={classes.formTitle}>
                Account name:
                <span className={classes.required}>*</span>
              </Typography>
              <InputForEmployeePage
                style={{
                  fontStyle: 'italic',
                  backgroundColor: '#e0e0e0',
                }}
                placeholder="Enter here"
                disabled={true}
                size="small"
                onChange={handleInputChange('accountName')}
                value={values.accountName}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 30px',
              }}>
              <Typography variant="h6" className={classes.formTitle}>
                Account type:
              </Typography>
              <Select
                value={values?.accountType?.category}
                size="small"
                variant="outlined"
                disabled={row?.deactivateAccount}
                classes={{
                  select: classes.select,
                  paper: classes.selectRoot,
                }}
                onChange={handleChange}
                className={classes.selectInput}>
                {accountType.map((type, i) => {
                  return [
                    <ListSubheader key={i} disableSticky>
                      {type.title}
                    </ListSubheader>,
                    type.children.map((child, idx) => (
                      <MenuItem key={idx} value={child}>
                        {child}
                      </MenuItem>
                    )),
                  ];
                })}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 30px',
              }}>
              <Typography variant="h6" className={classes.formTitle}>
                Account code:
              </Typography>
              <InputForEmployeePage
                style={{
                  backgroundColor: '#E0E0E0',
                }}
                placeholder="1000-3"
                size="small"
                disabled={true}
                //   onChange={handleInputChange('accountName')}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Typography variant="h6" className={classes.formTitle}>
                Description:
              </Typography>
              <InputForEmployeePage
                placeholder="Enter description"
                size="small"
                disabled={row?.deactivateAccount}
                multiline
                onChange={handleInputChange('description')}
                value={values.description}
                rows={4}
              />
            </div>
          </div>

          <div
            style={{
              width: '22rem',
              backgroundColor: '#F2F2F2',
              borderRadius: '5px',
              border: '0.2px solid #878181',
              margin: '0 1.3rem',
            }}>
            <div
              style={{
                backgroundColor: '#EEF5FC',
                height: 88,
                padding: '1rem',
              }}>
              <TypographyH5 style={{ fontSize: 13 }}>
                Closing Balance
              </TypographyH5>
              <TypographyBold style={{ fontSize: 25, color: '#4E2D92' }}>
                NGN 0
              </TypographyBold>
            </div>
            <div>
              <ul>
                <li style={{ margin: '1rem 0' }}>
                  <TypographyH5>
                    This account is linked to your balance sheet in the reports
                    section.
                  </TypographyH5>
                </li>
                <li style={{ margin: '1rem 0' }}>
                  <TypographyH5>It is normally a debit acount.</TypographyH5>
                </li>
                <li style={{ margin: '1rem 0' }}>
                  <TypographyH5>It’s subgroup is Cash and Bank</TypographyH5>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            margin: '1.2rem 0px 0px 10rem',
            alignItems: 'center',
          }}>
          <PrimaryButton style={{ margin: '.5rem' }} onClick={handleSubmit}>
            Save
          </PrimaryButton>
          <DefaultButton style={{ margin: '.5rem' }} onClick={handleViewClose}>
            Cancel
          </DefaultButton>
          <DefaultButton
            onClick={handleDeactivate}
            style={{
              backgroundColor: 'rgba(40, 40, 40, 0.72',
              borderRadius: 4,
              color: '#fff',
              margin: '0 26px 0 auto',
              height: 40,
            }}>
            Make Inactive
          </DefaultButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
