import { ChevronLeftIcon } from '@heroicons/react/outline';

type ListDigitalProps = {
  riwayatDiklatId?: number;
  onBack: () => void;
};

export default function DetailDiklat(props: ListDigitalProps) {
  const { onBack } = props;
  return (
    <>
      <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="tracking-wide text-gray-600">Kembali</span>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Riwayat Diklat</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Jenis Diklat/Pelatihan', value: 'DIKLAT PIM VI' },
              { label: 'Nama Diklat/Pelatihan/Seminar', value: 'Pendidikan dan Pelatihan Kepemimpinan Tingkat IV' },
              { label: 'Penyelenggara', value: 'Pusat Pendidikan Pelatihan Kemenristekdikti' },
              { label: 'No Sertifikat', value: '00012702/DIKLATPIM TK.IV/LAN-KEMENRISTEKDIKTI/2018' },
              { label: 'Lokasi', value: 'Serpong, Tangerang Selatan' },
              { label: 'Keterangan', value: 'LULUS (Memuaskan)' },
              { label: 'Tanggal Awal Acara', value: '2018/04/29' },
              { label: 'Tanggal Akhir Acara', value: '2018/12/22' },
              { label: 'Bukti SK', value: '' },
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
          img
        </div>
      </div>
    </>
  );
}
