// import '../styles/globals.css'
// import Head from 'next/head'
// import "bootstrap/dist/css/bootstrap.min.css"
import "nprogress/nprogress.css"
import "bootstrap/scss/bootstrap.scss"
// import "shards-ui/src/scss/shards.scss"

import dynamic from "next/dynamic"
import { MainLayout, AdminLayout } from "../components/layout"

import "../assets/scss/index.scss"
// import "react-quill/dist/quill.snow.css"

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar")
  },
  { ssr: false }
)

const ServiceWorker = () =>
  dynamic(
    () => {
      return import("../serviceWorker").then((engine) => engine.register)
    },
    { ssr: false }
  )

function MyApp({ Component, pageProps, router }) {
  ServiceWorker()

  if (router.pathname.startsWith("/admin/")) {
    return (
      <AdminLayout>
        <TopProgressBar />
        <Component {...pageProps} />
      </AdminLayout>
    )
  }

  return (
    <MainLayout>
      <TopProgressBar />
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register()
