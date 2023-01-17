import { Controller, useForm } from 'react-hook-form';

import { classNames } from '../../../utils/Components';
import { getQueryString } from '../../../utils/URLUtils';
import DatePickerCustom from '../../shared/Input/DatePicker';
import { FileObject } from '../../shared/Input/UploadWrapper';
import useUpdateStatus from './useUpdateStatus';

interface FormState {
  tanggal: number;
  file: FileObject;
}

function FormBukti() {
  const { status: statusPembayaranId } = getQueryString<{ status: string }>();
  const { updateStatus } = useUpdateStatus();

  const isFormBuktiBayar = statusPembayaranId === '2';

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormState>({
    defaultValues: {
      tanggal: Date.now(),
    },
  });

  const submitHandler = () => {
    updateStatus(Number(statusPembayaranId) + 1);
  };

  const title = isFormBuktiBayar ? 'Bukti Pembayaran' : 'Bukti Pertanggungjawaban';
  const label = isFormBuktiBayar ? 'Tanggal Pembayaran' : 'Tanggal Bukti Pertanggungjawaban';

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col flex-nowrap justify-between rounded-lg bg-white p-6 py-4 shadow"
    >
      <p className="text-lg font-medium text-gray-900">{title}</p>

      <div className="mt-5 sm:col-span-6">
        <label className="mb-[2px] block text-sm font-medium text-gray-700">{label}</label>
        <Controller
          control={control}
          name={'tanggal'}
          rules={{ required: 'Mohon masukkan tanggal.' }}
          render={({ field: { onChange, value } }) => (
            <DatePickerCustom
              disabled
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={new Date(value)}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date) => onChange(date.getTime())}
              customInput={
                <input
                  type="text"
                  className={classNames(
                    'block w-full rounded-md shadow-sm disabled:bg-gray-200 sm:text-sm',
                    errors.tanggal
                      ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  )}
                />
              }
            />
          )}
        />
      </div>

      <div className="mt-6 flex flex-col items-end">
        <div className="flex items-center gap-x-2">
          <button
            className="rounded border border-transparent bg-red-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-500 disabled:text-gray-200"
            onClick={() => (window.location.href = '/keuangan/daftar-dinas')}
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
          >
            Kirim
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormBukti;
