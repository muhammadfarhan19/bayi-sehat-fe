import { DesktopComputerIcon } from '@heroicons/react/outline';
import * as React from 'react';

export default function InProgressState() {
  return (
    <div className="mt-2 flex flex-col items-center">
      <DesktopComputerIcon className="h-24 text-gray-600" />
      <div className="font-semibold text-gray-600">- In Progress -</div>
    </div>
  );
}
