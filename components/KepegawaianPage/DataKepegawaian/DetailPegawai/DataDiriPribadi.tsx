import React from 'react';

import { GenderText, StatusMenikahText } from '../../../../constants/Resource';
import FileLoader from '../../../shared/FileLoader';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import Loader from '../../../shared/Loader/Loader';

const LinkFile = ({ link, value }: { link?: string; value?: string }) => {
  if (!link) {
    return <>{value}</>;
  }
  return (
    <FileLoader uuid={link} asLink>
      <a className="ml-2 whitespace-nowrap text-blue-500 underline">{value}</a>
    </FileLoader>
  );
};

function DataDiriPribadi() {
  const dataApiRes = usePersonalData();

  if (!dataApiRes) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: 'Jenis Kelamin', value: dataApiRes?.jenis_kelamin ? GenderText[dataApiRes.jenis_kelamin] : '' },
            {
              label: 'Status Nikah',
              value: dataApiRes?.status_menikah ? StatusMenikahText[dataApiRes.status_menikah] : '',
            },
            { label: 'Jumlah Anak', value: dataApiRes.jumlah_anak },
            {
              label: 'KTP',
              value: <LinkFile link={dataApiRes.uuid_file_ktp} value={dataApiRes.ktp} />,
            },
            { label: 'Email', value: dataApiRes.email },
            { label: 'Alamat', value: dataApiRes.alamat },
            {
              label: 'NPWP',
              value: <LinkFile link={dataApiRes.uuid_file_npwp} value={dataApiRes.npwp} />,
            },
            {
              label: 'BPJS',
              value: <LinkFile link={dataApiRes.uuid_file_bpjs} value={dataApiRes.bpjs} />,
            },
            { label: 'Nomor HP', value: dataApiRes.nomor_hp },
          ].map((each, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-auto flex-col items-end">
        <a
          href={`/updateprofile?pegawai_id=${dataApiRes?.pegawai_id}`}
          className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
        >
          Edit
        </a>
      </div>
    </>
  );
}

export default withErrorBoundary<typeof DataDiriPribadi, unknown>(DataDiriPribadi);
