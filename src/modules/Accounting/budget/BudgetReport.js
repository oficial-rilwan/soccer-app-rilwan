import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { Add } from '@material-ui/icons';
import {
  useMediaQuery,
  useTheme,
  makeStyles,
  withStyles,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewSelect from './components/NewSelect';
import { GridContainer, GridItem } from 'modules/components/Grid';
import { Edit } from '@material-ui/icons';
import { Paper } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '100%',
  },
  container: {
    backgroundColor: '#FCFFFF',
    border: '.5px solid #DFDFDF',
    borderRadius: 3,
    margin: '1.5rem 0',
    padding: '1.4rem 1rem',
  },
  gridContainer: {
    height: '8rem',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: '.8rem',
    height: '100%',
    border: '1px solid #DFDFDF',
    borderRadius: 6,
  },
  advertising: {
    backgroundColor: '#F2994A',
    borderRadius: 9,
  },
  insurance: {
    backgroundColor: '#940CFE',
    borderRadius: 9,
  },
  maintenance: {
    backgroundColor: '#27AE60',
    borderRadius: 9,
  },
  cardHeading: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontSize: '.7rem',
    display: 'flex',
    color: '#000',
  },
  cardParagraph: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontSize: '1rem',
    display: 'flex',
    color: '#000',
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: '6px',
    display: 'flex',
    padding: '.7rem',

    marginBottom: '6px',
  },
  overviewCard: {
    margin: '.3rem 0',
    fontSize: '1.2rem',
    display: 'flex',
  },
  foodBar: {
    backgroundColor: '#0F83EF',
    borderRadius: 9,
  },
  overViewContent: {
    display: 'flex',
    alignItems: 'center',
    margin: '.9rem 0',
  },
  overView: {
    background: '#FFFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: '6px',
    display: 'flex',
    padding: '.7rem',
    marginBottom: '7px',
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
}))(LinearProgress);

export default function BudgetReport({ values }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [selectedDate, handleDateChange] = useState(new Date());
  const [budgetDate, setBudgetPeriod] = useState({
    fiscalYear: 'Fiscal Year',
    budgetPeriod: '',
  });

  const [amountLeft, setAmountLeft] = useState('');

  const [data, setData] = useState({
    fiscalYear: '',
    budgetPeriod: '',
    account: '',
    name: '',
    amount: '',
  });

  const fiscalYear = ['2021-2022', '2022-2023', '2023-2024'];

  let availableAmount = `NGN ${Number(
    values?.totalAllocatedBudgetCategoryAmount -
    values?.amountExpended,
  ).toLocaleString()}`
  let spentAmount = `NGN ${Number(values?.amountExpended).toLocaleString()}`

  const data2 = [
    {
      name: 'available',
      value: availableAmount,
    },
    { name: 'spent', value: spentAmount },
  ];

  const data1 = [
    { name: 'available', value: 20 },
    { name: 'spent', value: 100 },
  ];

  const handleItemClose = (name) => (value) => {
    setBudgetPeriod({ ...budgetDate, [name]: value });
  };

  //render chart label
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={'middle'}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const COLORS = ['#00C49F', '#EB5757'];
  return (
    <>
      <div
        style={{
          display: 'flex',
          margin: '2rem 1rem',
        }}>
        <div
          style={{
            width: '20%',
            marginRight: 'auto',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <Typography variant={'p'}>{'Select Fiscal Year'}</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <NewSelect
              handleItemClose={handleItemClose('fiscalYear')}
              menuItem={fiscalYear}
              value={budgetDate.fiscalYear}
              width="10rem"
            />
          </div>
          {/* <HireDateInput
            fullWidth
            size="medium"
            font
            handleDateChange={() => { }}
            helperText={''}
            value={''}
            error={false}
          /> */}
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              views={["year"]}
              label="Select Budget Year"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider> */}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            width: '',
          }}>
          <DefaultButton
            onClick={() => history.push('/dashboard/budget/view_report')}>
            View Report
          </DefaultButton>
          <PrimaryButton
            disableElevation
            style={{
              margin: matchesXs ? '10px 0' : '0 0 0 30px',
            }}
            endIcon={<Add />}
            onClick={() => history.push('/dashboard/budget/add')}>
            Set Up New Budget
          </PrimaryButton>
        </div>
      </div>
      <GridContainer>
        <GridItem xs={12} md={7}>
          <Paper className={classes.paper} elevation={0}>
            <TypographyBold>Overview</TypographyBold>
            <GridContainer
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <GridItem xs={12} md={6}>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#6FCF97',
                      marginRight: '12px',
                    }}></span>
                  <TypographyH5 style={{ margin: '0 0.2rem', fontSize: 15 }}>
                    Available
                  </TypographyH5>
                  -
                  <TypographyBold style={{ margin: '0 0.2rem', fontSize: 14 }}>
                    {`NGN ${Number(values?.available).toLocaleString()}`}
                  </TypographyBold>
                </div>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#EB5757',
                      marginRight: '12px',
                    }}></span>
                  <TypographyH5
                    style={{
                      margin: '0 0.2rem',
                      fontSize: 15,
                      marginLeft: '0rem',
                    }}>
                    Spent
                  </TypographyH5>
                  -
                  <TypographyBold
                    style={{
                      margin: '0 0.2rem',
                      fontSize: 14,
                    }}>
                    {`NGN ${Number(values?.amountExpended).toLocaleString()}`}
                  </TypographyBold>
                </div>
              </GridItem>
              <GridItem xs={12} md={6}>
                <div style={{ width: '90%', height: 160 }}>
                  <ResponsiveContainer style={{ marginTop: '0px' }}>
                    <PieChart width={500} height={300}>
                      <Pie
                        data={data1}
                        cx={120}
                        cy={200 / 3.5}
                        label={renderCustomizedLabel}
                        innerRadius={30}
                        outerRadius={60}
                        fill="none"
                        paddingAngle={5}
                        dataKey="value">
                        {data1.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* <OverViewChart data={values} /> */}
                </div>
              </GridItem>
            </GridContainer>
          </Paper>
        </GridItem>
        <GridItem xs={12} md={5}>
          <div className={classes.overView}>
            <div>
              <TypographyBold className={classes.overviewCard}>
                Total Budget Amount
              </TypographyBold>
              <TypographyH5 style={{ padding: '.5rem 0', color: '#00DC7D' }}>
                {`NGN ${Number(values?.totalBudgetAmount).toLocaleString()}`}
              </TypographyH5>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #DFDFDF',
              borderRadius: '6px',
              display: 'flex',
              padding: '.7rem',
            }}>
            <div>
              <TypographyBold className={classes.overviewCard}>
                Amount Expended
              </TypographyBold>
              <TypographyH5 style={{ padding: '.5rem 0', color: '#EB5757' }}>
                {`NGN ${Number(values?.amountExpended).toLocaleString()}`}
              </TypographyH5>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p
              style={{
                fontFamily: 'Rubik',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '24px',
                color: '#000000',
              }}>
              Budget Categories
            </p>
            <DefaultButton
              style={{
                height: '50px',
                margin: '1rem 0',
                borderRadius: '.3rem',
                borderColor: '#36454F',
              }}
              onClick={() => history.push('/dashboard/budget/category/add')}>
              Add Category
            </DefaultButton>
          </div>
        </GridItem>
        <GridItem xs={12} md={12} style={{ margin: '0rem' }}>
          <GridContainer>
            {values?.budgetCategoryPerFiscalYear.map((item, i) => (
              <GridItem xs={12} md={4} key={i}>
                <div className={classes.card}>
                  <div className={classes.cardContainer}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TypographyH5>{item.name}</TypographyH5>
                      <div
                        style={{
                          color: '#1F53D7',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          history.push(
                            `/dashboard/budget/edit/${item.budgetId}`,
                          )
                        }>
                        <TypographyH5
                          style={{ margin: '0 10px 0 0', fontSize: 14 }}>
                          Edit
                        </TypographyH5>
                        <Edit style={{ fontSize: 17 }} />
                      </div>
                    </div>
                    <p className={classes.cardParagraph}>
                      {`NGN ${Number(item?.amount).toLocaleString()}`} /
                      {`NGN ${Number(
                        values?.amountSpentPerCategoryPerFiscalYear.filter(
                          (value) =>
                            value.debitAccountType.name === item.account,
                        )[0]?.amount,
                      ).toLocaleString()}`}
                    </p>
                    <div>
                      <BorderLinearProgress
                        fullWidth
                        classes={{ bar: classes.advertising }}
                        variant="determinate"
                        value={50}
                      />
                    </div>
                  </div>
                </div>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
}
