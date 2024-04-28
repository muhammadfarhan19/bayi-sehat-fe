import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setShowProfPic } from '../../../action/CommonAction';
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
import TotalGajiPegawai from './GajiPegawai/TotalGajiPegawai';
import JadwalDinas from './JadwalDinas';
import { ResumeCards } from './shared/ResumeCards';

export default function DetailDinas() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const [formModalState, setFormModalState] = React.useState(false);

  const dispatch = useDispatch();
  const personalPegawai = usePersonalData();
  const [img, setImg] = React.useState('');

  const dateNowStr = new Date().toISOString().slice(0, 10);

  const { data: profile } = useCommonApi<GetOptPhotoReq, GetPhotoProfileRes>(
    UserProfileAPI.USER_PHOTO,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const isOwnProfile = !pegawai_id;
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
        <div className="flex w-full flex-col lg:flex-row">
          {img.length >= 1 ? (
            <img
              onClick={() => dispatch(setShowProfPic(true))}
              className="my-auto mx-auto h-[88px] w-[88px] cursor-pointer rounded-full lg:mx-0"
              src={img}
              alt=""
            />
          ) : (
            <UserCircleIcon className="h-[88px] w-[88px] self-center fill-indigo-500" />
          )}
          <div className="my-auto ml-2 flex flex-col">
            {isOwnProfile && (
              <p className="text-center text-[14px] font-[500] text-[#4B5563] lg:text-left">Selamat Datang,</p>
            )}
            <p className="text-center text-[24px] font-[700] lg:text-left">{personalPegawai?.nama}</p>
            {personalPegawai?.jabatan !== '' && (
              <p className="text-center text-[14px] font-semibold text-[#4B5563] lg:text-left">
                {personalPegawai?.jabatan}
              </p>
            )}
            {personalPegawai?.unit_kerja !== '' && (
              <p className="text-center text-[12px] font-medium text-[#4B5563] lg:text-left">
                {personalPegawai?.unit_kerja}
              </p>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <>
          <NotificationListPage />
          <TotalGajiPegawai />
          <ResumeCards />
        </>
      )}

      <div className="grid-grid-cols-1 mb-[24px] grid gap-[24px] lg:grid-cols-2">
        <Card
          title="Jadwal Dinas"
          sub_title={`Dinas dibulan ${convertIndonesiaFormat(dateNowStr).split(' ')[1]}`}
          link={`/jadwal-dinas` + (pegawai_id ? '?pegawai_id=' + pegawai_id : '')}
          data={typeof dinas !== 'undefined' && dinas !== null ? String(dinas?.total_dinas) : '-'}
          load={loadDinas}
        />

        <Card
          title="Log Harian"
          sub_title="Belum di isi"
          link={'/log-harian' + (pegawai_id ? '?pegawai_id=' + pegawai_id : '')}
          data={
            typeof logHarian !== 'undefined' && logHarian !== null ? String(logHarian?.number_of_day_unfilled) : '-'
          }
          load={loadLogHarian}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-row flex-wrap items-center justify-between border-b-[1px] px-6 py-4">
          <h3 className="text-md font-semibold tracking-wider text-gray-700 lg:text-xl">Jadwal Pegawai</h3>
          {/* <button
            onClick={() => setFormModalState(!formModalState)}
            className="lg:text-md mt-2 rounded-[4px] bg-indigo-600 px-4 py-2 text-sm font-medium text-gray-50 focus:outline-none"
          >
            Download Jadwal Dinas
          </button> */}
        </div>
        <DinasCalendar />
      </div>
      {formModalState && <JadwalDinas open={formModalState} setOpen={() => setFormModalState(!formModalState)} />}
    </>
  );
}
