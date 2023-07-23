import React from 'react';

import DaftarTransaksiDetail from './DaftarTransaksiDetail';
import DaftarTransaksiList from './DaftarTransaksiList';

function DaftarTransaksi() {
  const [detailPage, setDetailPage] = React.useState<{ show: boolean; date?: Date }>({
    show: false,
    date: undefined,
  });

  const handleShowDetail = (show: boolean, date?: Date) => {
    return setDetailPage({
      show,
      date,
    });
  };

  const handleBack = () => {
    return setDetailPage({
      show: false,
      date: undefined,
    });
  };

  return (
    <>
      {detailPage?.show ? (
        <DaftarTransaksiDetail selectedDate={detailPage?.date} onBack={handleBack} />
      ) : (
        <DaftarTransaksiList onShowDetail={handleShowDetail} />
      )}
    </>
  );
}

export default DaftarTransaksi;
