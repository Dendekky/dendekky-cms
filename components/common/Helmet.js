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
  const description = title || blogSubtitle

  return (
    <Head>
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

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
