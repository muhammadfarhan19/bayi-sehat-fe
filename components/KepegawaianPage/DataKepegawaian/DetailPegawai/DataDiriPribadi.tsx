import React from 'react';

import { UserAPI } from '../../../../constants/APIUrls';
import { Status } from '../../../../types/Common';
import { GetUserProfileData, GetUserProfileReq, GetUserProfileRes } from '../../../../types/UserAPI';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import Loader from '../../../shared/Loader/Loader';

function DataDiriPribadi() {
  const { userId } = getQueryString<{ userId?: number }>();
  const [throwError, setThrowError] = React.useState<string>('');
  const [dataApiRes, setDataApiRes] = React.useState<GetUserProfileData>();

  React.useEffect(() => {
    (async () => {
      const apiReq = userId ? { user_id: userId } : null;
      callAPI<GetUserProfileReq | null, GetUserProfileRes>(UserAPI.GET_USER_PROFILE, apiReq, {
        method: 'GET',
      }).then(res => {
        if (res.status === 200 && res.data && res.data.status === Status.OK) {
          const userPersonalPegawaiRes = res.data.data;
          if (Object.keys(userPersonalPegawaiRes).length) {
            setDataApiRes(userPersonalPegawaiRes);
          } else {
            setThrowError('Failed to fetch the data');
          }
        }
      });
    })();
  }, []);

  if (throwError) {
    throw throwError;
  }

  if (!dataApiRes) {
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
            { label: 'Jenis Kelamin', value: dataApiRes.jenis_kelamin },
            { label: 'Status Nikah', value: dataApiRes.status_menikah },
            { label: 'Jumlah Anak', value: dataApiRes.jumlah_anak },
            { label: 'KTP', value: dataApiRes.ktp },
            { label: 'Email', value: dataApiRes.email },
            { label: 'Alamat', value: dataApiRes.alamat },
            { label: 'NPWP', value: dataApiRes.npwp },
            { label: 'BPJS', value: dataApiRes.bpjs },
          ].map((each, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default withErrorBoundary<typeof DataDiriPribadi, unknown>(DataDiriPribadi);
