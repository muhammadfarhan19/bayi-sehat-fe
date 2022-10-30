import { ActiveElement, Chart, ChartEvent } from 'chart.js';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { StatisticAPI } from '../../constants/APIUrls';
import {
  GetStatisticReq,
  StatisticData,
  StatisticMultipleBarChart,
  StatisticMultipleBarChartData,
} from '../../types/api/StatisticAPI';
import { PegawaiType } from '../KepegawaianPage/DataKepegawaian/DetailPegawai/DetailPegawai';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';
import { QueryString, TypeChart } from './DashboardDetailPage';
import Selection from './Selection';

type Props = {
  bgColor: string;
  dateNowStr: string;
  id: number;
  label: string;
  title: string;
  typeChart: TypeChart;
  typePegawai: 'pns' | 'ppnpn';
  joinChart?: boolean;
  bgColorSecond?: string;
};

export const chartOptions = (props: {
  typePegawai: PegawaiType;
  typeChart: TypeChart;
  router: NextRouter;
  statistic?: StatisticMultipleBarChart;
}) => {
  const { typePegawai, typeChart, router, statistic } = props;

  return {
    responsive: true,
    onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
      console.log(event, elements);
      const label = chart.tooltip?.dataPoints?.[0]?.dataset?.label || '';
      const index = elements?.[0]?.index;
      const datasetIndex = elements?.[0]?.datasetIndex;

      const params = { detail: typeChart, typePegawai } as QueryString;
      if (typeChart === 'golongan') {
        params.golongan = statistic?.chart_data?.[index]?.x_axis || '';
        params.golonganId = statistic?.chart_data?.[index]?.golongan_id || '';
        params.unitKerjaId = String(statistic?.unit_kerja_id);
      } else if (typeChart === 'jenis_kelamin') {
        params.jenisKelamin = label === 'Pria' ? '1' : '2';
        params.unitKerjaId = statistic?.chart_data?.[index]?.info?.['unit_kerja_id'] || '';
        params.rangeUmur = statistic?.chart_data?.[index]?.x_axis;
      } else if (typeChart === 'jenis_belajar') {
        params.jenisBelajar = statistic?.chart_data?.[datasetIndex]?.info?.['jenis_belajar'] || '';
        params.unitKerjaId = statistic?.chart_data?.[datasetIndex]?.info?.['unit_kerja_id'] || '';
      } else if (typeChart === 'pendidikan') {
        params.jenjangId = statistic?.chart_data?.[index]?.info?.['jenjang_id'] || '';
        params.unitKerjaId = statistic?.chart_data?.[index]?.info?.['unit_kerja_id'] || '';
      }

      const mapParams: <T extends keyof QueryString>(key: T, index: number) => string = (key, index) => {
        return `${!index ? '?' : '&'}${key}=${encodeURIComponent(params[key] || '')}`;
      };

      router.push(
        '/kepegawaian' +
          Object.keys(params)
            .map((key, index) => mapParams(key as keyof QueryString, index))
            .join('')
      );
    },
  };
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
            <p className="text-sm font-light leading-8 text-gray-500">Grafik sebaran pegawai di {selectedUnit}</p>
            <Bar
              options={chartOptions({ typePegawai: props.typePegawai, typeChart: props.typeChart, router, statistic })}
              data={{
                labels: props.joinChart ? [props.label] : statistic?.chart_data?.map(item => item.x_axis),
                datasets: props.joinChart
                  ? (statistic?.chart_data || []).map((item, idx) => ({
                      label: item.x_axis || '',
                      data: [item.y_axis || ''],
                      backgroundColor: idx % 2 === 0 ? props.bgColor : props.bgColorSecond,
                    }))
                  : [
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
