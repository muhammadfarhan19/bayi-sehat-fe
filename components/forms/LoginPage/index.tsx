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
    setError,
  } = useForm<PostAuthLoginReq>()

  const onSubmit = async (val: PostAuthLoginReq) => {
    try {
      const response: any = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(val),
      }).then(response => response.json())

      if (response?.statusCode === 200) {
        const { accessToken, refreshToken } = response.data
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <input
          type="text"
          className="w-full rounded-md border p-3"
          placeholder="email"
          {...register('email', { required: true })}
        />
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
