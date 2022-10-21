import { UserCircleIcon } from '@heroicons/react/outline';
import React from 'react';

import { UserProfileAPI } from '../../constants/APIUrls';
import { GetOptPhotoReq, GetPhotoProfileRes } from '../../types/api/ProfilePhotoAPI';
import { callAPI } from '../../utils/Fetchers';
import { getQueryString } from '../../utils/URLUtils';
import useCommonApi from './hooks/useCommonApi';
import usePersonalData from './hooks/usePersonalData';

export default function CardHeader() {
  const { pegawai_id } = getQueryString<{ pegawai_id: string }>();
  const { data: profile } = useCommonApi<GetOptPhotoReq, GetPhotoProfileRes>(
    UserProfileAPI.USER_PHOTO,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const personalPegawai = usePersonalData();
  const [img, setImg] = React.useState('');
  const [showImage, setShowImage] = React.useState(false);
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

  return (
    <>
      <div className="mb-[24px] flex flex-row flex-nowrap justify-between gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="flex flex-row">
          {img.length >= 1 ? (
            <img onClick={() => setShowImage(!showImage)} className="h-[88px] w-[88px] rounded-full" src={img} alt="" />
          ) : (
            <UserCircleIcon className="h-[88px] w-[88px] fill-indigo-500" />
          )}
          <div className="my-auto ml-2 flex flex-col">
            <p className="text-[14px] font-[500] text-[#4B5563]">Selamat Datang,</p>
            <p className="text-[24px] font-[700]">{personalPegawai?.nama}</p>
            <p className="text-[14px] font-[500] text-[#4B5563]">{personalPegawai?.jabatan}</p>
          </div>
        </div>
      </div>
    </>
  );
}
