import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setShowProfPic } from '../../../../action/CommonAction';
import { UserProfileAPI } from '../../../../constants/APIUrls';
import { useCommonState } from '../../../../reducer/CommonReducer';
import { GetOptPhotoReq, GetPhotoProfileRes } from '../../../../types/api/ProfilePhotoAPI';
import { callAPI } from '../../../../utils/Fetchers';
import useCommonApi from '../../hooks/useCommonApi';
import ChangeProfilePic from './ChangeProfilePic';

export default function ModalProfilePic() {
  const dispatch = useDispatch();
  const { showProfPic } = useCommonState();
  const [img, setImg] = React.useState<string>();
  const [isEdit, setIsEdit] = React.useState<boolean>(true);

  const handleShowModal = (show: boolean) => {
    dispatch(setShowProfPic(show));
  };

  const { data: userPhoto, isValidating } = useCommonApi<GetOptPhotoReq, GetPhotoProfileRes>(
    UserProfileAPI.USER_PHOTO,
    {},
    { method: 'GET' }
  );

  React.useEffect(() => {
    if (userPhoto?.uuid_foto) {
      callAPI(UserProfileAPI.GET_USER_DOC_PHOTO + `/${userPhoto?.uuid_foto}`, null, {
        method: 'GET',
        isBlob: true,
      }).then(res => {
        if (res.status === 200 && res.data instanceof Blob) {
          const url = URL.createObjectURL(res.data);
          setImg(url);
          setIsEdit(false);
        }
      });
      return;
    }
  }, [isValidating]);

  const handleCancel = () => {
    if (!img) {
      handleShowModal(false);
      return;
    }
    setIsEdit(false);
  };

  return (
    <Transition appear show={showProfPic} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => handleShowModal(false)}>
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Foto Profil</h3>
                <XIcon className="h-5 cursor-pointer" onClick={() => handleShowModal(false)} />
              </Dialog.Title>

              {!isEdit ? (
                <>
                  {!!img && (
                    <div
                      className="h-[200px] w-full bg-center bg-no-repeat"
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                  )}
                  <hr />
                  <div className="mt-5 flex flex-col items-end">
                    <button
                      type="button"
                      className="inline-flex rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                      onClick={() => setIsEdit(true)}
                    >
                      Ubah
                    </button>
                  </div>
                </>
              ) : (
                <ChangeProfilePic onCancel={handleCancel} />
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
