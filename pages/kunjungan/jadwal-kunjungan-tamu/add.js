import { useRouter } from 'next/router';
import * as React from 'react';
import AddJadwalTamu from '../../../components/kunjungan/jadwal-kunjungan-tamu/AddJadwalTamu';
import MainLayout from '../../../components/layouts/MainLayout';
import ModuleNavigation from '../../../components/navigation/ModuleNavigation';
import { expiry } from '../../../components/shared/fetcher/FetcherHooks';

export default function AddKunjunganPage() {
    const router = useRouter();
    const [loadPage, setLoadPage] = React.useState(false);

    const check = expiry();

    React.useEffect(() => {
        (async () => {
            try {
                const checkExpiry = await check();
                if (checkExpiry.responseData.data !== null) {
                    setLoadPage(true);
                } else {
                    router.push('/login');
                }
            } catch (e) {
                router.push('/login');
            }
        })();
    }, []);


    if (!loadPage) {
        return <></>;
    }

    return (
        <MainLayout>
            <div className="w-full lg:px-4">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
                    <ModuleNavigation />
                    <AddJadwalTamu />
                </div>
            </div>
        </MainLayout>
    );
}