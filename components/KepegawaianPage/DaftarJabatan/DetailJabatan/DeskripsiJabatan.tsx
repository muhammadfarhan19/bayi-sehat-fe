import React from 'react';

import { JabatanAPI } from '../../../../constants/APIUrls';
import { GetJabatanDetailReq, GetJabatanDetailRes, JabatanDetailData } from '../../../../types/api/JabatanAPI';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import Loader from '../../../shared/Loader/Loader';

function DeskripsiJabatan() {
  const [detailJabatan, setDetailJabatan] = React.useState<JabatanDetailData>();
  const [throwError, setThrowError] = React.useState<string>();
  const { id } = getQueryString<{ id: string }>();

  React.useEffect(() => {
    (async () => {
      const jabatanDetailRes = await callAPI<GetJabatanDetailReq, GetJabatanDetailRes>(
        JabatanAPI.GET_JABATAN_DETAIL,
        { id: Number(id) },
        { method: 'get' }
      );

      if (jabatanDetailRes.status === 200 && jabatanDetailRes.data?.data) {
        setDetailJabatan(jabatanDetailRes.data?.data);
      } else {
        setThrowError('Data not found');
      }
    })();
  }, []);

  if (throwError) {
    throw throwError;
  }

  if (!detailJabatan) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: 'Nama Jabatan', value: detailJabatan.name },
            { label: 'Kelas', value: detailJabatan.kelas_jabatan },
            { label: 'Tipe Jabatan', value: detailJabatan.jenis_jabatan_str },
          ].map((each, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default withErrorBoundary(DeskripsiJabatan);
