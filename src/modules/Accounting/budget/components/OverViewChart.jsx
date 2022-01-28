import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 60 },
//   { name: 'Group B', value: 40 },
// ];
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

export default function OverViewChart({ data }) {
  const [state, setState] = useState({
    activeIndex: 0,
  });
  const [chart, setChart] = useState(data?.chart);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={chart}
          cx="50%"
          cy="50%"
          innerRadius={40}
          fill="#EB5757"
          label={renderCustomizedLabel}
          labelLine={false}
          dataKey="value"
          // onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
