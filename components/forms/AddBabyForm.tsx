/* eslint-disable prefer-const */
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
  selectedId?: string | undefined
}

interface FormState {
  name: string
  gender: string
  birthdate: Date
  parent_name: string
  address: string
  phone_number: string
}

function AddBabyForm(props: ModalProps) {
  const { open, setOpen, selectedId, type } = props
  const [data, setData] = React.useState<any>({
    name: undefined,
    gender: undefined,
    address: undefined,
    birthdate: undefined,
    age: undefined,
    parent_name: undefined,
    phone_number: undefined,
  })

  const toggleModal = () => {
    setOpen(!open)
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>()

  const fetchBaby = async (id: string | undefined) => {
    await fetch(`http://localhost:4000/baby/${id}`)
      .then(response => response.json())
      .then(response => setData(response.data))
  }

  const router = useRouter()

  const submitHandler = async (formData: FormState) => {
    let response
    if (selectedId) {
      response = await fetch(`http://localhost:4000/baby/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
    } else {
      const result = {
        ...formData,
        birthdate: new Date(formData.birthdate).toISOString(),
        gender: formData.gender === 'Laki-Laki' ? 'Male' : 'Female',
      }
      response = await fetch('http://localhost:4000/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
      console.log(response)
    }

    if (response.statusText === 'OK') {
      alert('Berhasil Menyimpan')
    } else {
      alert('Gagal Menyimpan')
    }
    setOpen(!open)
    router.reload()
  }

  React.useEffect(() => {
    fetchBaby(selectedId)
    setData({
      name: data.name,
      gender: data.gender,
      address: data.address,
      birthdate: data.birthdate,
      age: data.age,
      parent_name: data.parent_name,
      phone_number: data.phone_number,
    })
  }, [open])

  React.useLayoutEffect(() => {
    if (type === 'edit' && selectedId && data) {
      setValue('name', data.name)
      setValue('birthdate', data.birthdate)
      setValue('gender', data.gender)
      setValue('parent_name', data.parent_name)
      setValue('address', data.address)
      setValue('phone_number', data.phone_number)
    }
  }, [data && type === 'edit'])

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
                  {selectedId ? 'Perbarui Data Bayi' : 'Masukkan Data Anak'}
                </h3>
                <button onClick={toggleModal}>
                  <LockClosedIcon />
                </button>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)} className="flex h-auto w-full flex-col space-y-4">
                <div className="m-0 w-full">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Nama"
                    {...register('name', {
                      required: 'Mohon Masukkan Nama',
                    })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="birthdate">Tanggal Lahir</label>
                  <input
                    type="date"
                    className="w-full rounded-md border p-3"
                    placeholder="DD/MM/YYYY"
                    {...register('birthdate', {
                      required: 'Mohon Masukkan Tanggal Lahir',
                    })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="gender">Jenis Kelamin</label>
                  <select className="w-full rounded-md border p-3" {...register('gender')}>
                    <option value="Laki-Laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">Nama Orang Tua</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Nama Orang Tua"
                    {...register('parent_name')}
                  />
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">Alamat</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Alamat"
                    {...register('address')}
                  />
                </div>
                <div className="m-0 w-full">
                  <label htmlFor="name">No HP</label>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder="Nomor HP"
                    {...register('phone_number')}
                  />
                </div>
                <button type="submit" className="w-full rounded-md border bg-teal-400 p-3 font-semibold text-white">
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
