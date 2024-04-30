import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage: React.FC = () => {
  const router = useRouter()

  const onSubmit = async (val: any) => {
    try {
      await fetch('/api/users/new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val),
      })
      router.push('/auth/signin')
    } catch (error) {
      console.log(error)
      // router.refresh()
    }
  }

  return (
    <section className="flex flex-col space-y-10">
      <aside className="text-center">Silakan masukkan data diri</aside>
      <form onSubmit={onSubmit} className="w-full space-y-5">
        <input
          type="text"
          className="w-full rounded-md border p-3"
          placeholder="Name"
          // {...form.register('name')}
        />
        <input
          type="email"
          className="w-full rounded-md border p-3"
          placeholder="Email"
          // {...form.register('email')}
        />
        <input
          type="text"
          className="w-full rounded-md border p-3"
          placeholder="Alamat"
          // {...form.register('address')}
        />
        <input
          type="password"
          className="w-full rounded-md border p-3"
          placeholder="Kata Sandi"
          // {...form.register('password')}
        />
        <button type="submit" className="w-full rounded-md border bg-teal-400 p-3 font-semibold text-white">
          Daftar
        </button>
      </form>

      <aside className="text-center">
        Sudah punya akun?{' '}
        <Link href="/auth/signin" className="text-blue-500">
          Login
        </Link>
      </aside>
    </section>
  )
}

export default RegisterPage
