export interface GetKehadiranList {
  Peg_id?: number;
  User_id?: number;
  Alasan?: string;
  tgl_mulai?: string;
  tgl_selesai?: string;
  Unit_kerja_id?: number;
  page: number;
  per_page: number;
  status?: number;
}

export interface GetKehadiranDataList {
  list: [
    {
      id: number;
      user_id: number;
      nama: string;
      unit_kerja_id: number;
      unit_kerja_str: string;
      tanggal_klaim: string;
      jenis_pengajuan: string;
      alasan_klaim: string;
      status_klaim: number;
      status_klaim_str: string;
      alasan_tolak: string;
      files: [];
    }
  ];
  pagination: {
    total_page: number;
    total_data: number;
  };
}
// "data": {
//     "list": [
//         {
//             "id": 3,
//             "user_id": 51,
//             "nama": "Prof. Ir. Nizam, M.Sc., DIC. Ph.D.",
//             "unit_kerja_id": 1,
//             "unit_kerja_str": "Kemdikbud",
//             "tanggal_klaim": "2022-08-19",
//             "jenis_pengajuan": "MANTAP",
//             "alasan_klaim": "OK",
//             "status_klaim": 0,
//             "status_klaim_str": "Diproses",
//             "alasan_tolak": "",
//             "files": []
//         },
//         {
//             "id": 1,
//             "user_id": 51,
//             "nama": "Prof. Ir. Nizam, M.Sc., DIC. Ph.D.",
//             "unit_kerja_id": 1,
//             "unit_kerja_str": "Kemdikbud",
//             "tanggal_klaim": "2022-09-14",
//             "jenis_pengajuan": "Pulang",
//             "alasan_klaim": "sakit bro",
//             "status_klaim": 1,
//             "status_klaim_str": "Diterima",
//             "alasan_tolak": "",
//             "files": []
//         }
//     ],
//     "pagination": {
//         "total_page": 1,
//         "total_data": 2
//     }
// }
