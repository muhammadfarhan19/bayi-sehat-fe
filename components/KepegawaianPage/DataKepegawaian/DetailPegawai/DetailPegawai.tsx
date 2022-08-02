import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';

import { UserProfileAPI } from '../../../../constants/APIUrls';
import { GetOptPhotoReq, GetPhotoProfileRes } from '../../../../types/api/ProfilePhotoAPI';
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
import ProfilePegawai from './ProfileSummaryPegawai/ProfilePegawai';
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
  const [showImage, setShowImage] = React.useState(false);
  const personalPegawaiData = usePersonalData();
  const [showComponent, setShowComponent] = React.useState(false);
  const { pegawai_id } = getQueryString<{ pegawai_id: string }>();

  const [img, setImg] = React.useState('');

  const { data: profile } = useCommonApi<GetOptPhotoReq, GetPhotoProfileRes>(
    UserProfileAPI.USER_PHOTO,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );
  const dataId = profile?.uuid_foto;
  const userId = personalPegawaiData?.user_id;
  const profileDataId = profile?.user_id;

  const photos = () => {
    if (dataId && userId === profileDataId) {
      callAPI(UserProfileAPI.GET_USER_DOC_PHOTO + `/${dataId}`, null, {
        method: 'GET',
        isBlob: true,
      }).then(res => {
        let url = '';
        if (res.status === 200 && res.data instanceof Blob) {
          url = window.URL.createObjectURL(res.data);
          setImg(url);
        }
      });
    }
  };

  React.useEffect(() => {
    const unSubscribe = photos();
    return () => unSubscribe;
  }, [profileDataId === userId && dataId]);

  if (!personalPegawaiData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row flex-nowrap justify-between gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="flex flex-row">
          {img.length >= 1 ? (
            <img onClick={() => setShowImage(!showImage)} className="h-[88px] w-[88px] rounded-full" src={img} alt="" />
          ) : (
            <UserCircleIcon className="h-[88px] w-[88px] fill-indigo-500" />
          )}
          <div className="my-auto flex flex-col">
            <p className="text-[24px] font-[700]">{personalPegawaiData?.nama}</p>
            <p className="text-[14px] font-[500] text-[#6B7280]">{personalPegawaiData?.jabatan}</p>
          </div>
        </div>
        <div className="self-center">
          <button
            onClick={() => {
              setShowComponent(!showComponent);
            }}
            type="button"
            className="mr-2 mb-2 inline-flex items-center rounded border border-transparent bg-green-600 py-1.5 px-2.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200 disabled:text-gray-200"
          >
            Download Riwayat Hidup
          </button>
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
              <nav className="-mb-px flex flex-wrap space-x-8 space-x-reverse" aria-label="Tabs">
                {tabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setSelected(tab.name)}
                    className={classNames(
                      tab.name === selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-xs font-medium first:mr-8'
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
          {selected === tabs[9].name ? <ArsipDigital /> : null}
        </div>
      </div>
      {showImage && (
        <Transition appear show={showImage} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setShowImage(!showImage)}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
              </Transition.Child>
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex justify-center">
                    <img className="h-[250px] w-[250px] rounded-full" src={img} alt="" />
                    <XIcon className="h-5 cursor-pointer" onClick={() => setShowImage(!showImage)} />
                  </Dialog.Title>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
      {showComponent && (
        <Transition appear show={showComponent} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setShowComponent(!showComponent)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
              </Transition.Child>
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex justify-center">
                    {/* <XIcon className="h-5 cursor-pointer " onClick={() => setShowComponent(!showComponent)} /> */}
                    <div className="self-end">
                      <ProfilePegawai id="PDF Pegawai" />
                    </div>
                  </Dialog.Title>

                  <button
                    onClick={() => {
                      const printContents = document.getElementById('PDF Pegawai')?.outerHTML;
                      document.body.outerHTML = String(printContents);
                      window.print();
                      window.location.href = '/';
                    }}
                    type="submit"
                    className="align-center mt-5 w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Download Riwayat Hidup
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
