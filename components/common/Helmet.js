import Head from "next/head"

const PageMetadata = ({ title, id, image }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{`${title} | MarblesOfHameedah`}</title>
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://marblesofhameedah.netlify.app/post/${id}`}
      />
      <meta property="og:image" content={image} />
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
