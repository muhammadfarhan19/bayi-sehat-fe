import React from 'react';

import { Case, classNames, Default, Switch } from '../../../../utils/Components';
import { checkReturnValueOfString } from '../../../../utils/StringUtil';
import { ShiftWidgetController, StatusShift } from './core';

const PresensiIcon = ({ asTapIn }: { asTapIn?: boolean }) => {
  const arrowRight = '.25V15m3 0l3-3m0 0l-3-3m3 3H9';
  const arrowLeft = '.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75';
  const renderArrowIcon = asTapIn ? arrowLeft : arrowRight;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={`M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2${renderArrowIcon}`}
        />
      </svg>
    </>
  );
};

const HoursComponent = ({ timeCheckIn, timeCheckOut }: { timeCheckIn?: string; timeCheckOut?: string }) => {
  return (
    <div className="flex flex-row rounded-br-md rounded-bl-md bg-zinc-50">
      <div className="flex flex-1 flex-col items-center justify-center border-t-2 border-r-2 border-gray-300 py-2 px-2 ">
        <p className="text-md font-bold text-green-600">{checkReturnValueOfString(timeCheckIn as string, '-:-')} WIB</p>
        <p className="text-xs">Jam Masuk</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center border-t-2 border-gray-300 py-2 px-2 ">
        <p className="text-md font-bold text-green-600">
          {checkReturnValueOfString(timeCheckOut as string, '-:-')} WIB
        </p>
        <p className="text-xs">Jam Keluar</p>
      </div>
    </div>
  );
};

const ButtonPresensiComponent = ({
  onCheckIn,
  statusData,
  timeCompare,
}: {
  onCheckIn: React.MouseEventHandler<HTMLButtonElement>;
  statusData: StatusShift;
  timeCompare: Date;
}) => {
  const SubmitShiftVM = ShiftWidgetController();
  return (
    <button
      type="button"
      disabled={SubmitShiftVM?.shouldDisabledOnSubmisson.handleDisabledButton(statusData, timeCompare)}
      onClick={onCheckIn}
      className={classNames(
        statusData === 'pegawai has not check_in' ? 'bg-green-600 hover:bg-green-300' : 'bg-red-600 hover:bg-red-300',
        'mt-2 flex w-full flex-row items-center justify-center rounded-md  py-2 text-white disabled:bg-gray-400'
      )}
    >
      <PresensiIcon asTapIn={statusData === 'pegawai has not check_in'} />
      <Switch>
        <Case condition={statusData === 'pegawai has not check_out' || statusData === 'pegawai has check_in'}>
          Presensi Keluar
        </Case>
        <Default>Presensi Masuk</Default>
      </Switch>
    </button>
  );
};

function ShiftWidget() {
  const SubmitShiftVM = ShiftWidgetController();
  return SubmitShiftVM?.getShiftData?.status !== 'unauthorized' ? (
    <div className="flex-1 rounded-md bg-white shadow-lg lg:block" aria-label="Widget">
      <div className="px-6 py-4">
        <p className="text-sm font-bold text-indigo-600">Shift Berikutnya</p>
        <p className="text-md font-medium text-gray-600">{SubmitShiftVM?.getShiftData?.formatDate}</p>
        <p className="text-xl font-medium text-gray-600">
          {SubmitShiftVM?.getShiftData?.shiftTime?.check_in} - {SubmitShiftVM?.getShiftData?.shiftTime?.check_out}
        </p>
        <p className="mt-1 text-xs font-light text-gray-600">{SubmitShiftVM?.getShiftData.shift?.shift}</p>
        <ButtonPresensiComponent
          timeCompare={SubmitShiftVM?.getShiftData.timeComparison}
          statusData={SubmitShiftVM?.getShiftData.shift?.status as StatusShift}
          onCheckIn={() =>
            SubmitShiftVM.postShift.submitHandler(
              {
                dateSubmitted: SubmitShiftVM?.getShiftData.shift?.date as string,
                checkIn: SubmitShiftVM?.getShiftData.shift?.status as unknown as boolean,
              },
              SubmitShiftVM.getShiftData.mutate
            )
          }
        />
      </div>
      <HoursComponent
        timeCheckIn={SubmitShiftVM?.getShiftData.shiftTime?.timeSubmittedCheckIn}
        timeCheckOut={SubmitShiftVM?.getShiftData.shiftTime?.timeSubmittedCheckOut}
      />
    </div>
  ) : (
    <></>
  );
}

export default ShiftWidget;
