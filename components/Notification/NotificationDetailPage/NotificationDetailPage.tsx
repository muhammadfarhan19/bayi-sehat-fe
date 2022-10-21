import React from 'react';

import { RekapDinasAPI } from '../../../constants/APIUrls';
import { GetUpcomingData, GetUpcomingReq } from '../../../types/api/NotificationListAPI';
import { convertIndonesiaFormat } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from '../../shared/hooks/useCommonApi';

export default function NotificationDetailPage() {
  const { date, pegawai_id } = getQueryString<{ date: string; pegawai_id: string }>();

  const { data: notification } = useCommonApi<GetUpcomingReq, GetUpcomingData>(
    RekapDinasAPI.GET_DINAS_PEGAWAI_UPCOMING,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  if (notification) {
    if (!Object.keys(notification).filter(each => each === date).length) {
      window.location.href = '/';
    }
  }

  return (
    <div className="mb-[24px] overflow-hidden rounded-lg bg-white pb-6 shadow">
      <div className="my-4 px-7 py-1">
        <p className="text-[14px]">Daftar Kegiatan kamu pada {convertIndonesiaFormat(date)}</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {notification ? (
            notification[date as keyof typeof notification].map(each => (
              <tr className="flex flex-col px-[24px] py-[16px]">
                <p className="text-[14px] text-[#4F46E5]">{each.isi_penugasan}</p>
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
                  <td className=" px-2 text-[14px] font-[400] text-[#6B7280]">
                    {convertIndonesiaFormat(each.tgl_mulai)} - {convertIndonesiaFormat(each.tgl_selesai)}
                  </td>
                </div>
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
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                    <td className=" px-2 text-[14px] font-[400] text-[#6B7280]">{each.jenis_dinas}</td>
                  </div>
                  <div
                    onClick={() => (window.location.href = `/notification/detail?dinas_id=${each.dinas_id}`)}
                    className="ml-auto inline-flex cursor-pointer gap-x-1"
                  >
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
              <p className="text-[14px] text-[#4F46E5]">Kamu belum ada kegiatan!</p>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
