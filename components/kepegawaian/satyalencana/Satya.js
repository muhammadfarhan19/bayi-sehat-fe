import ListSatya from './ListSatya'
import PengajuanStaya from './PengajuanSatya'

export default function Satya() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:col-span-4">
            <section aria-labelledby="section-2-title">
                <PengajuanStaya />
                <ListSatya />
            </section>
        </div>
    )
}
