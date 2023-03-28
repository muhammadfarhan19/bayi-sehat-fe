import React from 'react';
import { Bar } from 'react-chartjs-2';

import { StatisticAPI } from '../../constants/APIUrls';
import { GetStatisticReq, StatisticData, StatisticMultipleBarChartData } from '../../types/api/StatisticAPI';
import useCommonApi from '../shared/hooks/useCommonApi';

type Props = {
  dateNowStr: string;
  id: number;
  title: string;
};

interface ItemData {
  label: string;
  data: string[];
  backgroundColor: string;
}

function StackGraph(props: Props) {
  const { title, id, dateNowStr } = props;
  const [datasets, setDatasets] = React.useState<ItemData[]>();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const color = [
    {
      id: 3,
      color: '#4F46E5',
    },
    {
      id: 9,
      color: '#F472B6',
    },
    {
      id: 10,
      color: '#10B981',
    },
    {
      id: 11,
      color: '#FCD34D',
    },
    {
      id: 12,
      color: '#A855F7',
    },
    {
      id: 95,
      color: '#EF4444',
    },
  ];

  const { data: dataStatistic } = useCommonApi<GetStatisticReq, StatisticData>(
    StatisticAPI.GET_STATISTIC_FIND,
    { id: id, date: dateNowStr },
    { method: 'get' }
  );

  const barChartsData = dataStatistic?.data?.data as Partial<StatisticMultipleBarChartData>;

  const createDatasets = () => {
    (barChartsData?.multiple_bar_charts || []).map(each => {
      if (each.unit_kerja_id !== 0) {
        setDatasets(prev => [
          ...(prev || []),
          {
            label: each.chart_title,
            data: each?.chart_data?.map(item => item.y_axis),
            backgroundColor: color?.find(item => item.id === each?.unit_kerja_id)?.color || '-',
          },
        ]);
      }
    });
  };

  React.useEffect(() => {
    if (barChartsData?.multiple_bar_charts?.length) {
      createDatasets();
    }
  }, [barChartsData]);

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">{title}</h3>
            <Bar
              // @ts-ignore
              options={options}
              data={{
                labels: barChartsData?.multiple_bar_charts?.[0]?.chart_data?.map(item => item.x_axis),
                datasets: datasets || [],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default StackGraph;
