import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { KepegawaianAPI } from '../../../../../constants/APIUrls';
import { AgamaText, GenderText, StatusMenikahText } from '../../../../../constants/Resource';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostResetPasswordReq, PostResetPasswordRes } from '../../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import { CircleProgress } from '../../../../shared/CircleProgress';
import FileLoader from '../../../../shared/FileLoader';
import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import useAllowAdmin from '../../../../shared/hooks/useAllowAdmin';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import Loader from '../../../../shared/Loader/Loader';
import DataPribadiForm from './DataPribadiForm';

const LinkFile = ({ link, value }: { link?: string; value?: string }) => {
  if (!link) {
    return <>{value}</>;
  }
  return (
    <FileLoader uuid={link} asLink>
      <span className="whitespace-nowrap text-blue-500 underline">{value}</span>
    </FileLoader>
  );
};

function DataDiriPribadiPpnpn() {
  const dispatch = useDispatch();
  const { pegawai_id } = getQueryString();
  const isAllowAdmin = useAllowAdmin();
  const dataApiRes = usePersonalData();
  const [loading, setLoading] = React.useState(false);
  const [formModalState, setFormModalState] = React.useState<{ open: boolean }>({
    open: false,
  });

  const handleShowForm = (open: boolean) => {
    setFormModalState({ open });
  };

  if (!dataApiRes) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  const handleReset = async () => {
    setLoading(true);
    const resSubmit = await callAPI<PostResetPasswordReq, PostResetPasswordRes>(
      KepegawaianAPI.POST_RESET_PASSWORD,
      {
        nip: String(dataApiRes.nip),
        pegawai_id: Number(pegawai_id),
      },
      { method: 'put' }
    );

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Sukses! Password telah direset',
          type: SnackbarType.INFO,
        })
      );
      setLoading(false);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal memproses data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setLoading(false);
    }
  };

  return (
    <>
      {formModalState?.open ? (
        <DataPribadiForm
          onSuccess={() => window.location.reload()}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
        />
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead></thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { label: 'Unit Kerja', value: dataApiRes?.unit_kerja || '-' },
                // { label: 'NIP', value: dataApiRes?.nip || '-' },
                {
                  label: 'NIK',
                  value: <LinkFile link={dataApiRes.uuid_ktp?.[0]?.document_uuid} value={dataApiRes.ktp || '-'} />,
                },
                { label: 'Tempat, Tanggal Lahir', value: dataApiRes?.tempat_lahir + ', ' + dataApiRes?.tanggal_lahir },
                { label: 'Jabatan', value: dataApiRes?.jabatan || '-' },
                {
                  label: 'Jenis Kelamin',
                  value: dataApiRes?.jenis_kelamin ? GenderText[dataApiRes.jenis_kelamin] : '-',
                },
                { label: 'Agama', value: dataApiRes?.agama ? AgamaText[dataApiRes.agama] : 'Tidak dapat disebutkan' },
                { label: 'Golongan Darah', value: dataApiRes?.golongan_darah || '-' },
                { label: 'Nomer Ponsel', value: dataApiRes.hp || '-' },
                { label: 'Email', value: dataApiRes.email || '-' },
                { label: 'Alamat', value: dataApiRes.alamat || '-' },
                {
                  label: 'NPWP',
                  value: <LinkFile link={dataApiRes.uuid_npwp?.[0]?.document_uuid} value={dataApiRes.npwp || '-'} />,
                },
                {
                  label: 'BPJS Kesehatan',
                  value: <LinkFile link={dataApiRes.uuid_bpjs?.[0]?.document_uuid} value={dataApiRes.bpjs || '-'} />,
                },
                {
                  label: 'BPJS Ketenagakerjaan',
                  value: (
                    <LinkFile link={dataApiRes.uuid_bpjs_kt?.[0]?.document_uuid} value={dataApiRes.no_bpjs_kt || '-'} />
                  ),
                },
                {
                  label: 'Status Pernikahan',
                  value: dataApiRes?.status_menikah ? StatusMenikahText[dataApiRes.status_menikah] : '-',
                },
                { label: 'Jumlah Anak', value: dataApiRes.jumlah_anak + ' ' + 'Anak' },
                {
                  label: 'Badge Number',
                  value: dataApiRes?.badge_number ? dataApiRes?.badge_number : '-',
                },
              ].map((each, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2">
            {isAllowAdmin && (
              <button
                disabled={loading}
                onClick={handleReset}
                className="flex rounded-[6px] border-2 border-[#4F46E5] py-[9px] px-[17px] text-[#4F46E5] disabled:bg-gray-400"
              >
                {loading ? <CircleProgress /> : null}
                Reset Password
              </button>
            )}
            <a
              className="ml-1 inline-flex cursor-pointer items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
              onClick={() => handleShowForm(!formModalState.open)}
            >
              Edit
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default withErrorBoundary(DataDiriPribadiPpnpn);
