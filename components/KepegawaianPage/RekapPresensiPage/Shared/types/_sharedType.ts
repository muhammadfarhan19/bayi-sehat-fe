import { type PegawaiData } from '../../../../../types/api/KepegawaianAPI';

export interface ListPegawaiProps {
  unit_kerja_id: number;
  pageTitle?: string;
  onSelectEachPegawai: (data: PegawaiData) => void;
  CTATitle: string;
}

export type TabName = 'Master PNS' | 'Master PPNPN' | 'Master PPPK';
