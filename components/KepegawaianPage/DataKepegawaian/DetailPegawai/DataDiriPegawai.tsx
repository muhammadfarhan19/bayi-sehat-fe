import React from 'react';

import { UserAPI } from '../../../../constants/APIUrls';
import { ContentResource } from '../../../../constants/Resource';
import { Status, StatusMenikah } from '../../../../types/Common';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiReq,
  GetUserPersonalPegawaiRes,
  GetUserProfileData,
  GetUserProfileReq,
  GetUserProfileRes,
} from '../../../../types/UserAPI';
import { callAPI, callAPIParallel } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../hocs/ErrorBoundary';
import Loader from '../../../shared/Loader/Loader';

type DataPersonal = Partial<GetUserProfileData & GetUserPersonalPegawaiData>;

function DataDiriPegawai() {
  const { userId } = getQueryString<{ userId?: number }>();
  const [throwError, setThrowError] = React.useState<string>(null);
  const [dataPersonal, setDataPersonal] = React.useState<DataPersonal>({});

  React.useEffect(() => {
    (async () => {
      const apiReq = userId ? { user_id: userId } : null;
      await callAPIParallel([
        callAPI<GetUserProfileReq, GetUserProfileRes>(UserAPI.GET_USER_PROFILE, apiReq, { method: 'GET' }),
        callAPI<GetUserPersonalPegawaiReq, GetUserPersonalPegawaiRes>(UserAPI.GET_USER_PERSONAL_PEGAWAI, apiReq, {
          method: 'GET',
        }),
      ]).then(res => {
        let dataPersonalRes = {};
        if (res[0].status === 200 && res[0].data && res[0].data.status === Status.OK) {
          dataPersonalRes = { ...dataPersonalRes, ...res[0].data.data };
        }
        if (res[1].status === 200 && res[1].data && res[1].data.status === Status.OK) {
          dataPersonalRes = { ...dataPersonalRes, ...res[1].data.data };
        }

        if (Object.keys(dataPersonalRes).length) {
          setDataPersonal(dataPersonalRes);
        } else {
          setThrowError('Failed to fetch the data');
        }
      });
    })();
  }, []);

  if (throwError) {
    throw throwError;
  }

  if (!Object.keys(dataPersonal).length) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: 'Unit Kerja', value: dataPersonal.unit_kerja },
            { label: 'NIP/NIP Lama', value: dataPersonal.nip },
            { label: 'Tempat, Tanggal Lahir', value: dataPersonal.tanggal_lahir },
            { label: 'TMT CPNS', value: dataPersonal.tmt_cpns },
            { label: 'Status CPNS/PNS', value: dataPersonal.status_cpns },
            { label: 'Jabatan', value: dataPersonal.jabatan },
            { label: 'Golongan', value: dataPersonal.golongan },
            { label: 'TMT Golongan', value: dataPersonal.tmt_golongan },
            { label: 'Pangkat', value: '?' },
            { label: 'Masa Kerja', value: '?' },
            { label: 'Status', value: ContentResource[StatusMenikah[dataPersonal.status_menikah]] },
            { label: 'Karpeg', value: dataPersonal.karpeg },
          ].map((each, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withErrorBoundary(DataDiriPegawai);
