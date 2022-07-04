import { RiwayatDiklatAPI } from '../../../../../constants/APIUrls';
import { GetRiwayatDiklatListReq, RiwayatDiklatListData } from '../../../../../types/api/RiwayatDiklatAPI';
import { getQueryString } from '../../../../../utils/URLUtils';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import UploadWrapper from '../../../../shared/Input/UploadWrapper';

export default function RiwayatGolongan() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();

  const { data: riwayatDiklat, mutate } = useCommonApi<GetRiwayatDiklatListReq, RiwayatDiklatListData[]>(
    RiwayatDiklatAPI.GET_RIWAYAT_DIKLAT_LIST,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Jenis KP
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Golongan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TMT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Masa Kerja
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Berkas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(riwayatDiklat || []).map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.nama_diklat}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{'III/a'}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{'22 September 2002'}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{'0 TAHUN 0 BULAN'}</td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">
                  <a href="#" className="flex items-center text-blue-600 underline hover:text-blue-500">
                    <PDFIcon />
                    <span className="w-1" />
                    {'Surat Keputusan'}
                  </a>
                </td>
                <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <UploadWrapper
                      allowedTypes={['pdf']}
                      handleUploadChange={() => {
                        mutate();
                      }}
                    >
                      {({ loading }) => (
                        <button
                          type="button"
                          className="flex w-[150px] justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200"
                        >
                          {loading ? <CircleProgress /> : null}
                          Unggah berkas
                        </button>
                      )}
                    </UploadWrapper>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
