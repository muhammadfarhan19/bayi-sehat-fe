import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';

import { UserProfileAPI } from '../../../../constants/APIUrls';
import { GetPhotoProfileRes } from '../../../../types/api/ProfilePhotoAPI';
import { classNames } from '../../../../utils/Components';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import Loader from '../../../shared/Loader/Loader';
import ArsipDigital from './ArsipDigital';
import DataDiriPegawai from './DataDiriPegawai';
import DataDiriPribadi from './DataDiriPribadi';
import RiwayatBelajar from './RiwayatBelajar';
import RiwayatDiklat from './RiwayatDiklat';
import RiwayatGolongan from './RiwayatGolongan';
import RiwayatJabatan from './RiwayatJabatan';
import RiwayatKeluarga from './RiwayatKeluarga';
import RiwayatPendidikan from './RiwayatPendidikan';
import RiwayatPenghargaan from './RiwayatPenghargaan';

const tabs = [
  { name: 'Data Diri Pegawai', href: '#' },
  { name: 'Data Diri Pribadi', href: '#' },
  { name: 'Riwayat Golongan', href: '#' },
  { name: 'Riwayat Jabatan', href: '#' },
  { name: 'Riwayat Pendidikan', href: '#' },
  { name: 'Riwayat Diklat', href: '#' },
  { name: 'Riwayat Penghargaan', href: '#' },
  { name: 'Riwayat Belajar', href: '#' },
  { name: 'Riwayat Keluarga', href: '#' },
  { name: 'Arsip Digital', href: '#' },
];

function DetailPegawai() {
  const { tabName = tabs[0].name } = getQueryString<{ tabName: string }>();
  const [selected, setSelected] = React.useState(tabName);
  const personalPegawaiData = usePersonalData();

  const [img, setImg] = React.useState('');

  const { data: profile } = useCommonApi<null, GetPhotoProfileRes>(UserProfileAPI.USER_PHOTO, null, { method: 'GET' });

  const photos = () => {
    callAPI(UserProfileAPI.GET_USER_DOC_PHOTO + `/${profile?.uuid_foto}`, null, { method: 'GET', isBlob: true }).then(
      res => {
        let url = '';
        if (res.status === 200 && res.data instanceof Blob) {
          url = window.URL.createObjectURL(res.data);
          setImg(url);
        }
      }
    );
  };

  React.useEffect(() => {
    const unSubscribe = photos();
    return () => unSubscribe;
  }, [profile?.uuid_foto]);

  if (!personalPegawaiData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        {img.length >= 1 ? (
          <img className="h-[88px] w-[88px] rounded-full" src={img} alt="" />
        ) : (
          <UserCircleIcon className="h-[88px] w-[88px] fill-indigo-500" />
        )}
        <div className="my-auto flex flex-col">
          <p className="text-[24px] font-[700]">{personalPegawaiData?.nama}</p>
          <p className="text-[14px] font-[500] text-[#6B7280]">{personalPegawaiData?.jabatan}</p>
        </div>
      </div>
      <div className="mt-[12px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="flex flex-row gap-x-[20px] overflow-auto">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Pilih tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={tabs[0].name}
              onChange={event => {
                setSelected(event.target.value);
              }}
            >
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setSelected(tab.name)}
                    className={classNames(
                      tab.name === selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-xs font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          {selected === tabs[0].name ? <DataDiriPegawai /> : null}
          {selected === tabs[1].name ? <DataDiriPribadi /> : null}
          {selected === tabs[2].name ? <RiwayatGolongan /> : null}
          {selected === tabs[3].name ? <RiwayatJabatan /> : null}
          {selected === tabs[4].name ? <RiwayatPendidikan /> : null}
          {selected === tabs[5].name ? <RiwayatDiklat /> : null}
          {selected === tabs[6].name ? <RiwayatPenghargaan /> : null}
          {selected === tabs[7].name ? <RiwayatBelajar /> : null}
          {selected === tabs[8].name ? <RiwayatKeluarga /> : null}
          {selected === tabs[0].name ? <ArsipDigital /> : null}
        </div>
      </div>
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
