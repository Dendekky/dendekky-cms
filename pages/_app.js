import dynamic from "next/dynamic"
import "nprogress/nprogress.css"
// import '../styles/globals.css'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/scss/bootstrap.scss"

import { MainLayout, AdminLayout } from "../components/layout"
// import PrivateRoute from "../components/PrivateRoute"

import "../assets/scss/index.scss"

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar")
  },
  { ssr: false }
)

// const ServiceWorker = () =>
//   dynamic(
//     () => {
//       return import("../serviceWorker").then((engine) => engine.register)
//     },
//     { ssr: false }
//   )

function MyApp({ Component, pageProps, router }) {
  // ServiceWorker()

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
