import { UserCircleIcon } from '@heroicons/react/outline';
import React from 'react';

import { LogHarianAPI, RekapDinasAPI, UserProfileAPI } from '../../../constants/APIUrls';
import { GetLogHarianPegawaiReq, GetLogHarianPegawaiRes } from '../../../types/api/LogHarianAPI';
import { GetOptPhotoReq, GetPhotoProfileRes } from '../../../types/api/ProfilePhotoAPI';
import { GetRekapDinasPegawaiReq, GetRekapDinasPegawaiRes } from '../../../types/api/RekapDinasAPI';
import { convertIndonesiaFormat } from '../../../utils/DateUtil';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import NotificationListPage from '../../Notification/NotificationListPage/NotificationListPage';
import Card from '../../shared/Card';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import DinasCalendar from './DinasCalendar';
import JadwalDinas from './JadwalDinas';

export default function DetailDinas() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const [formModalState, setFormModalState] = React.useState(false);
  const personalPegawai = usePersonalData();
  const [img, setImg] = React.useState('');
  const [showImage, setShowImage] = React.useState(false);
  const dateNowStr = new Date().toISOString().slice(0, 10);

  const { data: profile } = useCommonApi<GetOptPhotoReq, GetPhotoProfileRes>(
    UserProfileAPI.USER_PHOTO,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const dataId = profile?.uuid_foto;
  const userId = personalPegawai?.user_id;
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

  const { data: logHarian, isValidating: loadLogHarian } = useCommonApi<GetLogHarianPegawaiReq, GetLogHarianPegawaiRes>(
    LogHarianAPI.GET_LOG_HARIAN_PEGAWAI,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const { data: dinas, isValidating: loadDinas } = useCommonApi<GetRekapDinasPegawaiReq, GetRekapDinasPegawaiRes>(
    RekapDinasAPI.GET_DINAS_PEGAWAI,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  return (
    <>
      <div className="mb-[24px] flex flex-row flex-nowrap justify-between gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="flex flex-row">
          {img.length >= 1 ? (
            <img
              onClick={() => setShowImage(!showImage)}
              className="my-auto h-[88px] w-[88px] rounded-full"
              src={img}
              alt=""
            />
          ) : (
            <UserCircleIcon className="my-auto h-[88px] w-[88px] fill-indigo-500" />
          )}
          <div className="my-auto ml-2 flex flex-col">
            <p className="text-[14px] font-[500] text-[#4B5563]">Selamat Datang,</p>
            <p className="text-[24px] font-[700]">{personalPegawai?.nama}</p>
            <p className="text-[14px] font-[500] text-[#4B5563]">{personalPegawai?.jabatan}</p>
            {personalPegawai?.jabatan !== '' && (
              <p className="text-[14px] font-semibold text-[#4B5563]">{personalPegawai?.jabatan}</p>
            )}
            {personalPegawai?.unit_kerja !== '' && (
              <p className="text-[12px] font-medium text-[#4B5563]">{personalPegawai?.unit_kerja}</p>
            )}
          </div>
        </div>
      </div>

      <NotificationListPage />

      <div className="mb-[24px] grid grid-cols-2 gap-[24px]">
        <Card
          title="Jadwal Dinas"
          sub_title={`Dinas dibulan ${convertIndonesiaFormat(dateNowStr).split(' ')[1]}`}
          link={`/jadwal-dinas`}
          data={typeof dinas !== 'undefined' && dinas !== null ? String(dinas?.total_dinas) : '-'}
          load={loadDinas}
        />

        <Card
          title="Log Harian"
          sub_title="Belum di isi"
          link="/log-harian"
          data={
            typeof logHarian !== 'undefined' && logHarian !== null ? String(logHarian?.number_of_day_unfilled) : '-'
          }
          load={loadLogHarian}
        />
      </div>

      {/* <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        {pegawai_id && (
          <Link href="/dinas/pegawai">
            <div className="mt-3 inline-flex cursor-pointer items-center px-7 pl-4 pr-6 font-semibold">
              <ChevronLeftIcon className="mr-0.5 h-8" />
              <span className="tracking-wide text-gray-600">Kembali</span>
            </div>
          </Link>
        )}
        <div className="my-4 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">
            {pegawai_id ? 'Data Dinas Pegawai' : 'Jadwal Pegawai'}
          </h3>
        </div>
        <div className="flex flex-row border-y-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">NIP</div>
          <div className="text-l text-gray-700">{personalPegawai?.nip}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Nama</div>
          <div className="text-l text-gray-700">{personalPegawai?.nama}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Unit Kerja</div>
          <div className="text-l text-gray-700">{personalPegawai?.unit_kerja}</div>
        </div>
      </div> */}

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-row items-center justify-between border-b-[1px] px-6 py-4">
          <h3 className=" text-xl font-semibold tracking-wider text-gray-700">Jadwal Pegawai</h3>
          <button
            onClick={() => setFormModalState(!formModalState)}
            className="text-l rounded-[4px] bg-indigo-600 px-4   py-2 font-medium text-gray-50 focus:outline-none"
          >
            Download Jadwal Dinas
          </button>
        </div>
        <DinasCalendar />
      </div>
      {formModalState && <JadwalDinas open={formModalState} setOpen={() => setFormModalState(!formModalState)} />}
    </>
  );
}
