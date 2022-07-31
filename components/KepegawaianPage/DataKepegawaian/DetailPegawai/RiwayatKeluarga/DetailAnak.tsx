import { ChevronLeftIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';

import { RiwayatAnakAPI } from '../../../../../constants/APIUrls';
import { GetAnakList, GetAnakListRes } from '../../../../../types/api/RiwayatKeluargaAPI';
import FileLoader from '../../../../shared/FileLoader';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';

type DetailAnakProps = {
  riwayatAnakId?: number;
  onBack: () => void;
};

export default function DetailAnak(props: DetailAnakProps) {
  const { onBack, riwayatAnakId } = props;
  const personalPegawaiData = usePersonalData();
  const [religionState, setRegiligionState] = React.useState<React.SetStateAction<string>>();

  const { data: detailAnak } = useCommonApi<GetAnakList, GetAnakListRes[]>(
    RiwayatAnakAPI.GET_RIWAYAT_ANAK_LIST,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id), pasangan_id: Number(riwayatAnakId) },
    { method: 'GET' }
  );

  const dataSelected = detailAnak?.map(data => data?.agama);

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

  React.useEffect(() => {
    if (Number(dataSelected) === 1) {
      setRegiligionState('Buddha');
    } else if (Number(dataSelected) === 2) {
      setRegiligionState('Hindu');
    } else if (Number(dataSelected) === 3) {
      setRegiligionState('Islam');
    } else if (Number(dataSelected) === 4) {
      setRegiligionState('Katolik');
    } else if (Number(dataSelected) === 5) {
      setRegiligionState('Protestan');
    } else if (Number(dataSelected) === 6) {
      setRegiligionState('Tidak dapat disebutkan');
    }
  }, [Number(dataSelected)]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
          <ChevronLeftIcon className="mr-1 h-5" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
      </div>
      {detailAnak?.map(data => (
        <div>
          <span className="mb-2 text-[24px] font-[600]">Data Anak</span>
          <table key={data.anak_id} className="min-w-full divide-y divide-gray-200">
            <thead></thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { label: 'Nama', value: data?.nama },
                { label: 'Tempat Lahir', value: data?.tempat_lahir },
                { label: 'Tanggal Lahir', value: format(new Date(data?.tanggal_lahir), 'yyyy-MM-dd') },
                { label: 'Jenis Kelamin', value: data?.jenis_kelamin === 1 ? 'Laki-Laki' : 'Perempuan' },
                { label: 'Agama', value: religionState },
                { label: 'No Hp', value: data?.no_hp.length === 0 ? '-' : data?.no_hp },
                { label: 'NIK', value: data?.nik.length === 0 ? '-' : data?.nik },
                {
                  label: 'Kartu Identitas',
                  value:
                    data.files[0].document_name.length === 0 ? (
                      '-'
                    ) : (
                      <div className="flex flex-row items-center space-x-2">
                        <PDFIcon />
                        <LinkFile link={data?.files?.[0].document_uuid} value={data?.files?.[0].document_name} />
                      </div>
                    ),
                },
                { label: 'Alamat', value: data?.alamat },
                {
                  label: 'Nomor Akta Kelahiran',
                  value: data?.no_akta_kelahiran.length === 0 ? '-' : data?.no_akta_kelahiran,
                },
                {
                  label: 'Akta Kelahiran',
                  value:
                    data.files[1].document_name.length === 0 ? (
                      '-'
                    ) : (
                      <div className="flex flex-row items-center space-x-2">
                        <PDFIcon />
                        <LinkFile link={data?.files?.[1].document_uuid} value={data?.files?.[1].document_name} />
                      </div>
                    ),
                },
                { label: 'Status Hidup', value: data?.status_hidup === 1 ? 'Hidup' : 'Wafat' },
                { label: 'Nomer NPWP', value: data?.npwp.length === 1 ? '-' : data?.npwp },
              ].map((each, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
