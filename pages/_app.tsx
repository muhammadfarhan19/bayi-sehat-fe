import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Intra DIKTI</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
