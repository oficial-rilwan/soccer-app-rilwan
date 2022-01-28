import { lazy } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ChartHeader = lazy(() => import('./components/ChartHeader'));

const DataFormatter = (number) =>
  number > 1000000000
    ? (number / 1000000000).toString() + 'B'
    : number >= 1000000
    ? (number / 1000000).toString() + 'M'
    : number > 1000
    ? (number / 1000).toString() + 'K'
    : number.toString();

export default function CashFlow({ data }) {
  return (
    <>
      <ChartHeader
        heading="Cash Flow"
        subHeading="Cash coming in and going out of your business."
        link
        radio
        buttonActions={[{ label: 'All Account' }, { label: 'Month' }]}
      />
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <ResponsiveContainer width="100%" height={280} minWidth="600px">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid stroke="transparent" />
            <XAxis
              dataKey="name"
              fontFamily="Rubik"
              fontSize={12}
              dy={5}
              tickLine={false}
            />
            <YAxis
              tickFormatter={DataFormatter}
              fontFamily="Rubik"
              fontSize={12}
              dx={-10}
              tickLine={false}
              tickCount={101}
            />
            <Tooltip />
            <Bar
              dataKey="pv"
              fill="#336666"
              radius={[10, 10, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="uv"
              fill="#F2994A"
              radius={[10, 10, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
