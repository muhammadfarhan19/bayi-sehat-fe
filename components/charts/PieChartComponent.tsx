import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

interface PieChartLabels {
  cx: any
  cy: any
  midAngle: any
  innerRadius: any
  outerRadius: any
  percent: any
  index: any
}

interface DataChartTypes {
  name: string
  value: number
  color: string
}

const data = [
  { name: 'Severely Underweight', value: 900 },
  { name: 'Underweight', value: 200 },
  { name: 'Normal', value: 300 },
  { name: 'Overweight', value: 300 },
]

const COLORS = ['#EF4444', '#eab308', '#0088FE', '#f97316']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: PieChartLabels) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const PieChartComponent = ({ data }: { data: DataChartTypes[] }) => {
  return (
    <ResponsiveContainer width="50%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          // fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
