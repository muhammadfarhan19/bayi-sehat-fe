import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

import { ArsipDigitalAPI } from '../../../../../constants/APIUrls';
import { ArsipDigitalDetailData, GetArsipDigitalDetailReq } from '../../../../../types/api/ArsipDigitalAPI';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import Loader from '../../../../shared/Loader/Loader';

type ListArsipProps = {
  arsipDigitalId: number;
  onBack: () => void;
};

export default function DetailArsip(props: ListArsipProps) {
  const { arsipDigitalId, onBack } = props;

  const { data, isValidating } = useCommonApi<GetArsipDigitalDetailReq, ArsipDigitalDetailData>(
    ArsipDigitalAPI.GET_ARSIP_DIGITAL_VIEW,
    { arsip_digital_id: arsipDigitalId },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  if (isValidating) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center font-semibold" onClick={onBack}>
        <ChevronLeftIcon className="mr-0.5 h-8" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-wider text-gray-700">{data?.document_name}</h3>
        <div className="text-sm font-medium tracking-wider text-gray-500">{data?.jenis_berkas_str}</div>
        <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
          <FileLoader uuid={data?.document_uuid}>
            <button
              type="button"
              className="inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
            >
              Download file
            </button>
            <br />
          </FileLoader>
        </div>
      </div>
    </>
  );
}
