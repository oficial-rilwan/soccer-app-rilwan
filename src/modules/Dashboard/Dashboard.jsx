import {
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CallMade } from '@material-ui/icons';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { ReactComponent as Payment } from 'lib/assets/icons/payment.svg';
import { data, expenseData } from './mock';
import { lazy, useState } from 'react';
import { Suspense } from 'react';
import { LoaderComponent } from 'lib/components/Loaders/Loaders';
import Card from './components/Card';
import ExpenseContainer from './components/ExpenseContainer';
import BankAndCards from './components/BankAndCredit/BankAndCredit';
import EmployeesContainer from './components/EmployeeContainer';

// Images
import EmptyImg1 from '../../lib/assets/images/empty-state-1.png';
import EmptyImg2 from '../../lib/assets/images/empty-state-2.png';
import EmptyImg3 from '../../lib/assets/images/empty-state-3.png';
import EmptyImg4 from '../../lib/assets/images/empty-state-4.png';
import EmptyBackgouund from '../../lib/assets/images/Background.png';
// //////

const TaxCard = lazy(() => import('./components/TaxCard'));
const CashFlow = lazy(() => import('./components/CashFlow/CashFlow'));
const IncomeAndExpenses = lazy(() =>
  import('./components/IncomeAndExpenses/IncomeAndExpenses'),
);

const useStyles = makeStyles((theme) => ({
  actionsBtn: {
    width: '10rem',
    margin: '0 .5rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '.5rem 0',
    },
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      gap: '1.5rem',
      flexDirection: 'column-reverse',
    },
  },
  expenseCard: {
    background: '#F5F5F5',
    width: '100%',
    padding: '20px 18px 8px',
    boxShadow: '0px 1.57539px 2.36309px rgba(13, 13, 13, 0.33)',
    borderRadius: 5,
  },
  container: {
    padding: '2rem 0',
  },
  expenseCardTitle: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: 15,
  },
  expenseWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  expenses: {
    fontSize: 22,
    overflow: 'overlay',
  },
  expenseMonth: {
    fontSize: 14,
  },
  revenueIconBtn: {
    backgroundColor: '#ECFCE1',
    '&:hover': {
      backgroundColor: '#ECFCE1',
    },
  },
  revenueIcon: {
    color: '#219653',
  },
  expenseIconBtn: {
    backgroundColor: '#FCE1E1',
    '&:hover': {
      backgroundColor: '#FCE1E1',
    },
  },
  expenseIcon: {
    color: '#EB5757',
    transform: 'rotate(90deg)',
  },
  cashIcon: {
    backgroundColor: '#D2D7FF',
    '&:hover': {
      backgroundColor: '#D2D7FF',
    },
  },
  paper: {
    background: '#FCFFFF',
    border: '0.5px solid #DFDFDF',
    height: '100%',
  },
  section: {
    padding: '0 .6rem',
    [theme.breakpoints.between(375, 566)]: {
      padding: '0 1.4rem',
    },
  },
  primaryProgress: {
    backgroundColor: '#1F53D7',
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: '#EBEBEB',
    height: '14px',
    borderRadius: '15px',
    width: '68%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  progressLabel: {
    width: '35px',
    position: 'relative',
    bottom: '15px',
    left: '34%',
    [theme.breakpoints.down('sm')]: {
      left: '50%',
    },
    fontSize: 12,
  },
}));

const expense = [
  {
    title: 'Revenue',
    amount: 1000,
    duration: 'Last Month',
  },
  {
    title: 'Expenses',
    amount: 0.0,
    duration: 'Last Month',
  },
  {
    title: 'Cash at hand',
    amount: 0.0,
    duration: 'Last Month',
  },
];

const tax = [
  // {
  //   taxType: 'PAYE',
  //   taxDuration: 'January',
  //   taxAmount: '250,000',
  //   month: '20 January 2021',
  //   status: 'paid',
  // },
  // {
  //   taxType: 'Withholding Tax',
  //   taxDuration: 'Feburary',
  //   taxAmount: '124,000',
  //   month: '15 Feburary 2021',
  //   status: 'unpaid',
  // },
];

const upcomingExpenses = [
  {
    expense: 'Power Bills',
    company: 'Eko Distribution',
    amount: '100,000',
    date: '5th Apr,2021',
  },
  {
    expense: 'Internet Services',
    company: 'Smile Communications',
    amount: '10,000',
    date: '3rd Apr,2021',
  },
  {
    expense: 'Cleaning Services',
    company: 'Androne Ent.',
    amount: '100,000',
    date: '5th Dec,2020',
  },
  {
    expense: 'Catering Services',
    company: 'Commit Buka',
    amount: '100,000',
    date: '5th Apr,2020',
  },
];

const invoicesData = [
  {
    personnel: 'Mr Olayika',
    company: 'S&M Holdings',
    amount: '100,000',
    date: '5th Dec,2020',
  },
  {
    personnel: 'Mr Olayika',
    company: 'S&M Holdings',
    amount: '100,000',
    date: '5th Dec,2020',
  },
  {
    personnel: 'Mr Olayika',
    company: 'S&M Holdings',
    amount: '100,000',
    date: '5th Dec,2020',
  },
  {
    personnel: 'Mr Olayika',
    company: 'S&M Holdings',
    amount: '100,000',
    date: '5th Dec,2020',
  },
];

const bankDetails = [
  {
    bankName: 'Guarantee Trust Bank',
    savings: '1,000,000',
    current: '500,000',
  },
  {
    bankName: 'Zenith Bank',
    savings: '1,000,000',
    current: '500,000',
  },
];

const formatToCurrency = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export default function DashBoard() {
  const classes = useStyles();
  const [value, setValues] = useState(56);
  return (
    <>
      <HeaderComp url="/dashboard/dashboard" />
      <section className={classes.section}>
        <div className={classes.btnWrapper}>
          <DefaultButton
            endIcon={<KeyboardArrowDown />}
            className={classes.actionsBtn}>
            Invite
          </DefaultButton>
          <PrimaryButton
            endIcon={<KeyboardArrowDown />}
            className={classes.actionsBtn}>
            Create New
          </PrimaryButton>
        </div>
        <Grid container className={classes.container} spacing={3}>
          {expense.map(({ title, amount, duration }, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Paper
                className={classes.expenseCard}
                style={{
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
                }}
                elevation={0}>
                <div>
                  <Typography variant="h6" className={classes.expenseCardTitle}>
                    {title}
                  </Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '0 0 .5rem',
                  }}>
                  <IconButton
                    className={
                      title == 'Revenue'
                        ? classes.revenueIconBtn
                        : title == 'Expenses'
                        ? classes.expenseIconBtn
                        : classes.cashIcon
                    }>
                    {title == 'Revenue' || title == 'Expenses' ? (
                      <CallMade
                        className={
                          title == 'Revenue'
                            ? classes.revenueIcon
                            : title == 'Expenses'
                            ? classes.expenseIcon
                            : classes.cashIcon
                        }
                      />
                    ) : (
                      <SvgIcon>
                        <Payment />
                      </SvgIcon>
                    )}
                  </IconButton>
                </div>
                <div className={classes.expenseWrapper}>
                  <TypographyBold className={classes.expenses}>
                    {amount === 0
                      ? `NGN 0.00`
                      : `NGN ${formatToCurrency(amount)}`}
                  </TypographyBold>
                  <TypographyH5 variant="h6" className={classes.expenseMonth}>
                    {duration}
                  </TypographyH5>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card title="Due Tax" linkText="View All">
              {tax.length <= 0 ? (
                <div>
                  <img src={EmptyImg1} alt="Tax is empty" />
                  <img src={EmptyBackgouund} alt="Tax is empty" />
                </div>
              ) : (
                <>
                  {tax.map((item, i) => (
                    <Suspense key={i} fallback={<LoaderComponent />}>
                      <TaxCard {...item} />
                    </Suspense>
                  ))}
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={8}>
            <Paper className={classes.paper} elevation={0}>
              <Suspense fallback={<LoaderComponent />}>
                <CashFlow data={data} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              title="Amount Payable"
              linkText="View All"
              subText="Upcoming Expenses">
              {upcomingExpenses.map(({ expense, company, amount, date }, i) => (
                <ExpenseContainer
                  title={expense}
                  company={company}
                  amount={amount}
                  date={date}
                  key={i}
                />
              ))}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Paper className={classes.paper} elevation={0}>
              <Suspense fallback={<LoaderComponent />}>
                <IncomeAndExpenses data={expenseData} />
              </Suspense>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              title="Overdue Invoices"
              linkText="View All"
              subText="6 overdue invoices">
              {invoicesData.map(({ personnel, company, amount, date }, i) => (
                <ExpenseContainer
                  title={personnel}
                  company={company}
                  amount={amount}
                  date={date}
                  key={i}
                />
              ))}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <BankAndCards data={bankDetails} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              title="Employees"
              linkText="View All"
              status
              link="/dashboard/employees">
              <EmployeesContainer />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Card title="Estimated Budget" style={{ height: 'auto' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '2rem 0px 1rem',
                  alignItems: 'center',
                  overflowX: 'auto',
                }}>
                <TypographyBold
                  variant="h5"
                  style={{
                    fontSize: 22,
                    margin: '0 .5rem 0 0',
                    color: '#27AE60',
                  }}>
                  N2,500,000.00
                </TypographyBold>
                <TypographyH5 variant="h5" style={{ fontSize: 19 }}>
                  of
                </TypographyH5>
                <TypographyBold
                  variant="h5"
                  style={{ fontSize: 22, margin: '0 .5rem' }}>
                  N7,500,000.00
                </TypographyBold>
              </div>
              <div style={{ color: value > 50 ? '#fff' : '#000' }}>
                <LinearProgress
                  value={value}
                  color="primary"
                  variant="determinate"
                  classes={{
                    barColorPrimary: classes.primaryProgress,
                    colorPrimary: classes.colorPrimary,
                  }}
                />
                <TypographyH5 className={classes.progressLabel}>
                  37%
                </TypographyH5>
              </div>
            </Card>
          </Grid>
        </Grid>
      </section>
    </>
  );
}
