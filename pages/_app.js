// import '../styles/globals.css'
// import Head from 'next/head'
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/scss/bootstrap.scss"
import { Layout } from "../components/layout"
import "../assets/scss/index.scss"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous" />
        </Head> */}
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
