import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, DownloadIcon, SelectorIcon, XIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

import { UserProfileAPI } from '../../../../constants/APIUrls';
import { GetOptPhotoReq, GetPhotoProfileRes } from '../../../../types/api/ProfilePhotoAPI';
import { classNames } from '../../../../utils/Components';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import useAllowAdmin from '../../../shared/hooks/useAllowAdmin';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import Loader from '../../../shared/Loader/Loader';
import ArsipDigital from './ArsipDigital';
import DataDiriPegawai from './DataDiriPegawai';
import DataDiriPribadi from './DataDiriPribadi';
import DataDiriPribadiPpnpn from './DataDiriPribadiPpnpn';
import ProfilePegawai from './ProfileSummaryPegawai/ProfilePegawai';
import RiwayatBelajar from './RiwayatBelajar';
import RiwayatDiklat from './RiwayatDiklat';
import RiwayatGolongan from './RiwayatGolongan';
import RiwayatJabatan from './RiwayatJabatan';
import RiwayatKeluarga from './RiwayatKeluarga';
import RiwayatKGB from './RiwayatKGB';
import RiwayatPendidikan from './RiwayatPendidikan';
import RiwayatPengangkatan from './RiwayatPengangkatan';
import RiwayatPenghargaan from './RiwayatPenghargaan';
import RiwayatSkp from './RiwayatSkp';
import StatusKepegawaian from './StatusKepegawaian';

export type PegawaiType = 'pns' | 'ppnpn';

function DetailPegawai() {
  const { type } = getQueryString() as { type: PegawaiType };
  const isAllowAdmin = useAllowAdmin();

  const pns = [
    { name: 'Data Diri Pegawai', href: '#' },
    { name: 'Data Diri Pribadi', href: '#' },
    { name: 'Riwayat Golongan', href: '#' },
    { name: 'Riwayat Jabatan', href: '#' },
    { name: 'Riwayat KGB', href: '#' },
    { name: 'Riwayat Pendidikan', href: '#' },
    { name: 'Riwayat Pelatihan/ Diklat', href: '#' },
    { name: 'Riwayat Penghargaan', href: '#' },
    { name: 'Riwayat Belajar', href: '#' },
    { name: 'Riwayat SKP', href: '#' },
    { name: 'Riwayat Keluarga', href: '#' },
    { name: 'Arsip Digital', href: '#' },
  ];

  const ppnpn = [
    { name: 'Data Diri Pribadi', href: '#' },
    { name: 'Riwayat Pengangkatan Pekerjaan', href: '#' },
    { name: 'Riwayat Pendidikan', href: '#' },
    { name: 'Riwayat Pelatihan/ Diklat', href: '#' },
    { name: 'Riwayat Keluarga', href: '#' },
    { name: 'Arsip Digital', href: '#' },
  ];
  const personalPegawaiData = usePersonalData();

  const isPNS = [1, 3].includes(personalPegawaiData?.status_cpns || 0) || type === 'pns';
  const tabs = isPNS ? pns : ppnpn;

  const { tabName = tabs[0].name } = getQueryString<{ tabName: string }>();
  const [selected, setSelected] = React.useState(tabName);
  const [showImage, setShowImage] = React.useState(false);

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
    setSelected(tabs[0].name);
    return () => {
      setSelected(tabs[0].name);
    };
  }, [personalPegawaiData?.status_cpns]);

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

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = img;
    link.setAttribute('download', `profile.jpg`);
    link.click();
    link.remove();
  };

  return (
    <>
      <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        {img.length >= 1 ? (
          <img onClick={() => setShowImage(!showImage)} className="h-[88px] w-[88px] rounded-full" src={img} alt="" />
        ) : (
          <UserCircleIcon className="h-[88px] w-[88px] fill-indigo-500" />
        )}
        <div className="flex w-full flex-col gap-y-2 lg:flex-row">
          <div className="my-auto ml-2 flex flex-col">
            <p className="text-[24px] font-[700]">{personalPegawaiData?.nama}</p>
            <p className="text-[14px] font-[500] text-[#6B7280]">{personalPegawaiData?.jabatan}</p>
            <p className="text-[14px] font-[500] text-[#6B7280]">{personalPegawaiData?.unit_kerja}</p>
          </div>
          <div className="my-auto ml-2 lg:ml-auto">
            <button
              onClick={() => {
                setShowComponent(!showComponent);
              }}
              type="button"
              className="mr-2 mb-2 inline-flex w-fit items-center rounded border border-transparent bg-green-600 py-1.5 px-2.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200 disabled:text-gray-200"
            >
              Download Riwayat Hidup
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[12px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="block lg:hidden">
          <label htmlFor="tabs" className="sr-only">
            Pilih tab
          </label>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">Pilih Tab</Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <span className="block truncate">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {tabs.map(each => (
                        <Listbox.Option
                          key={each.name}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={each.name}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                              >
                                {each.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex flex-row gap-x-[20px] overflow-auto">
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
          {isPNS ? (
            <>
              {selected === tabs[0]?.name ? <DataDiriPegawai /> : null}
              {selected === tabs[1]?.name ? <DataDiriPribadi /> : null}
              {selected === tabs[2]?.name ? <RiwayatGolongan /> : null}
              {selected === tabs[3]?.name ? <RiwayatJabatan /> : null}
              {selected === tabs[4]?.name ? <RiwayatKGB /> : null}
              {selected === tabs[5]?.name ? <RiwayatPendidikan /> : null}
              {selected === tabs[6]?.name ? <RiwayatDiklat /> : null}
              {selected === tabs[7]?.name ? <RiwayatPenghargaan /> : null}
              {selected === tabs[8]?.name ? <RiwayatBelajar /> : null}
              {selected === tabs[9]?.name ? <RiwayatSkp /> : null}
              {selected === tabs[10]?.name ? <RiwayatKeluarga /> : null}
              {selected === tabs[11]?.name ? <ArsipDigital /> : null}
            </>
          ) : (
            <>
              {selected === tabs[0]?.name ? <DataDiriPribadiPpnpn /> : null}
              {selected === tabs[1]?.name ? <RiwayatPengangkatan /> : null}
              {selected === tabs[2]?.name ? <RiwayatPendidikan /> : null}
              {selected === tabs[3]?.name ? <RiwayatDiklat /> : null}
              {selected === tabs[4]?.name ? <RiwayatKeluarga /> : null}
              {selected === tabs[5]?.name ? <ArsipDigital /> : null}
            </>
          )}
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
                  <div className="flex justify-center">
                    <img className="h-[250px] w-[250px] rounded-full" src={img} alt="" />
                    <XIcon className="h-5 cursor-pointer" onClick={() => setShowImage(!showImage)} />
                  </div>
                  <hr className="mt-2" />
                  <div className="mt-2 flex flex-col items-end">
                    <div className="flex cursor-pointer flex-col items-center" onClick={downloadImage}>
                      <DownloadIcon className="h-5 cursor-pointer" />
                      <div className="text-xs">Unduh</div>
                    </div>
                  </div>
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

      {isAllowAdmin && (
        <div className="flex flex-col rounded-[8px] bg-white py-6 px-[24px] shadow">
          <StatusKepegawaian />
        </div>
      )}
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
