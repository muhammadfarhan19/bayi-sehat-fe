import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import { PostAuthLoginReq, PostAuthLoginRes } from '../../../types/authType'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostAuthLoginReq>()

  const onSubmit = async (val: PostAuthLoginReq) => {
    try {
      const response: any = await axios.post('http://localhost:4000/auth/login', val, {
        withCredentials: true,
      })

      console.log(response.data)

      if (response?.data?.statusCode === 200) {
        const { accessToken, refreshToken } = response.data.data
        Cookies.set('token', accessToken)
        Cookies.set('refreshtoken', refreshToken)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex flex-col space-y-10">
      <aside className="text-center text-black">
        Silakan Login menggunakan <br />
        Email yang sudah terdaftar
      </aside>
      <form onSubmit={handleSubmit(onSubmit)} className="block w-full  space-y-5">
        <input
          type="text"
          className="w-full rounded-md border p-3"
          placeholder="email"
          {...register('email', { required: true })}
        />
        {/* {errors.email && <p className="mt-1 text-sm text-red-500 h-20">{errors.email.message}</p>} */}
        <input
          type="password"
          className="w-full rounded-md border p-3"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button type="submit" className="w-full rounded-md border bg-teal-400 p-3 font-semibold text-white">
          Login
        </button>
      </form>
    </section>
  )
}

export default LoginPage
