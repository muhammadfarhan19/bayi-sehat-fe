import { ChevronLeftIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import React from 'react';

import { LogHarianAPI } from '../../constants/APIUrls';
import { GetLogHarianReqMonth, GetLogHarianWeekData } from '../../types/api/LogHarianAPI';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';

interface DetailLogHarianProps {
  onBack?: () => void;
  selectedYear: number;
  selectedMonth: number;
  pegawai_id?: number;
}

function DetailLogHarianWeek(props: DetailLogHarianProps) {
  const { onBack, selectedYear, selectedMonth, pegawai_id } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [week, setWeek] = React.useState<string>('1');

  const { data: logHarianData, isValidating } = useCommonApi<GetLogHarianReqMonth, GetLogHarianWeekData[]>(
    LogHarianAPI.GET_LOG_HARIAN_WEEK,
    { pegawai_id: Number(pegawai_id), year: Number(selectedYear), month: Number(selectedMonth) },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  const { data: loglog } = useCommonApi<any, any>(
    LogHarianAPI.GET_LOG_HARIAN_LIS_WEEK_V2,
    { pegawai_id: Number(pegawai_id), year: Number(selectedYear), month: Number(selectedMonth) },
    { method: 'GET' }
  );

  React.useEffect(() => {
    if (isValidating) {
      setIsLoading(true);
    }
  }, [isValidating]);

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
        <div className="mt-5 mb-2">
          <span className="text-xl font-[600]">Log Harian</span>
        </div>
        <div className="w-[202px] pb-2">
          <select
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={e => setWeek(e.target.value)}
          >
            <option value={'1'}>Minggu - 1</option>
            <option value={'2'}>Minggu - 2</option>
            <option value={'3'}>Minggu - 3</option>
            <option value={'4'}>Minggu - 4</option>
            <option value={'5'}>Minggu - 5</option>
          </select>
        </div>
        {isLoading && isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : loglog?.length === 0 || loglog === null ? (
          <div className="mt-5 border-t-2 pt-2 text-center text-[18px]">Log belum diisi oleh Pegawai</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead></thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.entries(loglog?.[`minggu ${week}`] || []).map((data: any, dataIdx) => (
                <tr className="" key={dataIdx}>
                  <td className="mr-20 flex flex-1 py-4 pl-6 text-[15px] text-sm font-bold text-[#000000]">
                    {format(new Date(data?.[0]), 'EEEE, dd MMMM', { locale: id })}
                  </td>
                  {data?.[1]?.length === 0 ? (
                    <td className="flex justify-center py-4 pl-6 text-sm font-medium text-[#6B7280]">
                      Log belum diisi oleh Pegawai
                    </td>
                  ) : (
                    (data?.[1] || [])?.map((item: { summary: any }, dataIdx: React.Key | null | undefined) => (
                      <td key={dataIdx} className="ml-20 list-item py-4 pl-6 text-sm font-medium text-[#6B7280]">
                        {item.summary}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DetailLogHarianWeek;
