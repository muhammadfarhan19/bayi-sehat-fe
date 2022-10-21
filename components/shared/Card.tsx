interface Card {
    data: string;
    link: string;
    title: string;
    sub_title: string;
    load: boolean;
}

export default function Card(props: Card) {
    const { data, link, title, sub_title, load } = props

    if (load) {
        return (
            <div
                className="flex flex-col rounded-[7px] animate-pulse"
                style={{ boxShadow: '0px 0.878466px 2.6354px rgba(0, 0, 0, 0.1), 0px 0.878466px 1.75693px rgba(0, 0, 0, 0.06)' }}
            >
                <div className="px-[21px] flex flex-row bg-white gap-x-[17px] py-[25px]">
                    <div className="bg-[#6366F1] rounded-[5px] w-[51px] h-[51px] flex my-auto">
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                        <div className="bg-gray-300 h-[18px] w-32" />
                        <div className="bg-gray-300 h-[18px] w-24" />
                    </div>
                </div>
                <div className="bg-[#F9FAFB] px-[21px] py-[14px]">
                    <div className="bg-gray-300 h-[18px] w-32" />
                </div>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col rounded-[7px]"
            style={{ boxShadow: '0px 0.878466px 2.6354px rgba(0, 0, 0, 0.1), 0px 0.878466px 1.75693px rgba(0, 0, 0, 0.06)' }}
        >
            <div className="px-[21px] flex flex-row bg-white gap-x-[17px] py-[25px]">
                <div className="bg-[#6366F1] rounded-[5px] w-[51px] h-[51px] flex my-auto">
                    <p className="text-gray-50 font-bold text-[24px] my-auto mx-auto">{data || '-'}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-[#111827] text-[22px] font-[600]">{title}</p>
                    <p className="text-[#6B7280] text-[14px]">{sub_title}</p>
                </div>
            </div>
            <div className="bg-[#F9FAFB] px-[21px] py-[14px]">
                <a className="text-[#4F46E5] text-[14px]" href={link}>Lihat Selengkapnya</a>
            </div>

        </div>
    )
}