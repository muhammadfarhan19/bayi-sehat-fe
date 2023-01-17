import { format } from 'date-fns';

import { classNames } from '../../../utils/Components';

interface ListPegawai {
  flag: number;
  nama: string;
  nip: string;
  pegawai_id: number;
  unit_kerja: string;
  instansi?: string;
  tgl_available: Array<any>;
}

interface ListDeleted {
  pegawaiEksternal: ListPegawai[];
  pegawai: ListPegawai[];
}

export default function ListDeleted(props: ListDeleted) {
  const { pegawai, pegawaiEksternal } = props;
  return (
    <div className="mt-6 rounded-lg bg-white shadow">
      {pegawai.length ? (
        <div className="p-6 px-6 ">
          <div className="mt-5">
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <p className="text-sm font-medium text-gray-700">Pegawai Dihapus</p>
            </div>
          </div>
          <div className="mt-5">
            {pegawai?.map((each, idx) => (
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
                          each?.flag === 0 ? 'text-[#DC2626]' : each?.flag === 1 ? 'text-yellow' : 'text-[#10B981]',
                          'px-2 text-[14px]'
                        )}
                      >
                        {each?.flag === 0 ? 'Not Available' : each?.flag === 1 ? 'Partialy Available' : 'Available'},
                      </p>
                      {each.flag !== 0 && (
                        <p className="text-[14px]">
                          {format(new Date(each?.tgl_available?.[0]), 'dd MMM yyyy')} -{' '}
                          {format(new Date(each?.tgl_available?.[each.tgl_available.length - 1]), 'dd MMM yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
              </>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}

      {pegawaiEksternal.length ? (
        <div className="px-6 pb-[51px]">
          <div>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <p className="text-sm font-medium text-gray-700">Tim Eksternal Dihapus</p>
            </div>
          </div>
          <div className="mt-5">
            {pegawaiEksternal?.map((each, idx) => (
              <>
                <div className="flex w-full flex-row">
                  <div>
                    <p className="px-2 text-[14px]">{idx + 1}</p>
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <p className="px-2 text-[14px]">{each?.nama}</p>
                    <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.unit_kerja}</p>
                    <div className="flex flex-row">
                      <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.instansi}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
              </>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
