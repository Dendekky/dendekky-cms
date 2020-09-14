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

  const IMAGE = id ? image : headerBg
  const description =
    `${blogTitle} - ${title}` || `${blogTitle} - ${blogSubtitle}`

  return (
    <Head>
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      <link rel="manifest" href="/public/manifest.json" />
      <link
        href="/public/icon/favicon-16x16-dunplab-manifest-12814.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/public/icon/favicon-32x32-dunplab-manifest-12814.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="/public/icon/apple-icon-180x180-dunplab-manifest-12814.png"
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
    </Head>
  )
}

export default PageMetadata
