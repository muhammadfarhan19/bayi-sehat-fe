import UserNav from "../../components/user/UserNav";
import UserList from "../../components/user/UserList";
import MainLayout from "../../components/layouts/MainLayout";

export default function User() {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <div className="grid grid-cols-1 gap-4 lg:col-span-1">
                        <section aria-labelledby="section-1-title">
                            <h2 className="sr-only" id="section-1-title">
                                Kepegawaian
                            </h2>
                            <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                                <UserNav />
                            </div>
                        </section>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="section-2-title">
                            <h2 className="sr-only" id="section-2-title">
                                Section title
                            </h2>
                            <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                                {/* <div className="flex"> */}
                                    <div className="overflow-x-auto sm:mx-0 ">
                                        <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                            <UserList />
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
