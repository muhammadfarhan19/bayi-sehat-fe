import { ActiveElement, Chart, ChartEvent } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { StatisticAPI } from '../../constants/APIUrls';
import { GetStatisticReq, StatisticData, StatisticMultipleBarChartData } from '../../types/api/StatisticAPI';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';
import { TypeChart } from './DashboardDetailPage';
import Selection from './Selection';

type Props = {
  bgColor: string;
  dateNowStr: string;
  id: number;
  label: string;
  subTitle: string;
  title: string;
  typeChart: TypeChart;
};

function Graph(props: Props) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [uniqueList, setUniqueList] = useState<string[]>([]);
  const [selectedUnit, setSelectedUnit] = useState('');

  const { data: dataStatistic, isValidating } = useCommonApi<GetStatisticReq, StatisticData>(
    StatisticAPI.GET_STATISTIC_FIND,
    {
      id: props.id,
      date: props.dateNowStr,
    },
    { method: 'get' }
  );

  const barChartsData = dataStatistic?.data?.data as Partial<StatisticMultipleBarChartData>;
  React.useEffect(() => {
    if (!isValidating && barChartsData?.multiple_bar_charts) {
      const listTitle = Array.from(new Set((barChartsData.multiple_bar_charts || []).map(item => item['chart_title'])));
      if (listTitle.length) {
        setSelectedUnit(listTitle[0]);
        setUniqueList(listTitle);
      }
    }
    setLoaded(true);
  }, [isValidating]);

  if (!loaded) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  if (!barChartsData) {
    return null;
  }

  const chartOptions = {
    responsive: true,
    onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
      const title = (chart.tooltip?.title || []).join('');
      const label = chart.tooltip?.dataPoints?.[0]?.dataset?.label;
      const queryString = [
        'detail=',
        encodeURIComponent(props.typeChart),
        '&title=',
        encodeURIComponent(title),
        '&label=',
        encodeURIComponent(String(label || '')),
        '&unitKerja=',
        encodeURIComponent(selectedUnit),
      ];

      router.push('/kepegawaian?' + queryString.join(''));
    },
  };

  const statistic = barChartsData?.multiple_bar_charts?.find(item => item.chart_title === selectedUnit);

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">{props.title}</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Selection onChange={setSelectedUnit} options={uniqueList || []} value={selectedUnit} />
            </div>
            <p className="text-sm font-light leading-8 text-gray-500">{props.subTitle}</p>
            <Bar
              options={chartOptions}
              data={{
                labels: statistic?.chart_data?.map(item => item.x_axis),
                datasets: [
                  {
                    label: props.label,
                    data: statistic?.chart_data?.map(item => item.y_axis),
                    backgroundColor: props.bgColor,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default withErrorBoundary<typeof Graph, Props>(Graph);
