import BottomNav from "../components/BottomNav";
import MainLayout from "../components/layouts/MainLayout";
import WorkInProgress from "../components/WorkInProgress";

const kalendar = () => {
    return (
        <div>
            <MainLayout>
                <div className="bg-white p-5 rounded-md mb-3 text-center">
                    <p className="text-gray-600 ">
                        Kami sedang menyiapkan halaman ini untuk Anda. 
                    </p>
                </div>
                <WorkInProgress/>
                <BottomNav/>
            </MainLayout>
        </div>
    );
}

export default kalendar;
