import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { GetPeformaPegawaiData } from '../../../types/api/KeuanganDinasAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';

function PeformaPegawai() {
  const Cards = [
    {
      key: 'total_dinas_proses',
      title: 'Dinas',
      subTitle: 'Jumlah Dinas yang Diproses',
    },
    {
      key: 'total_dinas_selesai',
      title: 'Dinas',
      subTitle: 'Jumlah Dinas yang Selesai',
    },
    {
      key: 'total_dinas',
      title: 'Dinas',
      subTitle: 'Total Dinas',
    },
    {
      key: 'min_day_proses',
      title: 'Hari',
      subTitle: 'Minimal Melakukan Proses',
    },
    {
      key: 'max_day_proses',
      title: 'Hari',
      subTitle: 'Maksimal Melakukan Proses',
    },
    {
      key: 'avg_day_proses',
      title: 'Hari',
      subTitle: 'Rata-Rata Melakukan Proses',
    },
  ];

  const { data: summary, isValidating } = useCommonApi<null, GetPeformaPegawaiData>(
    KeuanganDinasAPI.GET_PEFORMA_PEGAWAI,
    null,
    { method: 'GET' }
  );

  return (
    <>
      <div className="mb-[24px] overflow-hidden rounded-lg bg-white shadow">
        <div className="my-4 px-7 py-1">
          <div className="mb-4 flex flex-row justify-between">
            <h3 className="text-lg font-medium text-gray-900">Peforma Pegawai</h3>
          </div>
          {!isValidating && (
            <div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {Cards.map((each, index) => (
                  <div
                    key={`cards-${index}`}
                    className="w-full items-center rounded-md border border-transparent bg-[#EEF2FF] px-5 py-3"
                  >
                    <div className="font-inter text-[20px] text-[#4F46E5]">
                      {summary?.[each.key as keyof GetPeformaPegawaiData] || 0} {each.title}
                    </div>
                    <div className="font-inter text-[13px] text-[#6B7280]">{each.subTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PeformaPegawai;
