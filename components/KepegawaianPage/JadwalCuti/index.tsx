import React from 'react';

import { PegawaiData } from '../../../types/api/KepegawaianAPI';
import ListPnsPpnpn from '../ListPegawai/ListPnsPpnpn';
import JadwalCutiModal from './JadwalCutiModal';

export default function JadwalCuti() {
  const [pegawaiData, setPegawaiData] = React.useState<PegawaiData>();
  const [isShownModal, setIsShownModal] = React.useState(false);

  const handleShowForm = (open: boolean) => {
    setIsShownModal(open);
    setPegawaiData(undefined);
  };

  return (
    <>
      <ListPnsPpnpn
        isShownCutiCell={true}
        onClickEachPpnpn={ppnpnData => {
          setPegawaiData(ppnpnData);
        }}
        onClickEachPns={pnsData => {
          setPegawaiData(pnsData);
        }}
        buttonTitle="Buat Cuti"
        isShownNipCell={false}
      />
      <JadwalCutiModal open={isShownModal || !!pegawaiData} data={pegawaiData} setOpen={handleShowForm} />
    </>
  );
}
