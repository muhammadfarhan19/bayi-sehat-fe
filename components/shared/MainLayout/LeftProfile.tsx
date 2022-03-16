import { ClockIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/outline';
import React from 'react';

import { classNames } from '../../../utils/Components';

function LeftProfile() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-col px-4 py-4">
          <div className="flex-shrink-0 self-center">
            <img
              className="inline-block h-24 w-24 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center pt-4">
            <h4 className="my-1 text-sm font-bold text-indigo-700">Dr. Ir. Paristiyanti Nurwardani, M.P.</h4>
            <h4 className="text-xs">Sekretaris Direktorat Jenderal DIKTI</h4>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-col px-4 py-4">
          <div className="font-semibold tracking-wide">Kegiatan hari ini</div>
          <div className="text-sm">Berikut adalah kegiatan Anda hari ini</div>
          <div className="my-3 w-full border-t border-gray-300" />
          {[0, 1].map((each, index) => (
            <React.Fragment key={index}>
              <div className="flex">
                <div className="inline-flex items-center space-x-1">
                  <span className="text-sm font-medium leading-5 text-indigo-500">
                    Rapat Pengembangan Sistem Manajemen Reviewer
                  </span>
                  <span
                    className={classNames(
                      'bg-green-100 text-green-800',
                      'rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
                    )}
                  >
                    {'Success'}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex space-x-3">
                <span className="inline-flex items-center text-xs">
                  <div className="inline-flex items-center space-x-1 text-gray-500">
                    <UsersIcon className="h-5 w-5" aria-hidden="true" />
                    <span>Tata Usaha</span>
                  </div>
                </span>
                <span className="inline-flex items-center text-xs">
                  <div className="inline-flex items-center space-x-1 text-gray-500">
                    <LocationMarkerIcon className="h-5 w-5" aria-hidden="true" />
                    <span>Luring</span>
                  </div>
                </span>
                <span className="inline-flex items-center text-xs">
                  <div className="inline-flex items-center space-x-1 text-gray-500">
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    <span>11:00 - 12:00 WIB</span>
                  </div>
                </span>
              </div>
              <div className="my-3 w-full border-t border-gray-300" />
            </React.Fragment>
          ))}
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Lihat Kalender
          </a>
        </div>
      </div>
    </div>
  );
}

export default LeftProfile;
