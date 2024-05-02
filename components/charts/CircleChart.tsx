import { Chart as ChartJS } from 'chart.js/auto'
import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

// interface CircleChartProps {
//   data: string;
// }

const dataLabels = [
  {
    label: 'satu',
    value: 10,
  },
  {
    label: 'dua',
    value: 20,
  },
]

const revenueData = [
  {
    label: 'Januari',
    revenue: 100,
    cost: 200,
  },
  {
    label: 'Februari',
    revenue: 150,
    cost: 240,
  },
]

const CircleChart: React.FC = ({ data }: any) => {
  return (
    <Doughnut
      data={{
        labels: dataLabels.map(data => data.label),
        datasets: [
          {
            label: 'Circle',
            data: dataLabels.map(data => data.value),
            backgroundColor: ['rgb(45, 212, 191)', 'rgb(100, 200, 300)'],
            borderColor: ['rgb(45, 212, 191)', 'rgb(100, 200, 300)'],
          },
        ],
      }}
    />
  )
}

export default CircleChart
