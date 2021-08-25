
const menu = [
    {
      name: "Dashboard",
      href: "/kepegawaian",
      current: true,
    },
    {
      name: "Pegawai",
      // href:'#',
      current: false,
      children: [
        {
          name: "Laporan",
          href: "/profil/kepegawaian/kehadiran",
          current: "false",
        },
        {
          name: "Daftar Kehadiran",
          href: "/profil/kepegawaian/cuti",
          current: "false",
        },
        {
          name: "Klaim Kehadiran",
          href: "/profil/kepegawaian/dinas",
          current: "false",
        },
      ],
    },
    {
      name: "Kehadiran",
      // href:'#',
      current: false,
      children: [
        {
          name: "Laporan",
          href: "/profil/kepegawaian/kehadiran",
          current: "false",
        },
        {
          name: "Daftar Kehadiran",
          href: "/profil/kepegawaian/cuti",
          current: "false",
        },
        {
          name: "Klaim Kehadiran",
          href: "/profil/kepegawaian/dinas",
          current: "false",
        },
      ],
    },
    {
      name: "Cuti",
      // href:'#',
      current: false,
      children: [
        {
          name: "Laporan",
          href: "/profil/kepegawaian/kehadiran",
          current: "false",
        },
        {
          name: "Saldo Cuti",
          href: "/profil/kepegawaian/cuti",
          current: "false",
        },
        {
          name: "Realisasi SKP",
          href: "/profil/kepegawaian/dinas",
          current: "false",
        },
      ],
    },
  ];
  export default menu;