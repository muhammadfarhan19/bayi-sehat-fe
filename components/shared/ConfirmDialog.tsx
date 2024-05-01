import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: () => void
  message?: string
}

function ConfirmDialog(props: ModalProps) {
  const { open, setOpen, onSubmit, message } = props

  const toggleModal = () => {
    setOpen(!open)
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
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Konfirmasi
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>

              <div className="mt-4 flex flex-col items-end">
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="mr-2 inline-flex rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700"
                    onClick={() => setOpen}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="inline-flex rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-900 hover:bg-indigo-200"
                    onClick={() => onSubmit}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmDialog
