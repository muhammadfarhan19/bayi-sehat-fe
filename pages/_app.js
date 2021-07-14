import '../styles/globals.css'
import Head from 'next/head';
import reducer from '../reducer/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function MyApp({ Component, pageProps }) {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <Head> <title>Intra DIKTI</title></Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
