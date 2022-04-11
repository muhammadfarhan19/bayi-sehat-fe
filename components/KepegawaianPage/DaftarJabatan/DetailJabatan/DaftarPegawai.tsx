import React from 'react';

import { KepegawaianAPI } from '../../../../constants/APIUrls';
import { GetPegawaiListData, GetPegawaiListReq, GetPegawaiListRes } from '../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import Loader from '../../../shared/Loader/Loader';
import Pagination from '../../../shared/Pagination';

const PER_PAGE = 20;

function DaftarPegawai() {
  const { name } = getQueryString<{ id: string; name: string }>();

  const [throwError, setThrowError] = React.useState<string>();
  const [loaded, setLoaded] = React.useState(false);
  const [dataTable, setDataTable] = React.useState<GetPegawaiListData>();

  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    refreshDataTable();
  }, []);

  const handlePageChange = (value: number) => {
    setPageNumber(value);
    refreshDataTable();
  };

  const refreshDataTable = () => {
    setLoaded(false);

    callAPI<GetPegawaiListReq | null, GetPegawaiListRes>(
      KepegawaianAPI.GET_PEGAWAI_LIST,
      {
        jabatan: name,
        per_page: PER_PAGE,
        page: pageNumber,
      },
      {
        method: 'GET',
      }
    ).then(res => {
      if (res.status === 200 && res.data && res.data.status === Status.OK) {
        const apiRes = res.data.data;
        if (Object.keys(apiRes).length) {
          setDataTable(apiRes);
          setLoaded(true);
        } else {
          setThrowError('Data not found');
        }
      }
    });
  };

  if (throwError) {
    throw throwError;
  }

  return (
    <>
      <div className="px-6"></div>
      {!loaded ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="flex">
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="overflow-hidden sm:rounded-lg">
                <table className="w-full table-fixed rounded-lg bg-gray-100">
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
                        NIP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nama
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
                        Golongan
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
                          {PER_PAGE * (pageNumber - 1) + (dataIdx + 1)}
                        </td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">{data.nip}</td>
                        <td className="px-6 text-xs font-medium text-gray-900">{data.name}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.golongan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  onChange={handlePageChange}
                  totalData={dataTable ? dataTable.pagination.total_data : 0}
                  perPage={PER_PAGE}
                  page={pageNumber}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withErrorBoundary(DaftarPegawai);
