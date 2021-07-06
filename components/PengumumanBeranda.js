const PengumumanBeranda = () => {
  return (
    <div className="rounded-lg bg-white overflow-hidden shadow mb-3 p-5">
      <h3 className="text-lg font-bold mb-3 text-center sm:text-left">Pengumuman</h3>
      <h4 className="font-medium">Working From Home</h4>
      <p className="text-sm">Meninjau peningkatan Covid-9 maka Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quam ullam laboriosam pariatur inventore dicta omnis? Doloribus, ratione sequi sed, veniam asperiores dicta, fugiat cupiditate delectus quas doloremque quasi voluptatibus!</p>
      <a href="#" className="text-xs text-indigo-600 hover:underline">Lebih lengkap</a>
      <div className="flex justify-center">
        <button className="rounded-full text-xs h-7 w-7 flex mx-1 text-gray-50 items-center justify-center bg-gray-700">1</button>
        <button className="rounded-full text-xs h-7 w-7 flex mx-1 text-gray-700 items-center justify-center bg-gray-50 hover:bg-gray-200">2</button>
        <button className="rounded-full text-xs h-7 w-7 flex mx-1 text-gray-700 items-center justify-center bg-gray-50 hover:bg-gray-200">3</button>
        <button className="rounded-full text-xs text-gray-700 mx-1 bg-gray-50 hover:bg-gray-200 px-4">Lihat semua</button>
      </div>
    </div>
  );
};

export default PengumumanBeranda;
