import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { KepegawaianAPI } from '../../../../../constants/APIUrls';
import { StatusPNSText } from '../../../../../constants/Resource';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostResetPasswordReq, PostResetPasswordRes } from '../../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import { CircleProgress } from '../../../../shared/CircleProgress';
import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import useAllowAdmin from '../../../../shared/hooks/useAllowAdmin';
import useAllowSuperAdmin from '../../../../shared/hooks/useAllowSuperAdmin';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import Loader from '../../../../shared/Loader/Loader';
import KarpegModal from './KarpegModal';
import { BadgeNumberModalType, BadgeNumberUpdate } from './Shared';

function DataDiriPegawai() {
  const { pegawai_id, type } = getQueryString();
  const dataPersonal = usePersonalData();
  const isAllowAdmin = useAllowAdmin();
  const isAllowSuperAdmin = useAllowSuperAdmin().isAllowSuperAdminAccessFilter;

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  /**
   * @state Badge Number Tray
   */
  const [isShownBadgeUpdate, setIsShownBadgeUpdate] = React.useState<BadgeNumberModalType>({
    open: false,
    selectedPegawai: undefined,
    selectedPegawaiName: undefined,
    selectedPegawaiNip: undefined,
    selectedPegawaiBadge: undefined,
  });

  /**
   * @description Handler function for Badge Number
   */
  const handleShowForm = (
    open: boolean,
    selectedPegawai?: number,
    selectedPegawaiName?: string,
    selectedPegawaiNip?: string,
    selectedPegawaiBadge?: string
  ) => {
    setIsShownBadgeUpdate({
      open,
      selectedPegawai,
      selectedPegawaiName,
      selectedPegawaiNip,
      selectedPegawaiBadge,
    });
  };

  const handleSetForm = () => {
    handleShowForm(
      !isShownBadgeUpdate.open,
      dataPersonal?.pegawai_id,
      dataPersonal?.nama,
      dataPersonal?.nip,
      dataPersonal?.badge_number
    );
  };
  /**
   * @component Precalculate before return
   */
  const BadgeNumberComponent = isShownBadgeUpdate.open ? (
    <BadgeNumberUpdate
      open={isShownBadgeUpdate.open}
      selectedPegawai={isShownBadgeUpdate.selectedPegawai}
      setOpen={(open: boolean) => handleShowForm(open)}
      pegawaiName={isShownBadgeUpdate.selectedPegawaiName}
      pegawaiNip={isShownBadgeUpdate.selectedPegawaiNip}
      badgeNumberValue={isShownBadgeUpdate.selectedPegawaiBadge}
    />
  ) : null;
  const CTAModalBadgeNumber = isAllowSuperAdmin ? (
    <button
      onClick={handleSetForm}
      className="ml-5 rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-gray-400"
    >
      Badge Number
    </button>
  ) : null;
  const CTAContainerStyle = `mt-5 flex ${isAllowSuperAdmin ? 'justify-between' : 'justify-end'} gap-2`;
  /**
   * @description Badge Number display value fallback dash
   */
  const badgeNumberValue = dataPersonal?.badge_number ?? '-';
  /**
   * @end
   */

  if (!dataPersonal) {
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
        nip: String(dataPersonal.nip),
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: 'Unit Kerja', value: dataPersonal.unit_kerja },
            { label: 'NIP/NIP Lama', value: dataPersonal.nip },
            { label: 'Tempat, Tanggal Lahir', value: `${dataPersonal.tempat_lahir}, ${dataPersonal.tanggal_lahir}` },
            { label: 'TMT CPNS', value: dataPersonal.tmt_cpns },
            {
              label: 'Status CPNS/PNS',
              value: dataPersonal?.status_cpns ? StatusPNSText[dataPersonal.status_cpns] : '',
            },
            { label: 'Jabatan', value: dataPersonal.jabatan },
            { label: 'Golongan', value: dataPersonal.golongan },
            { label: 'TMT Golongan', value: dataPersonal.tmt_golongan },
            { label: 'Pangkat', value: dataPersonal.pangkat },
            { label: 'Masa Kerja', value: dataPersonal.masa_kerja },
            { label: 'Masa Kerja Kepangkatan', value: dataPersonal.masa_kerja_kepangkatan },
            {
              label: 'Karpeg',
              value: <KarpegModal />,
            },
            {
              label: 'Badge Number',
              value: badgeNumberValue,
            },
          ].map((each, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={CTAContainerStyle}>
        {CTAModalBadgeNumber}
        <div className="flex justify-end gap-2">
          {isAllowAdmin && (
            <>
              <button
                disabled={loading}
                onClick={handleReset}
                className="flex rounded-[6px] border-2 border-[#4F46E5] py-[9px] px-[17px] text-[#4F46E5] disabled:bg-gray-400"
              >
                {loading ? <CircleProgress /> : null}
                Reset Password
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/kepegawaian/data-pegawai/update-data?pegawai_id=${pegawai_id}&type=${type}`)
                }
                className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-gray-400"
              >
                Perbaharui Data
              </button>
            </>
          )}
        </div>
      </div>
      {BadgeNumberComponent}
    </>
  );
}

export default withErrorBoundary(DataDiriPegawai);
