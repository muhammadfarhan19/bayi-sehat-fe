function TambahLogKegiatan(props) {
  return (
    <div className="rounded-lg bg-white overflow-hidden shadow mb-3 p-5">
      <h3 className="text-lg font-semibold mb-3">Log Kegiatan</h3>
      <div className="mb-3">
        <label
          htmlFor="judul"
          className="block text-sm font-medium text-gray-700"
        >
          Tanggal
        </label>
        <div className="mt-1">
          <input
            type="date"
            id="judul"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="judul"
          className="block text-sm font-medium text-gray-700"
        >
          Judul
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="judul"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="deskripsi"
          className="block text-sm font-medium text-gray-700"
        >
          Deskripsi
        </label>
        <div className="mt-1">
          <textarea
            type="text"
            id="deskripsi"
            rows="5"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
  
      <div className="mb-3">
        <label
          htmlFor="deskripsi"
          className="block text-sm font-medium text-gray-700"
        >
          Lampiran
        </label>
        <input type="file" />
      </div>
  
      <div className="float-right">
        <button className="my-1 items-center  block py-2 px-8 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Simpan
        </button>
      </div>
    </div>
  );
}

export default TambahLogKegiatan;
