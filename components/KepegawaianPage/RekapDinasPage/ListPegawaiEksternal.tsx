interface Pegawai {
  nama: string;
  instansi: string;
}

interface ListData {
  list: Pegawai[];
  reload: boolean;
  removeList?: (id: number, nip: string, type: string) => void;
  handleEdit?: (idx: number) => void;
}

export default function ListPegawaiEksternal(props: ListData) {
  const { list, reload } = props;

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
                <p className="px-2 text-[14px]">{each?.nama}</p>
                <div className="flex flex-row">
                  <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.instansi}</p>
                </div>
              </div>
              {/* <div className="ml-auto">
                                <div className="flex flex-row gap-x-[12px]">
                                    <button
                                        type="button"
                                        className="rounded-[6px] bg-[#DC2626] py-[9px] px-[17px] text-[14px] text-gray-50"
                                        onClick={() => removeList(idx, '', 'eksternal')}
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
                            </div> */}
            </div>
            <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
          </>
        ))}
    </div>
  );
}
