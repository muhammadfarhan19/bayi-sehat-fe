import '../styles/globals.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import AuthLayout from '../components/layout/AuthLayout'
import MainLayout from '../components/layout/MainLayout'

const authLayoutDisability = ['/login']

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>Bayi Sehat</title>
        <link rel="icon" type="image/x-icon" href="../../public/assets/logo.png" />
      </Head>
      {authLayoutDisability.includes(pathname) ? (
        <AuthLayout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <MainLayout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </MainLayout>
      )}
    </>
  )
}

export default MyApp
