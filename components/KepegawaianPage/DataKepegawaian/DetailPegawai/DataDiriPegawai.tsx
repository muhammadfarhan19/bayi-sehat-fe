import React from 'react';

import { UserAPI } from '../../../../constants/APIUrls';
import { ContentResource } from '../../../../constants/Resource';
import { Status, StatusMenikah } from '../../../../types/Common';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiRes,
  GetUserProfileData,
  GetUserProfileRes,
} from '../../../../types/UserAPI';
import { callAPI } from '../../../../utils/Fetchers';
import Loader from '../../../shared/Loader/Loader';

type DataPersonal = Partial<GetUserProfileData & GetUserPersonalPegawaiData>;

export default function DataDiriPegawai() {
  const [dataPersonal, setDataPersonal] = React.useState<DataPersonal>({});

  React.useEffect(() => {
    (async () => {
      await Promise.all([
        callAPI<never, GetUserProfileRes>(UserAPI.GET_USER_PROFILE, {}, { method: 'GET' }),
        callAPI<never, GetUserPersonalPegawaiRes>(UserAPI.GET_USER_PERSONAL_PEGAWAI, {}, { method: 'GET' }),
      ]).then(res => {
        let dataPersonalRes = {};
        if (res[0].status === 200 && res[0].data && res[0].data.status === Status.OK) {
          dataPersonalRes = { ...dataPersonalRes, ...res[0].data.data };
        }
        if (res[1].status === 200 && res[1].data && res[1].data.status === Status.OK) {
          dataPersonalRes = { ...dataPersonalRes, ...res[1].data.data };
        }
        setDataPersonal(dataPersonalRes);
      });
    })();
  }, []);

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
            { label: 'Karpeg', value: '?' },
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
