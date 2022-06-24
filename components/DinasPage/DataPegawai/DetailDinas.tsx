import { ChevronLeftIcon } from '@heroicons/react/solid';

import Loader from '../../shared/Loader/Loader';
import DinasCalendar from './DinasCalendar';

export default function DetailDinas() {
  const { data, isValidating } = {
    isValidating: false,
    data: {
      nip: '1623897986718927',
      name: 'Muhammad Amin',
      unit_kerja: 'Direktorat Sumber Daya',
    },
  };

  if (isValidating) {
    return <Loader />;
  }

  const handleBack = () => {};

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        <div className="my-3 inline-flex cursor-pointer items-center px-7 pl-4 pr-6 font-semibold" onClick={handleBack}>
          <ChevronLeftIcon className="mr-0.5 h-8" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
        <div className="mb-4 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">Data Dinas Pegawai</h3>
        </div>
        <div className="flex flex-row border-y-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">NIP</div>
          <div className="text-l text-gray-700">{data?.nip}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Nama</div>
          <div className="text-l text-gray-700">{data?.unit_kerja}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Unit Kerja</div>
          <div className="text-l text-gray-700">{data?.name}</div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <h3 className="text-xl font-semibold tracking-wider text-gray-700 px-6 py-4 border-b-[1px]">Jadwal Dinas</h3>
        <DinasCalendar />
      </div>
    </>
  );
}
