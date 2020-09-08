/* eslint-disable no-nested-ternary */
import Head from "next/head"

const PageMetadata = ({ title, id, category, tag, image }) => {
  const URL = id
    ? `https://marblesofhameedah.rocks/post/${id}`
    : tag
    ? `https://marblesofhameedah.rocks/tags/${tag}`
    : category
    ? `https://marblesofhameedah.rocks/category/${category}`
    : `https://marblesofhameedah.rocks/`

  const IMAGE = id
    ? image
    : "https://res.cloudinary.com/dendekky/image/upload/c_scale,q_80/v1580633211/Beenah's/hannah-jacobson-pTfdcT0hxGc-unsplash_telwfc.jpg"

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={IMAGE} />
      <meta
        property="og:site_name"
        content="Marbles Of Hameedah"
        key="ogsitename"
      />
      <meta
        property="og:description"
        content="A digital chest of my best thoughts and opinions. Marbles, I call them. From Poetry, to Politics, to the everyday happenstances of life. And of course, the occasional travel documentary."
        key="ogdesc"
      />
    </Head>
  )
}

export default PageMetadata
