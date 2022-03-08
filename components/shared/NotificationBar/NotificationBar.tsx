import { Transition } from '@headlessui/react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { CommonState } from '../../../reducer/CommonReducer';

type SnackbarProps = {
  message: string;
  timeout?: number;
  type?: string;
};

function Snackbar(props: SnackbarProps) {
  const dispatch = useDispatch();
  const { message, timeout } = props;

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(true);
    if (timeout) {
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          dispatch(setSnackbar({ show: false }));
        }, 500);
      }, timeout);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setSnackbar({ show: false }));
    }, 500);
  };

  return (
    <Transition appear show={open} as={'div'}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="-0 fixed inset-x-0 top-2 z-40 pt-2 sm:pt-5">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-emerald-600 p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-emerald-800 p-2">
                    <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <p className="ml-3 truncate font-medium text-white">
                    <span className="md:hidden">We announced a new product!</span>
                    <span className="hidden md:inline">{message}</span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm hover:bg-emerald-50"
                  >
                    Learn more
                  </a>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className="-mr-1 flex rounded-md p-2 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Tutup</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
}

export default function NotificationBar() {
  const { show, message, timeout } = useSelector<{ common: CommonState }, CommonState['snackbar']>(state => {
    return state.common.snackbar;
  }, shallowEqual);

  if (show) {
    return <Snackbar message={message} timeout={timeout} />;
  }

  return null;
}
