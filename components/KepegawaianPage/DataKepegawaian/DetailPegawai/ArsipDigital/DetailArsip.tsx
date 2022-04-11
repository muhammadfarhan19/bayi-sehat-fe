import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

import { ArsipDigitalAPI } from '../../../../../constants/APIUrls';
import { ArsipDigitalDetailData, GetArsipDigitalDetailReq } from '../../../../../types/api/ArsipDigitalAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import ImgFile from '../../../../shared/ImgFile';

type ListArsipProps = {
  arsipDigitalId: number;
  onBack: () => void;
};

export default function DetailArsip(props: ListArsipProps) {
  const { arsipDigitalId, onBack } = props;

  const { data } = useCommonApi<GetArsipDigitalDetailReq, ArsipDigitalDetailData>(
    ArsipDigitalAPI.GET_ARSIP_DIGITAL_VIEW,
    { arsip_digital_id: arsipDigitalId },
    { method: 'GET' }
  );

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-8" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-wider text-gray-700">{data?.document_name}</h3>
        <div className="text-sm font-medium tracking-wider text-gray-500">{data?.jenis_berkas_str}</div>
        <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
          <ImgFile uuid={data?.document_uuid} />
        </div>
      </div>
    </>
  );
}
