import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface PieChartDataInterface {
  data: {
    month: string
    weight: number
  }[]
}

const LineChartComponent = ({ data }: PieChartDataInterface) => {
  return (
    <div className="max-h-[400px] max-w-full rounded-lg bg-white pt-3 shadow-lg">
      <LineChart width={1000} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  )
}
export default LineChartComponent
