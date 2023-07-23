import React from 'react';

import DaftarTransaksiDetail from './DaftarTransaksiDetail';
import DaftarTransaksiList from './DaftarTransaksiList';

function DaftarTransaksi() {
  const [detailPage, setDetailPage] = React.useState(false);

  const handleShowDetail = () => setDetailPage(true);

  const handleBack = () => setDetailPage(false);

  return (
    <>
      {detailPage ? (
        <DaftarTransaksiDetail onBack={handleBack} />
      ) : (
        <DaftarTransaksiList onShowDetail={handleShowDetail} />
      )}
    </>
  );
}

export default DaftarTransaksi;
