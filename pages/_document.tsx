import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      title: 'Bayi Sehat',
      description: 'Sayangi Anak Kita, Cegah Stunting Sejak Dini',
      image: '../../public/assets/logo.png',
    }

    return (
      <Html className="h-full" lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
        </Head>
        <body className="m-5 h-full bg-slate-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
