import { ChevronLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import { RekapDinasAPI } from '../../../constants/APIUrls';
import { GetRekapReq, RekapData } from '../../../types/api/RekapDinasAPI';
import { formatStringDate } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';

interface CalendarProps {
  date: string;
}

function DetailCalendarPage(props: CalendarProps) {
  const { date } = props;
  const queryParams = getQueryString<{ unit_kerja_id: number }>();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loaded, setLoaded] = React.useState(false);
  const [filterState, setFilterState] = React.useState<GetRekapReq>({
    page: 1,
    per_page: 20,
    tgl_mulai: date,
    tipe: 'summary',
    unit_kerja_id: queryParams.unit_kerja_id || 0,
  });

  const {
    data: dataTable,
    isValidating,
    mutate,
  } = useCommonApi<GetRekapReq, RekapData>(RekapDinasAPI.GET_DINAS_LIST, filterState, { method: 'GET' });

  React.useEffect(() => {
    if (loaded) {
      mutate();
    }
    setLoaded(true);
  }, [filterState]);

  const changeFilterState = (inputState: Partial<GetRekapReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <Link href={'/kepegawaian/rekap-dinas'}>
          <span className="flex w-fit cursor-pointer flex-row items-center gap-x-2 py-6 px-6">
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Kembali</div>
          </span>
        </Link>
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">
              Daftar dinas tanggal {formatStringDate(date, 'dd MMMM yyyy')}
            </p>
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" sm:rounded-lg">
                  <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Surat Dinas
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Unit Kerja
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Tanggal Mulai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Tanggal Selesai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Jenis Dinas
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Isi Penugasan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dataTable?.list || []).map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {filterState.per_page * (filterState.page - 1) + (dataIdx + 1)}
                          </td>
                          <td
                            className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900 underline underline-offset-1"
                            onClick={() =>
                              (window.location.href = `/kepegawaian/rekap-dinas?dinas_id=${data.dinas_id}`)
                            }
                          >
                            {data.no_sp}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja_str}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_mulai}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_selesai}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.jenis_dinas}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.isi_penugasan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    onChange={value => {
                      changeFilterState({ page: value });
                    }}
                    totalData={dataTable ? dataTable?.pagination.total_data : 0}
                    perPage={filterState.per_page}
                    page={filterState.page}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailCalendarPage;
