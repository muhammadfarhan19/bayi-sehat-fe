import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUsers, useDeleteUser } from '../../shared/fetcher/settings/FetcherSettings';
import { AlertAction } from '../../../action/ActionTypes';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import config from '../../../utils/Config'
import { request } from '../../shared/fetcher/FetcherHooks';

export default function userList() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [uuid, setUuid] = useState('')
    const userDelete = useDeleteUser();
    const router = useRouter();

    const alert = useSelector(state => {
        return {
            confirm: state.AlertReducer.confirm,
        };
    }, shallowEqual);

    useEffect(() => {
        (async () => {
            try {
                const getUsers = await request(config.apiHost + '/users', '', 'get', true);
                setData(getUsers.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, [uuid])

    const handleDelete = (id) => {
        setUuid(id)
        dispatch({
            type: AlertAction.SET_OPEN,
            open: true,
            title: 'Apakah anda yakin menghapus akun ini?',
            subtitle: 'Anda tidak dapat mengembalikan data ini setelah di hapus',
            status: 'confirmation'
        });
    }

    if (uuid !== '' && alert.confirm) {
        (async () => {
            try {
                const delUsers = await userDelete(uuid);
                setUuid('')
                if(delUsers.status === 'SUCCESS'){
                    dispatch({
                        type: AlertAction.SET_OPEN,
                        open: true,
                        title: 'Data berhasil di hapus',
                        subtitle: '',
                        status: 'success',
                        confirm : false
                    });
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }

    return (
        <>
            <FetcherAlert />
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/manajemen-user/tambah-pengguna')}
                        className="inline-flex mb-2 items-center px-4 py-2 border-2 border-white-600 shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:text-sm"
                    >
                        Tambah
                    </button>
                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <table className="w-full rounded-lg bg-gray-100">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No
                                        </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                        </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Username
                                        </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, userIdx) => (
                                            <tr
                                                key={userIdx}
                                                className={
                                                    userIdx % 2 === 0
                                                        ? "bg-white hover:bg-gray-100"
                                                        : "bg-gray-50 hover:bg-gray-100"
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                    {userIdx+1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                    {user.username}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push({
                                                            pathname: '/admin/manajemen-user/edit-pengguna',
                                                            query: { id: user.id },
                                                        })}
                                                        className="inline-flex mb-2 items-center px-4 py-2 border-2 border-white-600 shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:text-sm"
                                                    >
                                                        Edit
                                                </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user.id)}
                                                        className="inline-flex mb-2 items-center px-4 py-2 border-2 border-white-600 shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 sm:text-sm"
                                                    >
                                                        Delete
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}