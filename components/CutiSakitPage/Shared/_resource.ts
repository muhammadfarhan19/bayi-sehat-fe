export const StatusPengajuan = {
  Ditolak: -1,
  Diajukan: 1,
  Diterima: 2,
};

export const StatusText = {
  Ditolak: 'Ditolak',
  Diajukan: 'Diproses',
  Diterima: 'Diterima',
};

/**
 * Back-End Contract
 * 1 - Cuti Tahunan
 * 2 - Cuti Sakit
 * 3 - Cuti Besar
 * 4 - Cuti Karena Alasan Penting
 * 5 - Cuti Diluar Tanggungan Negara
 * 6 - Cuti Melahirkan
 */
export const PengajuanType = [
  {
    value: 3,
    text: 'Cuti Besar',
  },
  {
    value: 4,
    text: 'Cuti Karena Alasan Penting',
  },
  {
    value: 5,
    text: 'Cuti Diluar Tanggungan Negara',
  },
  {
    value: 6,
    text: 'Cuti Melahirkan',
  },
];
