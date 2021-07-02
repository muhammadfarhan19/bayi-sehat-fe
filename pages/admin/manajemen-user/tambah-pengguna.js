import MainLayout from "../../../components/layouts/MainLayout";
import AddUser from "../../../components/admin/manajemen-user/AddUser";
import AdminNav from "../../../components/admin/AdminNav";

export default function User() {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <AdminNav />
                    <AddUser />
                </div>
            </div>
        </MainLayout>
    );
}
