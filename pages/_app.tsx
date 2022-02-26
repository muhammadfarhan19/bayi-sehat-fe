import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Intra DIKTI</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
