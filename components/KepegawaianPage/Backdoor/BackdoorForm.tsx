import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { AbsenBackdoorAPI, KepegawaianAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostBackdoorReq, PostBackdoorRes } from '../../../types/api/BackdoorAPI';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../types/api/KepegawaianAPI';
import { Status } from '../../../types/Common';
import { formatDate } from '../../../utils/DateUtil';
import { callAPI } from '../../../utils/Fetchers';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoComplete from '../../shared/Input/ComboBox';
import { InputLabelled } from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

interface FormState {
  pegawaiId: number;
  dateSubmitted: Date;
  timeIn: string;
  timeOut: string;
}

function BackdoorForm() {
  const [queryPegawai, setQueryPegawai] = React.useState('');
  const debounce = React.useRef<number>(0);
  const dispatch = useDispatch();
  const { data: pegawaiList } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    { page: 1, per_page: 10, status_cpns: [0], nama: queryPegawai },
    { method: 'GET' }
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState>();

  const submitHandler = async (formState: FormState) => {
    const resSubmit = await callAPI<PostBackdoorReq, PostBackdoorRes>(
      AbsenBackdoorAPI.POST_PRESENSI,
      {
        pegawai_id: Number(formState.pegawaiId),
        date: formatDate(new Date(formState.dateSubmitted), 'yyyy-MM-dd'),
        check_in: formState.timeIn + ':00',
        check_out: formState.timeOut + ':00',
      },
      { method: 'POST' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      setTimeout(() => window.location.reload(), 300);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return (
    <section aria-labelledby="section-1-title">
      <div className="overflow-auto rounded-lg bg-white px-6 py-6 pb-10 shadow">
        <h3 className="mb-5 text-xl font-medium leading-6 text-gray-900">Absensi Backdoor</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-5 sm:col-span-6">
            <Controller
              control={control}
              name="pegawaiId"
              rules={{ required: 'Mohon Pilih Nama Pegawai' }}
              render={({ field: { onChange } }) => (
                <>
                  <AutoComplete
                    onChange={input => {
                      onChange(input?.value);
                    }}
                    label={'Pegawai'}
                    defaultValue={{ text: '', value: '' }}
                    onQueryChange={queryText => {
                      if (debounce.current) {
                        clearTimeout(debounce.current);
                      }
                      debounce.current = window.setTimeout(() => {
                        setQueryPegawai(queryText);
                      }, 500);
                    }}
                    options={(pegawaiList?.list || []).map(each => ({
                      text: each.name + ' - ' + each?.unit_kerja,
                      value: String(each.pegawai_id),
                    }))}
                  />
                </>
              )}
            />
            {errors.pegawaiId && <p className="mt-1 text-xs text-red-500">{errors.pegawaiId.message}</p>}
          </div>
          <InputLabelled
            validation={{ ...register('dateSubmitted', { required: 'Silahkan pilih Tanggal Absensi' }) }}
            isError={errors.dateSubmitted}
            name="dateSubmitted"
            label="Tanggal"
            type="date"
            errorMessage={errors.dateSubmitted?.message}
          />
          <InputLabelled
            isError={errors.timeIn}
            name="timeIn"
            label="Jam Masuk"
            validation={{ ...register('timeIn', { required: 'Silahkan pilih Jam Masuk' }) }}
            type="time"
            errorMessage={errors.timeIn?.message}
          />
          <InputLabelled
            isError={errors.timeOut}
            name="timeOut"
            label="Jam Pulang"
            validation={{ ...register('timeOut', { required: 'Silahkan pilih Jam Pulang' }) }}
            type="time"
            errorMessage={errors.timeOut?.message}
          />
          <div className="mt-5 flex flex-row justify-end">
            <button
              type="submit"
              className="rounded border border-transparent bg-indigo-600 px-6 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BackdoorForm;
