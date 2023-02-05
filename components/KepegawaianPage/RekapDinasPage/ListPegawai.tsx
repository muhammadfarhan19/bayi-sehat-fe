import { format } from 'date-fns';

import { classNames } from '../../../utils/Components';
import { formatStringDate } from '../../../utils/DateUtil';

interface Pegawai {
  flag: number;
  nama: string;
  nip: string;
  pegawai_id: number;
  unit_kerja: string;
  tgl_available: Array<any>;
}

interface ListData {
  list: Pegawai[];
  reload: boolean;
  removeList: (id: number, nip: string) => void;
  handleEdit: (idx: number) => void;
}

export default function ListPegawai(props: ListData) {
  const { list, reload, removeList, handleEdit } = props;

  return (
    <div className="mt-5">
      {!reload &&
        list?.map((each, idx) => (
          <>
            <div className="flex w-full flex-row">
              <div>
                <p className="px-2 text-[14px]">{idx + 1}</p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="px-2 text-[14px]">
                  {each?.nama}
                  {' - '}
                  {each?.nip}
                </p>
                <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.unit_kerja}</p>
                <div className="flex flex-row">
                  <p
                    className={classNames(
                      each?.flag === 0 ? 'text-[#DC2626]' : each?.flag === 1 ? 'text-yellow-400' : 'text-[#10B981]',
                      'px-2 text-[14px]'
                    )}
                  >
                    {each?.flag === 0 ? 'Not Available' : each?.flag === 1 ? 'Partialy Available' : 'Available'},
                  </p>
                  <p className="max-w-[400px] text-[14px] tracking-normal">
                    {each.flag === 1 &&
                      each.tgl_available.map((date, idx) =>
                        idx === each.tgl_available.length - 1
                          ? `${format(new Date(date), 'dd MMM yyyy')}`
                          : `${format(new Date(date), 'dd MMM yyyy')}, `
                      )}
                    {each?.flag === 2 &&
                      formatStringDate(each?.tgl_available[0], 'dd MMM yyyy') +
                        ' - ' +
                        formatStringDate(each?.tgl_available?.[each.tgl_available.length - 1], 'dd MMM yyyy')}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex flex-row gap-x-[12px]">
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#DC2626] py-[9px] px-[17px] text-[14px] text-gray-50"
                    onClick={() => removeList(idx, each?.nip)}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit Tanggal
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
          </>
        ))}
    </div>
  );
}
