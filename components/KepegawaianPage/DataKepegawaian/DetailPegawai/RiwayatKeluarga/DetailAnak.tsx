import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { RiwayatAnakAPI } from '../../../../../constants/APIUrls';
import { GetAnakList, GetAnakListRes } from '../../../../../types/api/RiwayatKeluargaAPI';
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
                { label: 'Tanggal Lahir', value: data?.tanggal_lahir },
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
                        <h6> {data.files[0].document_name}</h6>
                      </div>
                    ),
                },
                { label: 'Alamat', value: 'Jalan Jalan' },
                { label: 'Nomor Akta Kelahiran', value: '22222-9999' },
                {
                  label: 'Akta Kelahiran',
                  value:
                    data.files[1].document_name.length === 0 ? (
                      '-'
                    ) : (
                      <div className="flex flex-row items-center space-x-2">
                        <PDFIcon />
                        <h6> {data.files[0].document_name}</h6>
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
