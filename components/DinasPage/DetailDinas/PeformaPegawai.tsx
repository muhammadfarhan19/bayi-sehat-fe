function PeformaPegawai() {
  const Cards = [
    {
      title: '12 Dinas',
      subTitle: 'Jumlah Dinas yang Diproses',
    },
    {
      title: '11 Dinas',
      subTitle: 'Jumlah Dinas yang Selesai',
    },
    {
      title: '23 Dinas',
      subTitle: 'Total Dinas',
    },
    {
      title: '7 Hari',
      subTitle: 'Minimal Melakukan Proses',
    },
    {
      title: '15 Hari',
      subTitle: 'Maksimal Melakukan Proses',
    },
    {
      title: '14,5 Hari',
      subTitle: 'Rata-Rata Melakukan Proses',
    },
  ];

  return (
    <>
      <div className="mb-[24px] overflow-hidden rounded-lg bg-white shadow">
        <div className="my-4 px-7 py-1">
          <div className="mb-4 flex flex-row justify-between">
            <h3 className="text-lg font-medium text-gray-900">Peforma Pegawai</h3>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3">
              {Cards.map((each, index) => (
                <div
                  key={`cards-${index}`}
                  className="w-full items-center rounded-md border border-transparent bg-[#EEF2FF] px-5 py-3"
                >
                  <div className="font-inter text-[20px] text-[#4F46E5]">{each.title}</div>
                  <div className="font-inter text-[13px] text-[#6B7280]">{each.subTitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PeformaPegawai;
