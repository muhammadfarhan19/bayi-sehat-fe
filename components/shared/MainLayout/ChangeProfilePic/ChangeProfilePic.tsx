import { UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Area } from 'react-easy-crop';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { DocumentAPI, UserProfileAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { PostDocumentUploadReq, PostDocumentUploadRes } from '../../../../types/api/DocumentAPI';
import { PostPhotoProfileReq, PostPhotoProfileRes } from '../../../../types/api/ProfilePhotoAPI';
import { DocumentUploadType, Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import ImgPreview, { useExtractImg } from './ImgPreview';

export default function ChangeProfilePic(props: { onCancel: () => void }) {
  const dispatch = useDispatch();
  const { getCroppedImg } = useExtractImg();
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area>();
  const [imgSrc, setImgSrc] = React.useState<string>();

  const handleShowPic = (event: React.BaseSyntheticEvent) => {
    const files = event.target.files;
    if (!files || files.length == 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result?.toString());
    };

    event.target.value = null;
  };

  const handleSubmit = async () => {
    if (!imgSrc || !croppedAreaPixels) return;

    const img = await getCroppedImg(imgSrc, croppedAreaPixels);
    if (!img) return;

    const file_name = 'profile.jpg';
    const bodyRequest: PostDocumentUploadReq = {
      document_type: DocumentUploadType.INTERNAL_SOURCE,
      file_name,
      file_path: '/',
      file: img,
      title: file_name,
    };

    const formdata = new FormData();
    Object.keys(bodyRequest).forEach(each => {
      const key = each as keyof typeof bodyRequest;
      if (bodyRequest[key] instanceof File || bodyRequest[key] instanceof Blob) {
        formdata.append(key, bodyRequest[key] as File, file_name);
      } else {
        formdata.append(key, String(bodyRequest[key]));
      }
    });

    const uploadRes = await callAPI<FormData, PostDocumentUploadRes>(DocumentAPI.POST_DOCUMENT_UPLOAD, formdata, {
      isMultipart: true,
      method: 'post',
    });
    if (uploadRes.status !== 200 || uploadRes?.data?.status !== Status.OK) return;

    const saveRes = await callAPI<PostPhotoProfileReq, PostPhotoProfileRes>(
      UserProfileAPI.USER_PHOTO,
      { foto: [{ document_uuid: String(uploadRes.data.data.document_uuid), document_name: file_name }] },
      { method: 'post' }
    );

    if (saveRes.status === 200 && saveRes.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Foto berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      location.reload();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan Foto. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return (
    <>
      {imgSrc ? <ImgPreview imageSrc={imgSrc} onCropComplete={(value: Area) => setCroppedAreaPixels(value)} /> : null}

      <div className="relative mt-5 flex items-center justify-between border-[1px] p-3">
        <div>
          <div className="text-sm text-gray-600">{'Upload Photo Profile'}</div>
          <div className="text-xs text-gray-400">(jpg/png)</div>
        </div>
        <input accept="image/*" type="file" className={'absolute inset-0 opacity-0'} onChange={handleShowPic} />
        <button className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300">
          <UploadIcon className="mr-1 h-4" />
          Upload
        </button>
      </div>

      <div className="mt-5 flex flex-col items-end">
        <div className="flex flex-row items-center">
          <button
            className="mr-3 inline-flex rounded border border-gray-600 px-2.5 py-1.5 text-xs font-medium text-gray-500 shadow-sm hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={props.onCancel}
          >
            Batal
          </button>
          <button
            className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
}
