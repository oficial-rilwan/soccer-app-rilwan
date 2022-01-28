import { useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 10 },
  { name: 'Group B', value: 10 },
  { name: 'Group C', value: 30 },
  { name: 'Group D', value: 40 },
  { name: 'Group E', value: 10 },
];

const dashboardData = [
  { name: 'Group A', value: 10 },
  { name: 'Group B', value: 10 },
  { name: 'Group C', value: 30 },
  { name: 'Group D', value: 40 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#F2C94C', '#EB5757', '#F2994A', '#00DC7D', '#336666'];

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
        fill="#6FCF97"
      />
    </g>
  );
};

export default function InventoryChart({ dashboard }) {
  const [state, setState] = useState({
    activeIndex: 0,
  });
  //   const [chart, setChart] = useState(data?.chart);
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <PieChart
      width={matchesXs ? 300 : 330}
      style={{ right: 23 }}
      height={matchesXs ? 384 : 328}>
      <Pie
        activeIndex={state.activeIndex}
        activeShape={renderActiveShape}
        data={dashboard ? dashboardData : data}
        cx="150"
        cy="150"
        innerRadius={78}
        fill="#EB5757"
        label={renderCustomizedLabel}
        labelLine={false}
        dataKey="value"
        // onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
