import { TypographyH5 } from 'modules/components/Typography/Typography';
import ChartHeader from '../CashFlow/components/ChartHeader';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles((theme) => ({
  overViewContent: {
    display: 'flex',
    alignItems: 'center',
    margin: '.7rem 0',
  },
}));

const dashboardData = [
  { name: 'Group C', value: 10 },
  { name: 'Group B', value: 30 },
  { name: 'Group A', value: 60 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#F2C94C', '#EB5757', '#00DC7D'];

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
      textAnchor="middle"
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#F2C94C"
      />
    </g>
  );
};

const InventoryChart = ({ dashboard }) => {
  const [state, setState] = useState({
    activeIndex: 0,
  });
  //   const [chart, setChart] = useState(data?.chart);
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <PieChart width={matchesXs ? 300 : 330} height={matchesXs ? 384 : 328}>
      <Pie
        activeIndex={state.activeIndex}
        activeShape={renderActiveShape}
        data={dashboardData}
        cx="150"
        cy="150"
        innerRadius={70}
        fill="#EB5757"
        label={renderCustomizedLabel}
        labelLine={false}
        dataKey="value"
        // onMouseEnter={onPieEnter}
      >
        {dashboardData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    // </ResponsiveContainer>
  );
};

const DataFormatter = (number) =>
  number > 1000000000
    ? (number / 1000000000).toString() + 'B'
    : number >= 1000000
    ? (number / 1000000).toString() + 'M'
    : number > 1000
    ? (number / 1000).toString() + 'K'
    : number.toString();

export default function IncomeAndExpenses({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <ChartHeader
        heading="Invoice Analytics"
        subHeading="See your invoice properties in a one glance graphical representation"
        link
      />
      <section style={{ overflowX: 'auto', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: matchesXs && 'wrap',
            minWidth: 650,
          }}>
          <div style={{ height: 'auto', marginRight: 16 }}>
            <InventoryChart dashboard />
          </div>
          <div
            style={{
              margin: '2.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <div className={classes.overViewContent}>
              <span
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  background: '#00DC7D',
                  marginRight: '15px',
                }}></span>
              <TypographyH5>Paid Invoice- NGN1,000,000.00</TypographyH5>
            </div>
            <div className={classes.overViewContent}>
              <span
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  background: '#EB5757',
                  marginRight: '15px',
                }}></span>
              <TypographyH5>Unpaid Invoice- NGN400,000.00</TypographyH5>
            </div>
            <div className={classes.overViewContent}>
              <span
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  background: '#F2C94C',
                  marginRight: '15px',
                }}></span>
              <TypographyH5>Draft Invoice- NGN50,000.00</TypographyH5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
