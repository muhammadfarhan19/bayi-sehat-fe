import { ChevronLeftIcon } from '@heroicons/react/outline';

import ImgFile from '../../../../shared/FileLoader';

type ListDigitalProps = {
  riwayatBelajarId?: number;
  onBack: () => void;
};

export default function DetailBelajar(props: ListDigitalProps) {
  const { onBack } = props;

  const data = {
    jenis: 'TUGAS BELAJAR',
    baru: 'BARU',
    jenjang: 'S-2',
    lembaga: 'Universitas Indonesia',
    prodi: 'Ilmu Hukum',
    waktu: '2011-09-01 s.d. 2013-08-31',
    bukti: '1-s2.0-S0272638618310618-mmc1.pdf',
  };

  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Belajar</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenis', value: data?.jenis },
              { label: 'Baru/Perpanjangan', value: data?.baru },
              { label: 'Jenjang', value: data?.jenjang },
              { label: 'Lembaga', value: data?.lembaga },
              { label: 'Prodi/Jurusan', value: data?.prodi },
              { label: 'Waktu', value: data?.waktu },
              { label: 'Bukti', value: data?.bukti },
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
          <ImgFile uuid={'e76df969-0fdd-4e89-a778-f33ce9f4c5a3'} />
        </div>
      </div>
    </>
  );
}
