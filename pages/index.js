/* eslint jsx-a11y/anchor-is-valid: 0 */
import Head from 'next/head'
import Link from 'next/link'
import http from "../services/Apicalls"
import { Container, Row, Col, Card, CardBody, Badge } from "shards-react"
// import LoadingAnimation from "../components/common/Loading"
import PageTitle from "../components/common/PageTitle"
// import Errors from "./admin//Errors"

function BlogPosts ({ posts }) {
  const trimmedPostBody = (postBody) => {
    const maxChar = 150
    if (postBody.length > maxChar) {
      postBody = postBody.substring(0, maxChar)
      postBody = `${postBody.substring(
        0,
        Math.min(postBody.length, postBody.lastIndexOf(" "))
      )} . . .`
    }
    return postBody
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Blog Posts"
          // subtitle="Components"
          className="text-sm-left"
        />
      </Row>
      <Row>
        {posts.map((post, idx) => (
          <Col lg="6" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${post.postImage})` }}
              >
                <Badge pill className="card-post__category bg-primary">
                  {post.category}
                </Badge>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <Link href={`/post/${post._id}`} as={`/post/${post._id}`}>
                    <a className="text-fiord-blue">{post.title}</a>
                  </Link>
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: trimmedPostBody(post.body),
                  }}
                />
                <span className="text-muted">
                  {new Date(post.updatedAt).toDateString()}
                </span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await http.get("/api/post")
  // const res = await fetch('https://.../posts')
  const posts = await res.data.posts.reverse()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default BlogPosts
