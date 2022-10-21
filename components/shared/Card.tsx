interface Card {
  data: string;
  link: string;
  title: string;
  sub_title: string;
  load: boolean;
}

export default function Card(props: Card) {
  const { data, link, title, sub_title, load } = props;

  if (load) {
    return (
      <div
        className="flex animate-pulse flex-col rounded-[7px]"
        style={{
          boxShadow: '0px 0.878466px 2.6354px rgba(0, 0, 0, 0.1), 0px 0.878466px 1.75693px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="flex flex-row gap-x-[17px] bg-white px-[21px] py-[25px]">
          <div className="my-auto flex h-[51px] w-[51px] rounded-[5px] bg-[#6366F1]"></div>
          <div className="flex flex-col gap-y-[10px]">
            <div className="h-[18px] w-32 bg-gray-300" />
            <div className="h-[18px] w-24 bg-gray-300" />
          </div>
        </div>
        <div className="bg-[#F9FAFB] px-[21px] py-[14px]">
          <div className="h-[18px] w-32 bg-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-[7px]"
      style={{ boxShadow: '0px 0.878466px 2.6354px rgba(0, 0, 0, 0.1), 0px 0.878466px 1.75693px rgba(0, 0, 0, 0.06)' }}
    >
      <div className="flex flex-row gap-x-[17px] bg-white px-[21px] py-[25px]">
        <div className="my-auto flex h-[51px] w-[51px] rounded-[5px] bg-[#6366F1]">
          <p className="my-auto mx-auto text-[24px] font-bold text-gray-50">{data || '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[22px] font-[600] text-[#111827]">{title}</p>
          <p className="text-[14px] text-[#6B7280]">{sub_title}</p>
        </div>
      </div>
      <div className="bg-[#F9FAFB] px-[21px] py-[14px]">
        <a className="text-[14px] text-[#4F46E5]" href={link}>
          Lihat Selengkapnya
        </a>
      </div>
    </div>
  );
}
