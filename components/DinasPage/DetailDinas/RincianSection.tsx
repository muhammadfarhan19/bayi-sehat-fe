import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { GetDetailPembayaranReq, PembayaranData } from '../../../types/api/KeuanganDinasAPI';
import { getQueryString } from '../../../utils/URLUtils';
import { formatAmount } from '../../../utils/Value';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';

function RincianSection() {
  const { dinas_id } = getQueryString<{ dinas_id: string; type: string }>();
  const { data, isValidating } = useCommonApi<GetDetailPembayaranReq, PembayaranData[]>(
    KeuanganDinasAPI.GET_DETAIL_PEMBAYARAN,
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

  if (!data || !(data || []).length) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white py-4 shadow">
      <div className="flex cursor-pointer flex-row items-center justify-between px-6">
        <span className="text-lg font-medium text-gray-900">Rincian Keuangan</span>
      </div>
      <div className="flex flex-col flex-nowrap space-y-2 pt-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    {[
                      [
                        ['No', '3', '1'],
                        ['Nama', '3', '1'],
                        ['Gol', '3', '1'],
                        ['Tusi', '3', '1'],
                        ['Jenis pengeluaran', '1', '5'],
                        ['Pajak', '3', '1'],
                        ['Lain-Lain', '3', '1'],
                        ['Jumlah Bersih', '3', '1'],
                        ['Jumlah PJ', '3', '1'],
                        ['Nomer rekening', '3', '1'],
                        ['Nama Bank', '3', '1'],
                        ['a.n Pemilik Rekening', '3', '1'],
                      ],
                      [
                        ['Jasa Profesi (522151)', '1', '2'],
                        ['Perjalanan (524119)', '1', '3'],
                      ],
                      [
                        ['Honorarium Narasumber', '1', '1'],
                        ['Waktu', '1', '1'],
                        ['Total Honorarium', '1', '1'],
                        ['Uang harian', '1', '1'],
                        ['Transport / Representasi', '1', '1'],
                      ],
                    ].map((rowItems, rowIndex) => {
                      return (
                        <tr key={`headerRow${rowIndex}`}>
                          {rowItems.map((each, index) => (
                            <th
                              key={`header${rowIndex}${index}`}
                              rowSpan={Number(each[1])}
                              colSpan={Number(each[2])}
                              scope="col"
                              className="border-b-[1px] px-3 py-2 text-center text-xs font-semibold uppercase text-gray-700"
                            >
                              {each[0]}
                            </th>
                          ))}
                        </tr>
                      );
                    })}
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(() => {
                      const totals = [0, 0, 0, 0, 0, 0, 0];
                      const detailRows = (data || []).map((each, rowIndex) => (
                        <tr key={`itemRow${rowIndex}`}>
                          <td rowSpan={1} colSpan={1} className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                            {rowIndex + 1}.
                          </td>
                          {[
                            ['nama', 'string', ''],
                            ['gol', 'string', ''],
                            ['tusi', 'string', ''],
                            ['honorarium_sumber', 'string', ''],
                            ['waktu', 'string', ''],
                            ['total_honorarium', 'amount', '0'],
                            ['uang_harian', 'amount', '1'],
                            ['transport', 'amount', '2'],
                            ['pajak', 'amount', '3'],
                            ['lainnya', 'amount', '4'],
                            ['jumlah_bersih', 'amount', '5'],
                            ['jumlah_pj', 'amount', '6'],
                            ['no_rekening', 'string', ''],
                            ['nama_bank', 'string', ''],
                            ['atas_nama_rekening', 'string', ''],
                          ].map((fields, index) => (
                            <td
                              key={`itemCol${rowIndex}${index}`}
                              rowSpan={1}
                              colSpan={1}
                              className="whitespace-nowrap px-3 py-4 text-xs text-gray-500"
                            >
                              {(() => {
                                const value = each[fields[0] as keyof typeof each];
                                if (fields[1] === 'amount') {
                                  totals[Number(fields[2])] += Number(value);
                                  return formatAmount((value || 0).toString());
                                }
                                return value || '-';
                              })()}
                            </td>
                          ))}
                        </tr>
                      ));

                      const totalRow = (
                        <tr key="totalRow">
                          <td
                            rowSpan={1}
                            colSpan={6}
                            className="whitespace-nowrap px-3 py-4 text-center text-xs text-gray-500"
                          >
                            Jumlah
                          </td>
                          {totals.map(each => (
                            <td rowSpan={1} colSpan={1} className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                              {formatAmount((each || 0).toString())}
                            </td>
                          ))}
                          <td colSpan={3} />
                        </tr>
                      );

                      return [detailRows, totalRow];
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RincianSection;
