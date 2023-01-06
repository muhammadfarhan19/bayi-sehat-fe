import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

import { RekapDinasAPI } from '../../../constants/APIUrls';
import { GetRekapDetailReq, RekapDetailData } from '../../../types/api/RekapDinasAPI';
import { classNames } from '../../../utils/Components';
import { startEndDateString } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';

function PegawaiSection() {
  const { dinas_id } = getQueryString<{ dinas_id: string }>();
  const { data, isValidating } = useCommonApi<GetRekapDetailReq, RekapDetailData>(
    RekapDinasAPI.GET_DINAS_DETAIL,
    { dinas_id: Number(dinas_id) },
    { method: 'GET' }
  );

  if (isValidating) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Disclosure defaultOpen={true} as="div" className="rounded-lg bg-white py-4 shadow">
        {({ open }) => (
          <>
            <Disclosure.Button as="div" className="flex cursor-pointer flex-row items-center justify-between px-6">
              <p className="text-lg font-medium text-gray-900">Detail Pegawai</p>
              <ChevronUpIcon
                className={classNames(
                  open ? 'rotate-180 text-indigo-700' : 'text-indigo-600',
                  'h-6 w-6 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="div" className="flex flex-col flex-nowrap space-y-2 pt-6">
              <div className="flex px-6">
                <span className="shrink grow basis-5/12 text-gray-700 sm:basis-3/12">Pegawai</span>
                <div className="flex grow basis-7/12 flex-col gap-y-2 sm:basis-9/12">
                  {(data?.pegawai || []).map((each, index) => (
                    <div key={`pegawai${index}`} className="flex">
                      <div className="shrink grow basis-1">{index + 1}.</div>
                      <div className="flex grow basis-11/12 flex-col">
                        <div className="text-base">{each.nama_pegawai}</div>
                        <div className="text-sm text-gray-500">{each.unit_kerja_str}</div>
                        <div>
                          {(() => {
                            if (each.flag === 2) {
                              return <span className="text-[#10B981]">Available</span>;
                            } else if (each.flag === 1) {
                              return <span className="text-yellow-400">Partialy Available</span>;
                            } else if (each.flag === 0) {
                              return <span className="text-[#DC2626]">Not Available</span>;
                            }
                          })()}
                          , {startEndDateString(each?.tgl_mulai || '', each?.tgl_selesai || '')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default PegawaiSection;
