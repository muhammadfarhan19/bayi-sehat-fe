import { InformationCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

import { setSnackbar } from '../../action/CommonAction'
import { useAPI } from '../../hooks/useAPI'
import { SnackbarType } from '../../reducer/CommonReducer'
import { GetAuthRes, UserData } from '../../types/api/user.type'
import { BabyType } from '../../types/babyType'
import AddBabyForm from '../forms/AddBabyForm'
import ConfirmDialog from '../shared/ConfirmDialog'

const MonitoringPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [confirmId, setConfirmId] = React.useState<string | undefined>('')
  const [filteredData, setFilteredData] = React.useState<BabyType[]>([])
  const [formModalState, setFormModalState] = React.useState<{
    open: boolean
    type: string | undefined
    selectedId: string | undefined
  }>({
    open: false,
    type: undefined,
    selectedId: undefined,
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: user } = useAPI<UserData, GetAuthRes>('http://localhost:4000/auth', 'GET')

  const handleModal = (open: boolean, type?: string, selectedId?: string) => {
    setFormModalState({
      open,
      type,
      selectedId,
    })
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/baby/${confirmId}`)
      if (response.status === 200) {
        dispatch(
          setSnackbar({
            show: true,
            message: response.data.message || 'Data berhasil dihapus.',
            type: SnackbarType.INFO,
          })
        )
      } else {
        dispatch(
          setSnackbar({
            show: true,
            message: response.data.message || 'Terjadi Kesalahan',
            type: SnackbarType.ERROR,
          })
        )
      }
    } catch (error: any) {
      dispatch(
        setSnackbar({
          show: true,
          message: error.message || 'Terjadi Kesalahan',
          type: SnackbarType.ERROR,
        })
      )
    }
    setConfirmId('')
    mutate()
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const { data, error, isValidating, mutate } = useAPI<BabyType, any>('http://localhost:4000/baby', 'GET')

  React.useEffect(() => {
    if (data) {
      setFilteredData(
        data?.filter(
          (baby: BabyType) =>
            baby?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            baby?.parent_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [searchQuery, data])

  return (
    <main className="min-h-auto flex h-[910px] flex-col gap-10 rounded-2xl border border-teal-400 px-10 py-5 shadow-lg">
      <header className="flex items-center justify-between">
        <aside className="w-auto text-2xl font-semibold">Monitoring</aside>
        <aside className={`b-2 w-auto cursor-pointer rounded-md px-4 py-2 hover:bg-gray-50`}>
          {/* {user?.data?.[0]?.name} */}
          Posyandu Gading
        </aside>
      </header>
      <aside className="flex items-center justify-end">
        <input
          type="text"
          placeholder="Cari Nama Anak atau Orang Tua"
          className="w-[300px] rounded-md border px-3 py-2"
          onChange={handleFilter}
          value={searchQuery}
        />
      </aside>
      <section className="flex h-full w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight">Anak Terdaftar</h2>
          <button
            className="rounded-md bg-teal-400 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            onClick={() => handleModal(!formModalState.open, 'add')}
          >
            Tambah Anak
          </button>
        </div>
        <div className="inline-block max-h-[650px] min-w-full overflow-hidden rounded-lg shadow-md hover:overflow-y-scroll">
          <table className="min-w-full overflow-scroll leading-normal">
            <thead>
              <tr>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  No
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Nama
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Jenis Kelamin
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Umur
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Orang Tua
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Alamat
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  No HP
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Status
                </th>
                <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {isValidating ? (
                <tr>
                  <td className="p-5">loading...</td>
                </tr>
              ) : (
                filteredData
                  ?.filter(baby => baby.name !== undefined) // Filter out items where name is undefined
                  .sort((a, b) => a.name!.localeCompare(b.name!))
                  .map((baby: BabyType, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'hover:bg-gray-200' : 'bg-gray-10 hover:bg-gray-200'}>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{index + 1}</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.name}</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.gender}</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.age} bulan</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.parent_name}</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.address}</td>
                      <td className="border-gray-200 bg-white px-5 py-5 text-sm">{baby.phone_number}</td>
                      <td className="border-gray-200 bg-white px-5 py-5  text-sm">
                        {/* <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden
                          className={`rounded-ful absolute inset-0 rounded-full opacity-50 ${
                            baby.is_stunted ? 'bg-red-200 text-red-900' : 'bg-teal-200'
                          }`}
                        ></span>
                        <span className="relative">{baby.is_stunted ? 'Stunting' : 'Sehat'}</span>
                      </span> */}
                      </td>
                      <td className="gap-x-2 border-gray-200 bg-white px-5 py-5 text-sm">
                        <button
                          data-twe-toggle="tooltip"
                          data-twe-html="true"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          title="Lihat Detail"
                          type="button"
                          className="mx-1 rounded-[6px] bg-teal-400 p-2 text-[14px] font-normal text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                          onClick={() => {
                            router.push(`/monitoring/${baby.id}`)
                          }}
                        >
                          <InformationCircleIcon className="h-5 w-5" />
                        </button>
                        <button
                          data-twe-toggle="tooltip"
                          data-twe-html="true"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          title="Edit Data"
                          type="button"
                          className="mx-1 rounded-[6px] bg-teal-400 p-2 text-[14px] font-normal text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                          onClick={() => {
                            handleModal(!formModalState.open, 'edit', baby.id)
                          }}
                        >
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                        <button
                          data-twe-toggle="tooltip"
                          data-twe-html="true"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          title="Hapus Data"
                          type="button"
                          className="focus:ring-ted-500 mx-1 rounded-[6px] bg-red-500 p-2 text-[14px] font-normal text-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400  focus:ring-offset-2"
                          onClick={() => setConfirmId(baby.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {formModalState.open && (
        <AddBabyForm
          open={formModalState.open}
          setOpen={(open: boolean) => handleModal(open)}
          selectedId={formModalState.selectedId}
          onSuccess={() => mutate()}
        />
      )}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId('')}
        onConfirm={handleDelete}
      />
    </main>
  )
}

export default MonitoringPage
