import { ChevronLeftIcon } from '@heroicons/react/outline';
// import {format,parseISO} from 'date-fns';
// import id from 'date-fns/locale/id';
import React from 'react';

import { LogHarianAPI } from '../../constants/APIUrls';
import { GetLogHarianReqMonth, GetLogHarianWeekData } from '../../types/api/LogHarianAPI';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';
import { groupBy } from './isPegawaiLog/Shared/_calendar';

interface DetailLogHarianProps {
  onBack?: () => void;
  selectedYear: number;
  selectedMonth: number;
  pegawai_id?: number;
}

function DetailLogHarianWeek(props: DetailLogHarianProps) {
  const { onBack, selectedYear, selectedMonth, pegawai_id } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>();

  const { data: logHarianData, isValidating } = useCommonApi<GetLogHarianReqMonth, GetLogHarianWeekData[]>(
    LogHarianAPI.GET_LOG_HARIAN_WEEK,
    { pegawai_id: Number(pegawai_id), year: Number(selectedYear), month: Number(selectedMonth) },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (isValidating) {
      setIsLoading(true);
    }
  }, [isValidating]);

  const datas = groupBy(logHarianData || [], log => log?.log_date);

  const objectDateData = Object.keys(datas).toString();
  const dateConstructor = new Date(objectDateData);

  if (!pegawai_id && !selectedYear && !selectedMonth && !logHarianData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white px-6 py-6">
      <div className="my-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="bg-white tracking-wide text-gray-600">Kembali</span>
      </div>
      <div className="bg-white">
        <div className="mt-5 mb-5">
          <span className="text-xl font-[600]">Log Harian</span>
        </div>
        {isLoading && isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : logHarianData?.length === 0 || logHarianData === null ? (
          <div className="mt-5 border-t-2 pt-2 text-center text-[18px]">Log belum diisi oleh Pegawai</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead></thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="">
                <td className="mr-20 py-4 pl-6 text-sm font-medium text-[#6B7280]">
                  {dateConstructor?.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                {(logHarianData || []).map(data => {
                  return <td className="list-item px-6 py-4 text-sm text-gray-500">{data?.summary}</td>;
                })}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DetailLogHarianWeek;
