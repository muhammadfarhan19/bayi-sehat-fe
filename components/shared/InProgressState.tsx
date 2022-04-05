import { DesktopComputerIcon } from '@heroicons/react/outline';
import * as React from 'react';

export default function InProgressState() {
  return (
    <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <DesktopComputerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">- Under Construction -</span>
    </div>
  );
}
