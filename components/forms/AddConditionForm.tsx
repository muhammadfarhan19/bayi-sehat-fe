/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Dialog, Transition } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess?: () => void
  type?: string
  babyId: string | string[] | undefined
}

interface FormState {
  weight: number
  height: number
  month: number
}

function AddConditionForm(props: ModalProps) {
  const { open, setOpen, onSuccess, babyId, type } = props

  const router = useRouter()

  const toggleModal = () => {
    setOpen(!open)
  }

  const {
    control,
    register,
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

      if (response.statusCode === 201) {
        alert(response.message)
      } else {
        console.log('failed')
      }

      toggleModal()
      router.reload()
      return response
    } catch (error) {
      throw new Error(`Error posting new baby data: ${error}`)
    }
  }

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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Masukkan Data Anak</h3>
                <button onClick={toggleModal}>
                  <LockClosedIcon />
                </button>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)} className="flex h-auto w-full flex-col space-y-4">
                <div className="m-0 w-full">
                  <label htmlFor="weight">Berat (kg)</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Masukkan Berat Badan Dalam Kilogram"
                    {...register('weight', {
                      required: 'Mohon Masukkan Berat Badan dalam Kilogram',
                    })}
                  />
                  {errors.weight && <p>{errors.weight.message}</p>}
                </div>

                <div className="m-0 w-full">
                  <label htmlFor="height">Tinggi (m)</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Masukkan Tinggi Badan Dalam Meter"
                    {...register('height', {
                      required: 'Mohon Masukkan Tinggi Badan Dalam Meter',
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: 'Hanya masukkan angka dan titik (.)',
                      },
                    })}
                  />
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="month">Bulan (1-12)</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Masukkan Bulan Dalam Angka"
                    {...register('month', {
                      required: 'Mohon Masukkan Bulan',
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: 'Hanya masukkan angka dan titik (.)',
                      },
                    })}
                  />
                </div>
                <button type="submit" className="w-full rounded-md border bg-teal-400 p-3 font-semibold text-white">
                  Tambah
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
