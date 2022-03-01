import DataKepegawaian from "../../../components/KepegawaianPage/DataKepegawaian/DataKepegawaian";
import DetailPegawai from "../../../components/KepegawaianPage/DataKepegawaian/DetailPegawai/DetailPegawai";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";

export default function DataPegawai(props) {
    const menu = [
        { name: 'Dashboard', href: '/kepegawaian' },
        {
            name: 'Pegawai',
            href: '#',
            current: false,
            children: [
                { name: 'Data Pegawai', href: '/kepegawaian/data-pegawai', current: true },
                { name: 'Daftar Jabatan', href: '#', current: false },
                { name: 'Peta Jabatan', href: '#', current: false },
            ],
        },
    ]

    return (
        <MainLayout>
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
                <ModuleNavigation menu={menu} />

                <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                    <section aria-labelledby="section-1-title">
                        <div>
                            {typeof props.nip === 'undefined' ? <DataKepegawaian /> : <DetailPegawai />}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>

    )
}

DataPegawai.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        nip: query ? query.nip : ''
    };
};
