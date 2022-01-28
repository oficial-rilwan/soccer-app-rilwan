import {
  makeStyles,
  TextField,
  withStyles,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  Popover,
  Typography,
  Dialog,
} from '@material-ui/core';
import { lazy, useEffect, useState } from 'react';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { GridContainer, GridItem } from 'modules/components/Grid';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { ExpandMore, AddCircleOutline, Close } from '@material-ui/icons';
import InputField from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import Divider from '@material-ui/core/Divider';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { Redirect, useHistory } from 'react-router-dom';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import NewSelect from './components/NewSelect';
import { authClient } from 'modules/authentication/requestClient';
import { DialogTypography } from 'modules/components/Typography/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#FCFFFF',
    border: '.5px solid #DFDFDF',
    borderRadius: 3,
    margin: '1.5rem 0',
    padding: '1.4rem 1rem',
  },
  select: {
    padding: 13,
    backgroundColor: '#fff',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  totalBudgetBox: {
    background: '#F2F2F2',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    padding: '1rem',
    width: 480,
  },
  popOver: {
    width: '19rem',
    height: 'auto',
    padding: '.5rem',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%',
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '36rem',
    height: '36rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },
}));

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
    padding: '16px 65px 16px 16px',
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
}))(MuiDialogContent);

const fiscalYear = ['2021-2022', '2022-2023', '2023-2024'];
const duration = ['Monthly', 'Quarterly', 'Yearly'];

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#fff',
    color: '#000',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
    '& .Mui-disabled': {
      color: '#000',
      cursor: 'pointer',
    },
  },
})(TextField);

export default function Editudget({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [data, setData] = useState({
    fiscalYear: '',
    budgetPeriod: '',
    account: '',
    name: '',
    amount: '',
  });

  const [success, setSuccess] = useState(false);

  const handleItemClose = (name) => (value) => {
    setData({ ...data, [name]: value });
  };

  const handleInputChange = (name) => (e) => {
    const { value } = e.target;
    switch (name) {
      case 'amount':
        setData({
          ...data,
          [name]: Number(value.replace(/,/g, '')).toLocaleString(),
        });
        break;
      default:
        setData({ ...data, [name]: value });
        break;
    }
  };
  const [redirect, setRedirect] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const handleDialogClose = () => {
    setData({
      ...data,
      name: '',
      account: '',
      fiscalYear: '',
      budgetPeriod: '',
      amount: '',
    });
    success && setRedirect(true);
    setSuccess(false);
  };

  const handleSubmit = () => {
    const { name, account, fiscalYear, budgetPeriod } = data;
    authClient
      .put(`/api/v1/accounting/budget/update?budgetId=${match?.params?.id}`, {
        name,
        amount: data?.amount?.replace(/\,/g, ''),
        account,
        fiscalYear,
        budgetPeriod,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            handleDialogClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    authClient
      .get(`/api/v1/accounting/budget/fetch?budgetId=${match.params?.id}`)
      .then(({ data }) => {
        console.log(data)
        const { name, amount, account, fiscalYear, budgetPeriod } = data?.data;
        setData({ ...data, name, amount, account, fiscalYear, budgetPeriod });
      })
      .catch((e) => console.log(e));
  }, [match.params.id]);

  useEffect(() => {
    authClient
      .get(`/api/v1/accounting/charts/accounts/fetch`)
      .then(({ data }) => setAccounts(data?.data))
      .catch((e) => console.log(e));
  }, []);

  if (redirect) {
    <Redirect to="/dashboard/budget" />;
  }

  return (
    <>
      <HeaderComp url="/dashboard/budget" />
      <ReturnBtn />
      <section className={classes.container}>
        <div>
          <Grid container spacing={2}>
            <GridItem xs={12} md={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1.5rem',
                }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}>
                    <TypographyH5>{'Fiscal Year'}</TypographyH5>
                    <span className={classes.required}>*</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 25,
                    }}>
                    <NewSelect
                      handleItemClose={handleItemClose('fiscalYear')}
                      menuItem={fiscalYear}
                      value={data.fiscalYear}
                      width="19rem"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}>
                    <TypographyH5>{'Budget Period'}</TypographyH5>
                    <span className={classes.required}>*</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 25,
                    }}>
                    <NewSelect
                      value={data.budgetPeriod}
                      menuItem={duration}
                      width="19rem"
                      handleItemClose={handleItemClose('budgetPeriod')}
                    />
                  </div>
                </div>
              </div>
            </GridItem>
            <GridItem
              xs={12}
              md={6}
              style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className={classes.totalBudgetBox}>
                <TypographyH5>Total Budget Amount:</TypographyH5>
                <TypographyH5
                  style={{
                    margin: '.5rem 0',
                    color: '#878181',
                    fontSize: '1.4rem',
                    padding: '1rem 0 1.5rem 0',
                  }}>
                  {`NGN${data.amount ? data.amount : 0}.00`}
                </TypographyH5>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InfoOutlined
                    style={{ color: '#0F83EF', margin: '0 10px 0 0' }}
                  />
                  <TypographyH5 style={{ fontSize: 11.5, color: '#0F83EF' }}>
                    This is the amount calcuated from the various sub category
                    of your budget
                  </TypographyH5>
                </div>
              </div>
            </GridItem>
          </Grid>
          <div style={{ margin: '2rem 1rem' }}>
            <Divider />
          </div>
          <div style={{ margin: '2rem 1rem' }}>
            <p
              style={{
                fontFamily: 'Rubik',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '1.5rem',
                color: '#010A1B',
              }}>
              Budget Categories
            </p>
          </div>
          <GridContainer>
            <GridItem xs={12} md={4}>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <TypographyH5>Name</TypographyH5>
                  <span className={classes.required}>*</span>
                </div>
                <div
                  style={{
                    margin: '0 25px',
                  }}>
                  <CssTextField
                    placeholder=""
                    variant="outlined"
                    size="small"
                    value={data.name}
                    onChange={handleInputChange('name')}
                    style={{
                      width: matchesXs ? '100%' : '13rem',
                      margin: matchesXs ? '1rem 0' : 0,
                    }}
                  />
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} md={4}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <TypographyH5>Account</TypographyH5>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 25px',
                  }}>
                  <NewSelect
                    menuItem={accounts}
                    value={data.account}
                    account
                    width="15rem"
                    handleItemClose={handleItemClose('account')}
                  />
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} md={4}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <div style={{ marginRight: '10px' }}>
                  <TypographyH5>Amount</TypographyH5>
                </div>
                <InputField
                  placeholder="Enter amount"
                  naira={'NGN'}
                  size="small"
                  onChange={handleInputChange('amount')}
                  value={data.amount}
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </section>
      <div
        style={{
          display: 'flex',
          marginLeft: '10rem',
        }}>
        <PrimaryButton
          onClick={handleSubmit}
          style={{ marginRight: '1rem' }}
          variant="contained"
          color="primary">
          Save Budget
        </PrimaryButton>
        <DefaultButton onClick={() => history.push('/dashboard/budget')}>
          Cancel
        </DefaultButton>
      </div>
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={success}
        classes={{
          container: classes.dialogContainer,
          paper: classes.dialogPaper,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Edit Budget
        </DialogTitle>
        <DialogContent dividers style={{ padding: 0 }}>
          {
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Successful</DialogTypography>
            </div>
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
