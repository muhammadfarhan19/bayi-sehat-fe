/* eslint-disable prefer-const */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { setSnackbar } from '../../action/CommonAction'
import { GenderList } from '../../lib/common'
import { SnackbarType } from '../../reducer/CommonReducer'
import { BabyType } from '../../types/api/baby.type'
import AutoComplete from '../shared/ComboBox'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
  type?: string
  selectedId?: string | undefined
}

function AddBabyForm(props: ModalProps) {
  const { open, setOpen, selectedId, type, onSuccess } = props
  const [queryGender, setQueryGender] = React.useState('')
  const dispatch = useDispatch()
  const [data, setData] = React.useState<any>({
    name: undefined,
    gender: undefined,
    address: undefined,
    birthdate: undefined,
    age: undefined,
    parent_name: undefined,
    phone_number: undefined,
  })
  const debounce = React.useRef<number>(0)

  const toggleModal = () => {
    setOpen(!open)
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BabyType>()

  const fetchBaby = async (id: string | undefined) => {
    const response = await axios.get(`http://localhost:4000/baby/${id}`)
    setData(response.data.data)
  }

  const router = useRouter()

  const submitHandler = async (formData: BabyType) => {
    let response
    try {
      if (selectedId) {
        response = await axios.put(`http://localhost:4000/baby/${selectedId}`, formData)
      } else {
        response = await axios.post('http://localhost:4000/baby', formData)
      }
      if (response.status === 200) {
        dispatch(
          setSnackbar({
            show: true,
            message: response.data.message || 'Data berhasil tersimpan.',
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
    onSuccess()
    setOpen(!open)
  }

  React.useEffect(() => {
    if (selectedId) {
      fetchBaby(selectedId)
    }
  }, [selectedId])

  React.useLayoutEffect(() => {
    if (selectedId && data) {
      setValue('name', data.name)
      setValue('birthdate', data.birthdate)
      setValue('gender', data.gender)
      setValue('parent_name', data.parent_name)
      setValue('address', data.address)
      setValue('phone_number', data.phone_number)
    }
  }, [data, selectedId])

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
              <Dialog.Title as="div" className="mb-5 flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedId ? 'Perbarui' : 'Masukkan'} Data Anak
                </h3>
                <button
                  data-twe-toggle="tooltip"
                  data-twe-html="true"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  title="Keluar"
                  type="button"
                  onClick={toggleModal}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)} className="flex h-auto w-full flex-col space-y-4">
                <div className="m-0 w-full">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    className={`} w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400`}
                    placeholder="Nama"
                    {...register('name', {
                      required: 'Mohon Masukkan Nama',
                    })}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="w-full">
                  <label htmlFor="birthdate">Tanggal Lahir</label>
                  <input
                    type="date"
                    className={`} w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400`}
                    {...register('birthdate', {
                      required: 'Mohon Masukkan Tanggal Lahir',
                    })}
                  />
                  {errors.birthdate && <p className="mt-1 text-sm text-red-500">{errors.birthdate.message}</p>}
                </div>
                <div className="w-full">
                  <label htmlFor="gender">Jenis Kelamin</label>
                  <Controller
                    control={control}
                    name="gender"
                    rules={{ required: 'Mohon Pilih Jenis Kelamin' }}
                    render={({ field: { onChange } }) => (
                      <>
                        <AutoComplete
                          onChange={input => {
                            onChange(input?.text)
                          }}
                          placeholder="Jenis Kelamin"
                          label={null}
                          onQueryChange={queryText => {
                            if (debounce.current) {
                              clearTimeout(debounce.current)
                            }
                            debounce.current = window.setTimeout(() => {
                              setQueryGender(queryText)
                            }, 500)
                          }}
                          defaultValue={{
                            text: '',
                            value: '',
                          }}
                          options={GenderList.map(each => ({
                            text: each.text,
                            value: String(each.value),
                          }))}
                        />
                      </>
                    )}
                  />
                  {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">Nama Orang Tua</label>
                  <input
                    type="text"
                    className={`} w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400`}
                    placeholder="Nama Orang Tua"
                    {...register('parent_name', {
                      required: 'Mohon Masukkan Nama Orang Tua',
                    })}
                  />
                  {errors.parent_name && <p className="mt-1 text-sm text-red-500">{errors.parent_name.message}</p>}
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">Alamat</label>
                  <input
                    type="text"
                    className={`} w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400`}
                    placeholder="Alamat"
                    {...register('address')}
                  />
                  {/* {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>} */}
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">No HP</label>
                  <input
                    type="text"
                    className={`} w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400`}
                    placeholder="Nomor HP"
                    {...register('phone_number')}
                  />
                  {/* {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>} */}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md border bg-teal-400 p-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                >
                  {selectedId ? 'Simpan' : 'Tambah'}
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddBabyForm
