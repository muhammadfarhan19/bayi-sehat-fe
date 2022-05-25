import { ChevronLeftIcon } from '@heroicons/react/outline';

import { RiwayatPendidikanAPI } from '../../../../../constants/APIUrls';
import { GetRiwayatPendidikanDetailReq, RiwayatPendidikanDetailData } from '../../../../../types/api/PendidikanAPI';
import ImgFile from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import Loader from '../../../../shared/Loader/Loader';

type ListDigitalProps = {
  riwayatPendidikanId?: number;
  onBack: () => void;
};

export default function DetailPendidikan(props: ListDigitalProps) {
  const { riwayatPendidikanId, onBack } = props;
  const { data, isValidating } = useCommonApi<GetRiwayatPendidikanDetailReq, RiwayatPendidikanDetailData>(
    RiwayatPendidikanAPI.GET_RIWAYAT_PENDIDIKAN_DETAIL,
    { id: Number(riwayatPendidikanId) },
    { method: 'GET' },
    { skipCall: !riwayatPendidikanId, revalidateOnMount: true }
  );

  if (isValidating) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Pendidikan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenjang', value: data?.jenjang_str },
              { label: 'Nama Institusi', value: data?.pt },
              { label: 'Prodi/Jurusan', value: data?.prodi },
              { label: 'No Ijazah', value: data?.no_ijazah },
              { label: 'Tanggal Lulus', value: data?.tanggal_lulus },
              { label: 'Bukti Ijazah', value: data?.files?.[0]?.document_name },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
          <ImgFile uuid={data?.files?.[0]?.document_uuid} />
        </div>
      </div>
    </>
  );
}
