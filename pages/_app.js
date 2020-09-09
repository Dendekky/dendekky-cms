// import '../styles/globals.css'
// import Head from 'next/head'
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/scss/bootstrap.scss"
import { Layout } from "../components/layout"
import "../assets/scss/index.scss"
// import "react-quill/dist/quill.snow.css"

function MyApp({ Component, pageProps }) {
  const MainLayout = Component.View === "admin" ? null : Layout
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
