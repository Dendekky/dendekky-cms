// import '../styles/globals.css'
// import Head from 'next/head'
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/scss/bootstrap.scss"
import { Layout } from "../components/layout"
import { DefaultLayout } from "../components/admin-layouts"
import "../assets/scss/index.scss"
import "react-quill/dist/quill.snow.css"

function MyApp({ Component, pageProps }) {
  const MainLayout = Component.View === 'admin' ? DefaultLayout : Layout
  return (
    <MainLayout>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous" />
        </Head> */}
        <Component {...pageProps} />
      </MainLayout>
  )
}

export default MyApp
