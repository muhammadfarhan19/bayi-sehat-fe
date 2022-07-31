import { format } from 'date-fns';
import React from 'react';

import { JabatanAPI, RiwayatPendidikanAPI, RiwayatPenghargaan } from '../../../../../constants/APIUrls';
import { StatusMenikahText } from '../../../../../constants/Resource';
import { RiwayatJabatanData } from '../../../../../types/api/JabatanAPI';
import { GetRiwayatPendidikanListReq, RiwayatPendidikanListData } from '../../../../../types/api/PendidikanAPI';
import { GetRiwayatPenghargaanListReq, PenghargaanList } from '../../../../../types/api/RiwayatPenghargaanAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import { ContentLabelledItems, EndPrintedStatement, HeaderComponents, LabelledRowsItem } from './Shared/PageComponents';

interface ID {
  id: string;
}

export default function ProfilePegawai(props: ID) {
  const personalPegawaiData = usePersonalData();

  const { data: getPendidikan } = useCommonApi<GetRiwayatPendidikanListReq, RiwayatPendidikanListData[]>(
    RiwayatPendidikanAPI.GET_RIWAYAT_PENDIDIKAN_LIST,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id) },
    { method: 'GET' }
  );

  const { data: getJabatan } = useCommonApi<null, RiwayatJabatanData[]>(JabatanAPI.GET_RIWAYAT_JABATAN, null, {
    method: 'GET',
  });
  const { data: getPenghargaan } = useCommonApi<GetRiwayatPenghargaanListReq, PenghargaanList[]>(
    RiwayatPenghargaan.GET_RIWAYAT_PENGHARGAAN_LIST,
    { pegawai_id: personalPegawaiData?.pegawai_id },
    { method: 'GET' }
  );

  return (
    <div id={props.id}>
      <HeaderComponents
        name={String(personalPegawaiData?.nama)}
        jabatan={String(personalPegawaiData?.jabatan)}
        contact={`${personalPegawaiData?.email} , ${personalPegawaiData?.hp}`}
      />
      <LabelledRowsItem separatorTop="mt-5 mb-2" title="Data Diri Pegawai" />
      <ContentLabelledItems
        subtitle="NIP"
        value={personalPegawaiData?.nip?.length === 0 ? '-' : `: ${personalPegawaiData?.nip}`}
      />
      <ContentLabelledItems
        subtitle="Pangkat"
        value={personalPegawaiData?.pangkat?.length === 0 ? '-' : `: ${personalPegawaiData?.pangkat}`}
      />
      <ContentLabelledItems
        subtitle="Golongan"
        value={personalPegawaiData?.golongan?.length === 0 ? '-' : `: ${personalPegawaiData?.golongan}`}
      />
      <ContentLabelledItems
        subtitle="Tempat, Tanggal Lahir"
        value={`${personalPegawaiData?.tanggal_lahir}, ${personalPegawaiData?.tempat_lahir} `}
      />
      <ContentLabelledItems
        subtitle="Jabatan"
        value={personalPegawaiData?.jabatan?.length === 0 ? '-' : `: ${personalPegawaiData?.jabatan}`}
      />
      {/* getPendidikan?.slice(-1).pop()?.jenjang_str */}
      <ContentLabelledItems
        subtitle="Pendidikan Terakhir"
        value={getPendidikan?.length === 0 ? '-' : `: ${getPendidikan?.slice(-1).pop()?.jenjang_str}`}
      />
      <ContentLabelledItems
        subtitle="Karpeg"
        value={personalPegawaiData?.karpeg?.length === 0 ? '-' : `: ${personalPegawaiData?.karpeg}`}
      />
      <ContentLabelledItems
        subtitle="Masa Kerja"
        value={personalPegawaiData?.masa_kerja?.length === 0 ? '-' : `: ${personalPegawaiData?.masa_kerja}`}
      />
      <ContentLabelledItems
        subtitle="Masa Kerja"
        value={
          personalPegawaiData?.masa_kerja_kepangkatan?.length === 0
            ? '-'
            : `: ${personalPegawaiData?.masa_kerja_kepangkatan}`
        }
      />

      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Data Diri Pribadi" />
      <ContentLabelledItems
        subtitle="NIK"
        value={personalPegawaiData?.ktp?.length === 0 ? '-' : `: ${personalPegawaiData?.ktp}`}
      />
      <ContentLabelledItems
        subtitle="Jenis Kelamin"
        value={personalPegawaiData?.jenis_kelamin === 1 ? ': Laki-Laki' : ': Perempuan'}
      />
      <ContentLabelledItems
        subtitle="Status Perkawinan"
        value={personalPegawaiData?.status_menikah ? ': ' + StatusMenikahText[personalPegawaiData?.status_menikah] : ''}
      />
      <ContentLabelledItems
        subtitle="Alamat"
        value={personalPegawaiData?.alamat?.length === 0 ? '-' : `: ${personalPegawaiData?.alamat}`}
      />
      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Riwayat Pendidikan" />
      {getPendidikan === null
        ? '-'
        : getPendidikan?.map(data => (
            <div className="mb-2" key={data.riwayat_id}>
              <h6 className="flex flex-1 text-[12px]">{`${data.jenjang_str}, ${data.prodi} , ${data.pt}`}</h6>
              <h6 className="mt-1 text-[10px] text-slate-500">{`(${format(
                new Date(data.tanggal_lulus),
                'yyyy-MM-dd'
              )})`}</h6>
            </div>
          ))}

      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Riwayat Golongan" />
      <ContentLabelledItems subtitle="-" value={null} />
      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Riwayat Jabatan" />
      {getJabatan === null
        ? '-'
        : getJabatan?.map(data => (
            <div className="ml-10" key={data.jabatan_pegawai_id}>
              <p className="w-2/4 text-[12px]">{data.nama_jabatan}</p>
              <p className="mt-1 text-[10px] text-slate-500">{`${format(new Date(data.tmt), 'yyyy-MM-dd')}, ${
                data.masa_kerja
              }`}</p>
            </div>
          ))}
      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Riwayat Diklat" />
      <ContentLabelledItems subtitle="-" value={null} />
      <div className="mt-5 mb-2 w-1/12 border-b-2 border-black" />
      <LabelledRowsItem separatorTop="mt-0 mb-2" title="Riwayat Penghargaan" />
      {getPenghargaan === null
        ? '-'
        : getPenghargaan?.map(data => (
            <div className="ml-10" key={data.riwayat_id}>
              <p className="w-2/4 text-[12px]">{data.nama_penghargaan}</p>
              <p className="mt-1 text-[10px] text-slate-500">{format(new Date(data.tgl_penghargaan), 'yyyy-MM-dd')}</p>
            </div>
          ))}

      <EndPrintedStatement
        styleHeader="mt-5"
        styleContent="text-[12px] indent-10"
        text="Demikian daftar riwayat hidup ini saya buat dengan sesuangguhnya, dan apabila dikemudian hari terdapat keterangan yang tidak benar saya bersedia dituntut dimuka pengadilan, serta bersedia menerima tindakan yang diambil oleh pemerintah."
      />

      <div className="mt-10 flex flex-col items-end">
        <p className="mb-10 text-[12px]">Jakarta, {format(new Date(), 'dd-MM-yyyy')}</p>
        <p className="mr-8.5 text-[12px]">{personalPegawaiData?.nama}</p>
        <p className="mt-1 text-[12px]">NIP.{personalPegawaiData?.nip}</p>
      </div>
    </div>
  );
}
