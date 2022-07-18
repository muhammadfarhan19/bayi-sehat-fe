import { ChevronLeftIcon } from '@heroicons/react/outline';

type DetailPenghargaanProps = {
  onBack: () => void;
};

export default function DetailPenghargaan(props: DetailPenghargaanProps) {
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
              { label: 'Penghargaan', value: 'Penghargaan' },
              { label: 'Tingkat Penghargaan', value: 'Internasional' },
              { label: 'Penyelenggara', value: 'Kemenristek' },
              { label: 'Tanggal Penghargaan', value: 'Feb, 27 2018' },
              { label: 'Keterangan Penghargaan', value: 'Sains' },
              { label: 'No Penghargaan', value: 'BCD/111-00-99' },
              { label: 'Dokumen', value: 'File_Penghargaan_BCD/111-00-99' },
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
          Download File
        </div>
      </div>
    </>
  );
}
