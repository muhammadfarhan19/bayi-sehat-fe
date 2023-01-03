import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import * as React from 'react';

import { RekapDinasAPI } from '../../../constants/APIUrls';
import { GetRekapDetailReq, RekapDetailData } from '../../../types/api/RekapDinasAPI';
import { classNames } from '../../../utils/Components';
import { formatStringDate, startEndDateString } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';
import FileLoader from '../../shared/FileLoader';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';

function DinasSection() {
  const { dinas_id } = getQueryString<{ dinas_id: string; type: string }>();
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
              <span className="text-lg font-medium text-gray-900">Detail Dinas</span>
              <ChevronUpIcon
                className={classNames(
                  open ? 'rotate-180 text-indigo-700' : 'text-indigo-600',
                  'h-6 w-6 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="div" className="flex flex-col flex-nowrap space-y-2 pt-6">
              {[
                { label: 'Unit Kerja', content: <>{data?.unit_kerja_str}</> },
                {
                  label: 'Nomor Surat',
                  content: (
                    <>
                      {data?.surat_tugas && data?.surat_tugas.length ? (
                        <FileLoader uuid={data?.surat_tugas?.[0]?.document_uuid} asLink>
                          <span className="cursor-pointer text-indigo-600 underline">{data?.no_sp}</span>
                        </FileLoader>
                      ) : (
                        <span className="cursor-pointer text-indigo-600 underline">{data?.no_sp}</span>
                      )}
                    </>
                  ),
                },
                {
                  label: 'Tanggal Surat',
                  content: <>{formatStringDate(data?.tgl_surat || '', 'dd MMM yyyy')}</>,
                },
                {
                  label: 'Tanggal Dinas',
                  content: <>{startEndDateString(data?.tgl_mulai || '', data?.tgl_selesai || '')}</>,
                },
                { label: 'Jenis Dinas', content: <>{data?.jenis_dinas}</> },
                { label: 'Lokasi Dinas', content: <>{data?.lokasi}</> },
                { label: 'PIC BP', content: <>{data?.pic}</> },
                { label: 'PIC PUMK', content: <>{data?.pic_pumk}</> },
                { label: 'PIC Kegiatan', content: <>{data?.pic}</> },
                { label: 'Isi Penugasan', content: <>{data?.isi_penugasan}</> },
                {
                  label: 'Surat Tugas',
                  content: (
                    <>
                      {`${data?.no_sp} `}
                      {data?.surat_tugas && data?.surat_tugas.length && (
                        <FileLoader uuid={data?.surat_tugas?.[0]?.document_uuid} asLink>
                          <span className="cursor-pointer text-indigo-600 underline">Lihat</span>
                        </FileLoader>
                      )}
                    </>
                  ),
                },
              ].map((each, index, collections) => (
                <React.Fragment key={`content${index}`}>
                  <div className="flex px-6">
                    <span className="shrink grow basis-5/12 text-gray-700 sm:basis-3/12">{each.label}</span>
                    <div className="grow basis-7/12 sm:basis-9/12">{each.content}</div>
                  </div>
                  {collections.length - 1 !== index && <div className="border-t-[1px] border-solid" />}
                </React.Fragment>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default DinasSection;
