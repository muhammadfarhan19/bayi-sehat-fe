import Image from "next/image";
const WorkInProgress = () => {
  return (
    <div className="bg-white text-center rounded-xl p-5 shadow">
      <div className="p-5"> 
        <img src="/img/undraw_work_in_progress_uhmv.svg" alt="" width="50%" className="mx-auto" />
      </div>
      <div className="p-5 font-sans text-gray-600">
        Aplikasi Website sedang dalam masa percobaan dan pengembangan. 
        <br />
        Untuk masukan fitur, saran dan pengaduan bisa melalui tautan berikut : <a href="https://bit.ly/formsaran-intra">bit.ly/formsaran-intra</a> 
      </div>
    </div>
  );
};

export default WorkInProgress;
