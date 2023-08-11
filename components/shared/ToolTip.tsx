import { Popover, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import React from 'react';

function ToolTip({ message = '' }: { message: string }) {
  const [show, setShow] = React.useState(false);
  const handleShow = React.useCallback(() => setShow(!show), [show]);
  return (
    <Popover as="div" className="relative">
      <Popover.Button as="button" onClick={handleShow} onMouseEnter={handleShow} onMouseLeave={handleShow}>
        <InformationCircleIcon className="ml-2 h-[20px] w-[20px]" />
      </Popover.Button>
      <Transition
        show={show}
        as={React.Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Overlay className="absolute z-10 rounded-md border bg-gray-100 px-6 py-5 shadow-xl">
          <div className="grid-col-2 grid">
            <p>{message}</p>
          </div>
        </Popover.Overlay>
      </Transition>
    </Popover>
  );
}

export default ToolTip;
