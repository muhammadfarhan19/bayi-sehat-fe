import MainLayout from "../../../components/layouts/MainLayout";
import AdminNav from "../../../components/admin/AdminNav";
import UserList from "../../../components/admin/manajemen-user/UserList";

export default function User() {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <AdminNav />
                    <UserList />
                </div>
            </div>
        </MainLayout>
    );
}
