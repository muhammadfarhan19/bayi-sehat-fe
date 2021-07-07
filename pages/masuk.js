import React from 'react';
import Head from 'next/head';

import reducer from '../reducer/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LoginPage from '../components/login/LoginPage.js';

function Masuk() {
  const store = createStore(reducer);
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>Masuk Intra DIKTI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginPage />

    </Provider>
    </>
  );
}

export default Masuk;
