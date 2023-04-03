import { RekapDinasAPI } from '../../../constants/APIUrls';
import { GetUpcomingData, GetUpcomingReq } from '../../../types/api/NotificationListAPI';
import { convertIndonesiaFormat } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from '../../shared/hooks/useCommonApi';

export default function NotificationListPage() {
  const { pegawai_id } = getQueryString<{ pegawai_id: string }>();

  const { data: notification } = useCommonApi<GetUpcomingReq, GetUpcomingData>(
    RekapDinasAPI.GET_DINAS_PEGAWAI_UPCOMING,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  const handleDetail = (data: any) => {
    let url = '';
    if (notification) {
      const lengthNotification = notification[data as keyof typeof notification].length;
      const dinasId = notification[data as keyof typeof notification]?.[0]?.dinas_id;
      if (lengthNotification > 1) {
        url = `/notification/detail?date=${data}`;
      } else {
        url = `/notification/detail?dinas_id=${dinasId}`;
      }
    }

    return (window.location.href = url);
  };

  return (
    <div className="mb-[24px] overflow-hidden rounded-lg bg-white pb-6 shadow">
      <div className="my-4 px-7 py-1">
        <h3 className="inline-flex text-xl font-semibold tracking-wider text-gray-700">
          <span className="relative inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[2rem]">
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute -top-1 right-0 inline-flex items-center justify-center rounded-full bg-red-600 px-1 py-1 text-[10px] font-bold leading-none text-red-100">
              {notification ? Object.keys(notification).length : '0'}
            </span>
          </span>

          <p className="ml-[12px]">Pengingat Jadwal Dinas!</p>
        </h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {notification ? (
            Object.keys(notification).map((each: string, index: number) => (
              <tr key={index} className="flex flex-col px-[24px] py-[16px]">
                <p className="text-[14px] text-[#4F46E5]">
                  Jangan lupa ya kamu ada{' '}
                  <span className="font-bold">{notification[each as keyof typeof notification].length} Kegiatan!</span>
                </p>
                <div className="flex flex-row">
                  <div className="mt-[8px] inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="my-auto h-[16px] w-[16px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <td className=" px-2 text-[14px] font-[400] text-[#6B7280]">{convertIndonesiaFormat(each)}</td>
                  </div>
                  <div onClick={() => handleDetail(each)} className="ml-auto inline-flex cursor-pointer gap-x-1">
                    <p className="my-auto text-[14px] text-[#4338CA]">Selengkapnya</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="my-auto h-[10px] w-[10px] text-[#4338CA]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </tr>
            ))
          ) : (
            <tr className="flex flex-col px-[24px] py-[16px]">
              <td className="text-[14px] text-[#4F46E5]">Kamu belum ada kegiatan!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
