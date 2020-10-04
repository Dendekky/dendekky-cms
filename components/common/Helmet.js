/* eslint-disable no-nested-ternary */
import Head from "next/head"
import { blogTitle, blogSubtitle, headerBg, siteUrl } from "../../user.json"

const PageMetadata = ({ title, id, category, tag, image }) => {
  const URL = id
    ? `${siteUrl}/post/${id}`
    : tag
    ? `${siteUrl}/tags/${tag}`
    : category
    ? `${siteUrl}/category/${category}`
    : siteUrl

  const IMAGE = image || headerBg
  const description =
    `${blogTitle} - ${title}` || `${blogTitle} - ${blogSubtitle}`

  return (
    <Head>
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="google-site-verification"
        content="Cgvb_6lzpqSLvjl7hB3wf20urDg3N5EEePTjk4Q7TMk"
      />
      <meta name="description" content={description} />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        href="/icon/favicon-16x16-dunplab-manifest-12814.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icon/favicon-32x32-dunplab-manifest-12814.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="/icon/apple-icon-180x180-dunplab-manifest-12814.png"
      />
      <meta name="theme-color" content="#f32167" />

      {/* <meta name="theme-color" content="#f32167" />
      <link
        rel="apple-touch-icon"
        href="/public/icon/apple-icon-180x180-dunplab-manifest-12814.png"
      />
      <meta name="apple-mobile-web-app-title" content={description} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" /> */}

      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:site_name" content={blogTitle} key="ogsitename" />
      <meta property="og:description" content={blogSubtitle} key="ogdesc" />

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
        rel="stylesheet"
      />
      <script 
        data-ad-client="ca-pub-3189625615758304" 
        async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" 
      />
    </Head>
  )
}

export default PageMetadata
