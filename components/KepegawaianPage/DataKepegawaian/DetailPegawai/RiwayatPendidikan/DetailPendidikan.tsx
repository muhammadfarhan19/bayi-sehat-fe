import { ChevronLeftIcon } from '@heroicons/react/outline';

import ImgFile from '../../../../shared/ImgFile';

type ListDigitalProps = {
  riwayatPendidikanId?: number;
  onBack: () => void;
};

const data = {
  id: 1,
  jenjang: 'S3',
  lembaga: 'Universitas Brawijaya',
  prodi: 'Ilmu Pertanian',
  tgl_lulus: '2016-08-19',
  no_ijazah: '188/UB/PPS/S3/2006',
  ijazah_cpns: 'YA',
  ijazah_terakhir: 'YA',
  bukti_SK: 'test.pdf',
  document_uuid: '7e5996c7-e35e-4154-9973-57f74832d680',
}

export default function DetailPendidikan(props: ListDigitalProps) {
  const { onBack } = props;

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
              { label: 'Jenjang', value: data?.jenjang },
              { label: 'Nama Institusi', value: data?.lembaga },
              { label: 'Prodi/Jurusan', value: data?.prodi },
              { label: 'No Ijazah', value: data?.no_ijazah },
              { label: 'Ijazah CPNS', value: data?.ijazah_cpns },
              { label: 'Ijazah Terakhir', value: data?.ijazah_terakhir },
              { label: 'Tanggal Lulus', value: data?.tgl_lulus },
              { label: 'Bukti SK', value: data?.bukti_SK },
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
          <ImgFile uuid={data?.document_uuid} />
        </div>
      </div>
    </>
  );
}
