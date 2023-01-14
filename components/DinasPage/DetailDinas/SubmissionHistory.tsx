import { format } from 'date-fns';

import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { GetTanggalPembayaranReq, TanggalPembayaranData } from '../../../types/api/KeuanganDinasAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';

interface submission {
  status: number;
  dinas_id: string;
}

function SubmissionHistory(props: submission) {
  const { status, dinas_id } = props;

  const { data, isValidating } = useCommonApi<GetTanggalPembayaranReq, TanggalPembayaranData>(
    KeuanganDinasAPI.GET_TANGGAL_PEMBAYARAN,
    { dinas_id: Number(dinas_id) },
    { method: 'GET' }
  );

  const dateFormat = (date: string) => {
    let _tgl,
      tanggal = '';
    if (date !== '') {
      _tgl = date.split('T')?.[0];
      tanggal = format(new Date(_tgl), 'dd MMMM yyyy');
    }

    return tanggal;
  };

  if (isValidating) {
    return <></>;
  }

  return (
    <>
      {[4].includes(status) && (
        <div className="flex flex-col gap-y-2 rounded-lg bg-white shadow">
          <div className="flex flex-col divide-y">
            <div className="py-[20px] ">
              <p className="px-6 text-lg font-medium text-gray-900">Pertanggungjawaban BPP</p>
            </div>
            <div className="inline-flex gap-x-[4rem] py-[20px] px-6">
              <p className="font-inter w-[14rem] text-[14px] text-[#6B7280]">Tanggal Pertanggungjawaban BPP</p>
              <p className="font-inter text-[14px] text-[#111827]">
                {dateFormat(String(data?.tanggal_pertanggungjawaban))}
              </p>
            </div>
          </div>
        </div>
      )}

      {[3, 4].includes(status) && (
        <div className="flex flex-col gap-y-2 rounded-lg bg-white shadow">
          <div className="flex flex-col divide-y">
            <div className="py-[20px]">
              <p className="px-6 text-lg font-medium text-gray-900">Dibayarkan oleh BPP</p>
            </div>
            <div className="inline-flex gap-x-[4rem] py-[20px] px-6">
              <p className="font-inter w-[14rem] text-[14px] text-[#6B7280]">Tanggal Dibayarkan oleh BPP</p>
              <p className="font-inter text-[14px] text-[#111827]">{dateFormat(String(data?.tanggal_dibayarkan))}</p>
            </div>
          </div>
        </div>
      )}

      {[2, 3, 4].includes(status) && (
        <div className="flex flex-col gap-y-2 rounded-lg bg-white shadow">
          <div className="flex flex-col divide-y">
            <div className="py-[20px]">
              <p className="px-6 text-lg font-medium text-gray-900">Pengajuan PUMK Kepada BPP</p>
            </div>
            <div className="inline-flex gap-x-[4rem] py-[20px] px-6">
              <p className="font-inter w-[14rem] text-[14px] text-[#6B7280]">Tanggal Pengajuan oleh PUMK</p>
              <p className="font-inter text-[14px] text-[#111827]">{dateFormat(String(data?.tanggal_request))}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubmissionHistory;
