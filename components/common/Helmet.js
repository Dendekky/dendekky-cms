import Head from 'next/head'

const PageMetadata = ({ title, id, image }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://marblesofhameedah.netlify.app/post/${id}`}
      />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default PageMetadata
