import React from 'react';

import useAllowAdminDinas from '../../shared/hooks/useAllowAdminDinas';

const AdminDinasAccess = () => {
  const isAdminDinas = useAllowAdminDinas();
  if (isAdminDinas) {
    return (
      <div className="flex w-full">
        <button
          className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
          onClick={() => (window.location.href = '/kepegawaian/rekap-dinas?type=add')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Tambah Dinas
        </button>
      </div>
    );
  }
  return null;
};

export default AdminDinasAccess;
