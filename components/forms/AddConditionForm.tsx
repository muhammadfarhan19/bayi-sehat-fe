/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { setSnackbar } from '../../action/CommonAction'
import { filterMonths } from '../../lib/common'
import { SnackbarType } from '../../reducer/CommonReducer'
import AutoComplete from '../shared/ComboBox'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
  type?: string
  selectedId?: string | undefined
  babyId: string | string[] | undefined
}

interface FormState {
  weight: number
  height: number
  month: number
}

function AddConditionForm(props: ModalProps) {
  const { open, setOpen, onSuccess, type, selectedId, babyId } = props
  const debounce = React.useRef<number>(0)
  const router = useRouter()
  const dispatch = useDispatch()
  const [queryMonth, setQueryMonth] = React.useState('')
  const [data, setData] = React.useState<{
    month: undefined | number
    weight: undefined | number
    height: undefined | number
  }>({
    month: undefined,
    weight: undefined,
    height: undefined,
  })

  const toggleModal = () => {
    setOpen(!open)
  }

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>()

  const submitHandler = async (formData: FormState) => {
    try {
      const result = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        month: Number(formData.month),
      }
      const response = await fetch(`http://localhost:4000/condition/${babyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(result),
      }).then(response => response.json())

      if (response.status) {
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
  const fetchBabyCondition = async (id: string | undefined) => {
    const response = await axios.get(`http://localhost:4000/condition/${id}`)
    setData(response.data.data)
  }

  React.useEffect(() => {
    fetchBabyCondition(selectedId)
  }, [selectedId])

  // React.useLayoutEffect(() => {
  //   if (selectedId && data) {
  //     setValue('weight', data.weight)
  //     setValue('height', data.height)
  //     setValue('month', data.month)
  //   }
  // }, [data, selectedId])
  // console.log(data)

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
                  {selectedId ? 'Perbarui' : 'Masukkan'} Kondisi Anak
                </h3>
                <button onClick={toggleModal}>
                  <XIcon className="h-5 w-5" />
                </button>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)} className="flex h-auto w-full flex-col space-y-4">
                <div className="m-0 w-full">
                  <label htmlFor="weight">Berat (kg)</label>
                  <input
                    type="text"
                    className={`w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:outline-none focus:ring-1  focus:ring-teal-400 ${
                      errors.weight && 'border-red-500 focus:border-none'
                    } focus:border-teal-400`}
                    placeholder="Masukkan Berat Badan Dalam Kilogram"
                    {...register('weight', {
                      required: 'Mohon Masukkan Berat Badan dalam Kilogram',
                    })}
                  />
                  {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight.message}</p>}
                </div>

                <div className="m-0 w-full">
                  <label htmlFor="height">Tinggi (m)</label>
                  <input
                    type="text"
                    className={`w-full rounded-md border-gray-300 p-3 text-sm focus:border-teal-400 focus:outline-none focus:ring-1  focus:ring-teal-400 ${
                      errors.height && 'border-red-500 focus:border-none'
                    } focus:border-teal-400`}
                    placeholder="Masukkan Tinggi Badan Dalam Meter"
                    {...register('height', {
                      required: 'Mohon Masukkan Tinggi Badan Dalam Meter',
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: 'Hanya masukkan angka dan titik (.)',
                      },
                    })}
                  />
                  {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height.message}</p>}
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="month">Bulan</label>
                  <Controller
                    control={control}
                    name="month"
                    rules={{ required: 'Mohon Pilih Bulan' }}
                    render={({ field: { onChange } }) => (
                      <>
                        <AutoComplete
                          onChange={input => {
                            onChange(input?.value)
                          }}
                          placeholder="Pilih Bulan"
                          label={null}
                          onQueryChange={queryText => {
                            if (debounce.current) {
                              clearTimeout(debounce.current)
                            }
                            debounce.current = window.setTimeout(() => {
                              setQueryMonth(queryText)
                            }, 500)
                          }}
                          defaultValue={{
                            text: '',
                            value: '',
                          }}
                          options={filterMonths.map(each => ({
                            text: each.text,
                            value: String(each.value),
                          }))}
                        />
                      </>
                    )}
                  />
                  {errors.month && <p className="mt-1 text-sm text-red-500">{errors.month.message}</p>}
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

export default AddConditionForm
