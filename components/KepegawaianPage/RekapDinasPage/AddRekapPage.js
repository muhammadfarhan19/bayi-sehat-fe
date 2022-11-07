import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, UploadIcon, XIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KepegawaianAPI, RekapDinasAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import { CircleProgress } from '../../shared/CircleProgress';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoCompletePegawai from '../../shared/Input/AutoCompletePegawai';
import UploadWrapper from '../../shared/Input/UploadWrapper';
import AutoCompleteCustom from '../DataKepegawaian/DetailPegawai/RiwayatKGB/Shared/CustomComboBox';

function AddRekapPage(props) {
  const { dinas_id, type } = props;
  const [listPegawai, setListPegawai] = React.useState([]);
  const [listDeletedPegawai, setListDeletedPegawai] = React.useState([]);
  const [throwError, setThrowError] = React.useState('');
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const debounce = React.useRef(0);
  const [selectedId, setSelectedId] = React.useState('');
  const [queryPegawai, setQueryPegawai] = React.useState('');
  const [editForm, setEditForm] = React.useState({
    flag: '',
    tgl_available: [],
  });
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm();

  const { data: unitKerjaList } = useCommonApi(UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT, null, { method: 'GET' });

  const submitHandler = async formData => {
    let post,
      data = '';

    setLoad(true);
    let pegawai = [];
    listPegawai.map(data => {
      let dataPegawai = {
        pegawai_id: data.pegawai_id,
        nip: data.nip,
        tanggal_mulai: data.tgl_available[0],
        tanggal_selesai: data.tgl_available.slice(-1)[0],
      };
      pegawai.push(dataPegawai);
    });

    if (type === 'edit') {
      data = {
        dinas: {
          dinas_id: Number(dinas_id),
          no_sp: formData.no_sp,
          unit_kerja_id: parseInt(formData.unit_kerja_id),
          tgl_surat: formData.tgl_surat,
          jenis_dinas: parseInt(formData.jenis_dinas),
          tgl_mulai: formData.tgl_mulai,
          tgl_selesai: formData.tgl_selesai,
          lokasi: formData.lokasi,
          pic: Number(formData.pic),
          isi_penugasan: formData.isi_penugasan,
          surat_tugas: [
            {
              document_uuid: formData.document_uuid,
              document_name: formData.document_name,
            },
          ],
        },
        dinas_pegawai: pegawai,
      };
    } else {
      data = {
        dinas: {
          no_sp: formData.no_sp,
          unit_kerja_id: parseInt(formData.unit_kerja_id),
          tgl_surat: formData.tgl_surat,
          jenis_dinas: parseInt(formData.jenis_dinas),
          tgl_mulai: formData.tgl_mulai,
          tgl_selesai: formData.tgl_selesai,
          lokasi: formData.lokasi,
          pic: Number(formData.pic),
          isi_penugasan: formData.isi_penugasan,
          surat_tugas: [
            {
              document_uuid: formData.document_uuid,
              document_name: formData.document_name,
            },
          ],
        },
        dinas_pegawai: pegawai,
      };
    }

    try {
      {
        type === 'edit'
          ? (post = await callAPI(RekapDinasAPI.POST_DINAS_UPDATE, data))
          : (post = await callAPI(RekapDinasAPI.POST_DINAS_INSERT, data));
      }
      if (post.status === 200) {
        window.location.href = '/kepegawaian/rekap-dinas';
      } else {
        dispatch(
          setSnackbar({
            show: true,
            message: 'Gagal menyimpan data. Pegawai tidak tersedia.',
            type: SnackbarType.ERROR,
          })
        );
      }
      setLoad(false);
    } catch (e) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setLoad(false);
    }
  };

  const getAvail = async value => {
    const dataValue = value.split('|');
    setValue('pegawai_id', dataValue[1]);
    try {
      const dataAvail = await callAPI(
        RekapDinasAPI.GET_DINAS_PEGAWAI_AVAILABILITY,
        { pegawai_id: watch('pegawai_id'), tgl_mulai: watch('tgl_mulai'), tgl_selesai: watch('tgl_selesai') },
        { method: 'get' }
      );

      if (dataAvail.status === 200) {
        const { data: dataProfilPegawai } = await callAPI(
          KepegawaianAPI.GET_PEGAWAI_LIST,
          { nama: dataValue[0], status_cpns: [0], page: 1, per_page: 10 },
          { method: 'GET' }
        );

        let dataPegawai = {
          pegawai_id: dataProfilPegawai.data.list[0].pegawai_id,
          nama: dataProfilPegawai.data.list[0].name,
          nip: dataProfilPegawai.data.list[0].nip,
          unit_kerja: dataProfilPegawai.data.list[0].unit_kerja,
          flag: dataAvail.data.data.flag,
          tgl_available: dataAvail.data.data.tgl_available,
        };

        let newState = [...listPegawai];
        newState.push(dataPegawai);
        setListPegawai(newState);
      }
    } catch (e) {
      setThrowError('Data not found');
    }
  };

  const removeList = (idx, nip) => {
    const data = listPegawai[idx];

    let newState = [...listDeletedPegawai];
    newState.push(data);
    setListDeletedPegawai(newState);

    setListPegawai(listPegawai.filter(each => each?.nip !== nip));
  };

  const handleEdit = idx => {
    setSelectedId(idx);
    setOpen(true);
    let data = {
      flag: listPegawai[idx].flag,
      tgl_available: listPegawai[idx].tgl_available,
    };
    setEditForm(data);

    if (data.flag !== 0) {
      setValue('tanggal_mulai', data.tgl_available[0]);
      setValue('tanggal_selesai', data.tgl_available.slice(-1)[0]);
    }
  };

  const EditDateForm = () => {
    return (
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setOpen(false)}>
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between">
                  <h3 className="text-center text-lg font-medium leading-6 text-gray-900">Edit Tanggal</h3>
                  <XIcon className="h-5 cursor-pointer" onClick={() => setOpen(false)} />
                </Dialog.Title>
                <form>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="mt-5">
                      <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <div className="mt-1">
                        <input
                          {...register('tanggal_mulai')}
                          min={watch('tgl_mulai')}
                          max={watch('tgl_selesai')}
                          className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                          name="tanggal_mulai"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                        Tanggal Selesai
                      </label>
                      <div className="mt-1">
                        <input
                          {...register('tanggal_selesai')}
                          min={watch('tgl_mulai')}
                          max={watch('tgl_selesai')}
                          className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                          name="tanggal_selesai"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>

                  {open && (
                    <div className="mt-[24px] flex w-full flex-row">
                      <div className="mx-auto inline-flex">
                        <p
                          className={classNames(
                            editForm?.flag === 0
                              ? 'text-[#DC2626]'
                              : editForm?.flag === '1'
                              ? 'text-yellow'
                              : 'text-[#10B981]',
                            'px-2 text-[14px] '
                          )}
                        >
                          {editForm?.flag === 0
                            ? 'Not Available'
                            : editForm?.flag === '1'
                            ? 'Partialy Available'
                            : 'Available'}
                          ,
                        </p>
                        <p className="text-[14px]">
                          {editForm?.flag !== 0 &&
                            format(new Date(editForm?.tgl_available[0]), 'dd MMM yyyy') +
                              ' - ' +
                              format(new Date(editForm?.tgl_available.slice(-1)), 'dd MMM yyyy')}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="mt-[24px] flex inline-flex w-full rounded-md border border-transparent bg-indigo-600 py-2 text-center text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={editDate}
                  >
                    <p className="mx-auto">Simpan</p>
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const editDate = async () => {
    const newState = [...listPegawai];
    newState[selectedId].flag = editForm.flag;
    newState[selectedId].tgl_available = editForm.tgl_available;
    setOpen(false);
  };

  React.useEffect(() => {
    if (editForm.flag !== '') {
      (async () => {
        if (watch('tanggal_mulai') !== '' && watch('tanggal_selesai') !== '') {
          const dataAvail = await callAPI(
            RekapDinasAPI.GET_DINAS_PEGAWAI_AVAILABILITY,
            {
              pegawai_id: listPegawai[selectedId]?.pegawai_id,
              tgl_mulai: watch('tanggal_mulai'),
              tgl_selesai: watch('tanggal_selesai'),
            },
            { method: 'get' }
          );

          let data = {
            flag: dataAvail.data.data.flag,
            tgl_available: dataAvail.data.data.tgl_available,
          };
          setEditForm(data);
        }
      })();
    }
  }, [watch('tanggal_mulai'), watch('tanggal_selesai')]);

  React.useEffect(() => {
    if (listPegawai.length > 0) {
      setReload(true);
      let list = [];
      listPegawai.map(data => {
        (async () => {
          const dataAvail = await callAPI(
            RekapDinasAPI.GET_DINAS_PEGAWAI_AVAILABILITY,
            { pegawai_id: data.pegawai_id, tgl_mulai: watch('tgl_mulai'), tgl_selesai: watch('tgl_selesai') },
            { method: 'get' }
          );

          if (dataAvail.status === 200) {
            const { data: dataProfilPegawai } = await callAPI(
              KepegawaianAPI.GET_PEGAWAI_LIST,
              { nama: data.nama, status_cpns: [0], page: 1, per_page: 10 },
              { method: 'GET' }
            );

            let dataPegawai = {
              pegawai_id: dataProfilPegawai.data.list[0].pegawai_id,
              nama: dataProfilPegawai.data.list[0].name,
              nip: dataProfilPegawai.data.list[0].nip,
              unit_kerja: dataProfilPegawai.data.list[0].unit_kerja,
              flag: dataAvail.data.data.flag,
              tgl_available: dataAvail.data.data.tgl_available,
            };

            let newState = [...list];
            newState.push(dataPegawai);
            setListPegawai(newState);
          }
          setReload(false);
        })();
      });
    }
  }, [watch('tgl_mulai'), watch('tgl_selesai')]);

  React.useEffect(() => {
    (async () => {
      if (type === 'edit') {
        const detailForm = await callAPI(RekapDinasAPI.GET_DINAS_DETAIL, { dinas_id: dinas_id }, { method: 'get' });

        if (detailForm.status === 200) {
          let newState = [...listPegawai];
          setValue('unit_kerja_id', await getIdUnitKerja(detailForm?.data?.data?.unit_kerja_str));
          setValue('no_sp', detailForm?.data?.data?.no_sp);
          setValue('tgl_surat', detailForm?.data?.data?.tgl_surat);
          setValue('jenis_dinas', detailForm?.data?.data?.jenis_dinas === 'Dinas SPPD' ? 1 : 2);
          setValue('tgl_mulai', detailForm?.data?.data?.tgl_mulai);
          setValue('tgl_selesai', detailForm?.data?.data?.tgl_selesai);
          setValue('lokasi', detailForm?.data?.data?.lokasi);
          setValue('isi_penugasan', detailForm?.data?.data?.isi_penugasan);
          setValue('document_uuid', detailForm?.data?.data?.surat_tugas?.[0]?.document_uuid);
          setValue('document_name', detailForm?.data?.data?.surat_tugas?.[0]?.document_name);

          {
            detailForm?.data?.data?.pegawai.map(each => {
              let dataPegawai = {
                pegawai_id: each.pegawai_id,
                nama: each.nama_pegawai,
                nip: each.nip,
                unit_kerja: each.unit_kerja_str,
                flag: each.flag,
                tgl_available: [each.tgl_mulai, each.tgl_selesai],
              };
              newState.push(dataPegawai);
            });
          }
          setListPegawai(newState);
        }
      }
    })();
  }, []);

  const getIdUnitKerja = async name => {
    let id = 0;
    const { data: unit_kerja } = await callAPI(UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT, null, { method: 'GET' });
    if (unit_kerja.status === 'OK') {
      const getId = unit_kerja?.data?.filter(each => each.name === name);
      id = getId?.[0]?.unit_kerja_id;
    }
    return id;
  };

  const { data: pegawaiList } = useCommonApi(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    { page: 1, per_page: 20, status_cpns: [0], nama: queryPegawai },
    { method: 'GET' }
  );

  if (throwError) {
    throw throwError;
  }

  console.log(listPegawai);

  return (
    <>
      <EditDateForm />
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="rounded-lg bg-white shadow">
          {props?.type === 'edit' && (
            <a href="/kepegawaian/rekap-dinas?id=1" className="flex flex-row items-center gap-x-2 py-6 px-6">
              <ChevronLeftIcon className="h-5 w-5" />
              <div>Kembali</div>
            </a>
          )}
          <div className={classNames(props?.type === 'add' ? 'py-6' : 'pb-6', 'px-6')}>
            <div className="flex flex-col">
              <p className="text-[24px] font-medium text-gray-900">
                {props?.type === 'add' ? 'Pendataan Dinas' : 'Data Dinas'}
              </p>
              <p className="text-[16px] font-[400] text-[#6B7280]">
                Isi data dibawah ini berdasarkan informasi yang tercantum pada surat tugas
              </p>
            </div>

            <div className="mt-[32px] w-full">
              <div className="mt-5 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <select
                    className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                    {...register('unit_kerja_id', { required: 'Silahkan masukan unit organisasi.' })}
                    disabled={type === 'edit' ? true : false}
                  >
                    <option value="">Semua</option>
                    {(unitKerjaList || []).map((item, index) => (
                      <option key={`options-${index}`} value={item?.unit_kerja_id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {errors.unit_kerja_id && <p className="mt-1 text-xs text-red-500">{errors.unit_kerja_id.message}</p>}
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="no_sp" className="block text-sm font-medium text-gray-700">
                  Nomor SP
                </label>
                <div className="pt-1">
                  <input
                    {...register('no_sp', { required: 'Silahkan masukan nomor surat.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="no_sp"
                    type="text"
                    disabled={type === 'edit' ? true : false}
                  />
                  {errors.no_sp && <p className="mt-1 text-xs text-red-500">{errors.no_sp.message}</p>}
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="tgl_surat" className="block text-sm font-medium text-gray-700">
                  Tanggal Surat
                </label>
                <div className="pt-1">
                  <input
                    {...register('tgl_surat', {
                      validate: {
                        required: value => {
                          if (value === '') {
                            return 'Silahkan masukan tanggal surat.';
                          } else if (watch('tgl_mulai') !== '') {
                            if (value > watch('tgl_mulai')) {
                              return 'Tanggal surat tidak boleh lebih besar dari tanggal mulai dinas';
                            }
                          } else {
                            return true;
                          }
                        },
                      },
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tgl_surat"
                    type="date"
                    disabled={type === 'edit' ? true : false}
                  />
                  {errors.tgl_surat && <p className="mt-1 text-xs text-red-500">{errors.tgl_surat.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Jenis Dinas</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register('jenis_dinas', { required: 'Silahkan masukan nama diklat.' })}
                    name="jenis_dinas"
                    className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                    disabled={type === 'edit' ? true : false}
                  >
                    <option value={''}>Silahkan Pilih</option>
                    <option value={1}>Dinas SPPD</option>
                    <option value={2}>Dinas Non SPPD</option>
                  </select>
                  {errors.jenis_dinas && <p className="mt-1 text-xs text-red-500">{errors.jenis_dinas.message}</p>}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Mulai Dinas</label>
                  <div className="pt-1 sm:col-span-2 sm:mt-0">
                    <input
                      {...register('tgl_mulai', {
                        validate: {
                          required: value => {
                            if (value === '') {
                              return 'Silahkan masukan tanggal mulai dinas.';
                            } else if (watch('tgl_selesai') !== '') {
                              if (value > watch('tgl_selesai')) {
                                return 'Tanggal mulai tidak boleh lebih besar dari tanggal selesai';
                              }
                            } else {
                              return true;
                            }
                          },
                        },
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_mulai"
                      type="date"
                    />
                    {errors.tgl_mulai && <p className="mt-1 text-xs text-red-500">{errors.tgl_mulai.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Selesai Dinas</label>
                  <div className="pt-1 sm:col-span-2 sm:mt-0">
                    <input
                      {...register('tgl_selesai', {
                        validate: {
                          required: value => {
                            if (value === '') {
                              return 'Silahkan masukan tanggal selesai dinas.';
                            } else if (watch('tgl_mulai') !== '') {
                              if (value < watch('tgl_mulai')) {
                                return 'Tanggal selesai tidak boleh lebih kecil dari tanggal mulai';
                              }
                            } else {
                              return true;
                            }
                          },
                        },
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_selesai"
                      type="date"
                    />
                    {errors.tgl_selesai && <p className="mt-1 text-xs text-red-500">{errors.tgl_selesai.message}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <Controller
                    control={control}
                    name="pic"
                    rules={{ required: 'Mohon isi PIC Kegiatan' }}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteCustom
                        onChange={input => {
                          console.log(input);
                          onChange(input?.value);
                        }}
                        label={'PIC Kegiatan'}
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
                          text: each.name,
                          value: each.pegawai_id,
                        }))}
                      />
                    )}
                  />
                  {errors.pic && <p className="mt-1 text-xs text-red-500">{errors.pic.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Lokasi Dinas</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <input
                    {...register('lokasi', { required: 'Silahkan masukan lokasi dinas.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="lokasi"
                    type="text"
                  />
                  {errors.lokasi && <p className="mt-1 text-xs text-red-500">{errors.lokasi.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Isi Penugasan</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    {...register('isi_penugasan', { required: 'Silahkan masukan isi penugasan.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="isi_penugasan"
                  />
                  {errors.isi_penugasan && <p className="mt-1 text-xs text-red-500">{errors.isi_penugasan.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <div className="h-[1px] w-full bg-[#D1D5DB]"></div>
              </div>

              <div className="mt-5">
                <label className="block pb-1 text-sm font-medium text-gray-700">Unggah Surat Tugas</label>
                <Controller
                  control={control}
                  name={'document_name'}
                  rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                  render={({ field: { onChange, value } }) => (
                    <UploadWrapper
                      allowedTypes={['pdf']}
                      handleUploadChange={files => {
                        setValue('document_uuid', files[0].id);
                        onChange(files[0].name);
                      }}
                    >
                      {({ loading }) => (
                        <div
                          className={classNames(
                            'flex items-center justify-between border-[1px] p-3',
                            errors.file_name ? 'border-red-500' : ''
                          )}
                        >
                          <div>
                            <div className="text-sm text-gray-600">{value || 'Surat Tugas'}</div>
                            <div className="text-xs text-gray-400">(pdf)</div>
                          </div>
                          <button
                            disabled={loading}
                            type="button"
                            className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                          >
                            {loading ? <CircleProgress /> : null}
                            <UploadIcon className="mr-1 h-4" />
                            Upload
                          </button>
                        </div>
                      )}
                    </UploadWrapper>
                  )}
                ></Controller>
                {errors.document_name && <p className="mt-1 text-xs text-red-500">{errors.document_name.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white shadow">
          <div className="p-6 px-6 pb-[51px]">
            <div className="mt-5">
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                {watch('tgl_mulai') !== '' && watch('tgl_selesai') !== '' ? (
                  <AutoCompletePegawai
                    onChange={value => {
                      getAvail(value);
                      clearErrors('pegawai');
                    }}
                  />
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700">Pegawai</label>
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="lokasi"
                      type="text"
                      placeholder="Silahkan masukan tanggal mulai dan tanggal selesai dinas terlebih dahulu"
                      disabled={true}
                    />
                  </>
                )}
                {errors.pegawai && <p className="mt-1 text-xs text-red-500">Silahkan masukan minimal 1 pegawai</p>}
              </div>
            </div>

            <div className="mt-5">
              {!reload &&
                listPegawai?.map((each, idx) => (
                  <>
                    <div className="flex w-full flex-row">
                      <div>
                        <p className="px-2 text-[14px]">{idx + 1}</p>
                      </div>
                      <div className="flex flex-col gap-y-[8px]">
                        <p className="px-2 text-[14px]">
                          {each?.nama}
                          {' - '}
                          {each?.nip}
                        </p>
                        <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.unit_kerja}</p>
                        <div className="flex flex-row">
                          <p
                            className={classNames(
                              each?.flag === 0
                                ? 'text-[#DC2626]'
                                : each?.flag === 1
                                ? 'text-yellow-400'
                                : 'text-[#10B981]',
                              'px-2 text-[14px]'
                            )}
                          >
                            {each?.flag === 0 ? 'Not Available' : each?.flag === 1 ? 'Partialy Available' : 'Available'}
                            ,
                          </p>
                          <p className="max-w-[400px] text-[14px] tracking-normal">
                            {each.flag === 1 &&
                              each.tgl_available.map((date, idx) =>
                                idx === each.tgl_available.length - 1
                                  ? `${format(new Date(date), 'dd MMM yyyy')}`
                                  : `${format(new Date(date), 'dd MMM yyyy')}, `
                              )}
                            {each.flag === 2 &&
                              format(new Date(each.tgl_available[0]), 'dd MMM yyyy') +
                                ' - ' +
                                format(new Date(each.tgl_available.slice(-1)), 'dd MMM yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="flex flex-row gap-x-[12px]">
                          <button
                            type="button"
                            className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                            onClick={() => removeList(idx, each?.nip)}
                          >
                            Hapus
                          </button>
                          <button
                            type="button"
                            className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                            onClick={() => handleEdit(idx)}
                          >
                            Edit Tanggal
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
                  </>
                ))}
            </div>

            <div className="mt-[3rem] flex w-full">
              <div className="ml-auto flex flex-row gap-x-[12px]">
                <button
                  type="button"
                  className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() => (window.location.href = '/kepegawaian/rekap-dinas')}
                >
                  Batal
                </button>
                <button
                  disabled={load}
                  type="submit"
                  className="inline-flex rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() => {
                    listPegawai.length === 0 && setError('pegawai', { type: 'required' });
                  }}
                >
                  {load ? <CircleProgress /> : null}
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>

        {listDeletedPegawai.length > 0 && (
          <div className="mt-6 rounded-lg bg-white shadow">
            <div className="p-6 px-6 pb-[51px]">
              <div className="mt-5">
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <p className="text-sm font-medium text-gray-700">Pegawai Dihapus</p>
                </div>
              </div>
              <div className="mt-5">
                {listDeletedPegawai?.map((each, idx) => (
                  <>
                    <div className="flex w-full flex-row">
                      <div>
                        <p className="px-2 text-[14px]">{idx + 1}</p>
                      </div>
                      <div className="flex flex-col gap-y-[8px]">
                        <p className="px-2 text-[14px]">
                          {each?.nama}
                          {' - '}
                          {each?.nip}
                        </p>
                        <p className="px-2 text-[12px] font-[400] text-[#6B7280]">{each?.unit_kerja}</p>
                        <div className="flex flex-row">
                          <p
                            className={classNames(
                              each?.flag === 0
                                ? 'text-[#DC2626]'
                                : each?.flag === '1'
                                ? 'text-yellow'
                                : 'text-[#10B981]',
                              'px-2 text-[14px]'
                            )}
                          >
                            {each?.flag === 0
                              ? 'Not Available'
                              : each?.flag === '1'
                              ? 'Partialy Available'
                              : 'Available'}
                            ,
                          </p>
                          {each.flag !== 0 && (
                            <p className="text-[14px]">
                              {' '}
                              {format(new Date(each?.tgl_available?.[0]), 'dd MMM yyyy')} -{' '}
                              {format(new Date(each.tgl_available.slice(-1)), 'dd MMM yyyy')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default AddRekapPage;
