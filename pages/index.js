/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from "react"
import Head from 'next/head'
import Link from 'next/link'
import http from "../services/Apicalls"
import { Container, Row, Col, Card, CardBody, Badge, CardFooter, Tooltip } from "shards-react"
// import LoadingAnimation from "../components/common/Loading"
import PageTitle from "../components/common/PageTitle"
// import Errors from "./admin//Errors"

function BlogPosts ({ posts }) {

const postIdList = posts.map((post) => ({
  id: post._id,
  tooltipOpen: false,
}))

const postsArray = [...posts]
const category = postsArray.map((item) => item.category).filter((v, i, self) => i == self.indexOf(v))
const tags = postsArray.map((item) => item.tags).flat().filter((v, i, self) => i == self.indexOf(v))
const popularPosts = postsArray.sort((a, b) => b.comments.length - a.comments.length).slice(0, 3)

const [postToggleOpen, setPostToggleOpen] = useState(postIdList)
const toggleUniqueTooltip = (tooltipId) => {
  const data = [...postToggleOpen]
  data[tooltipId] = {
    ...data[tooltipId],
    tooltipOpen: !data[tooltipId].tooltipOpen
  }
  setPostToggleOpen(data)
}

  const trimmedPostBody = (postBody, maxChar) => {
    // const maxChar = 150
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
        <Col md="9" lg="9">
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
              <CardBody id={`post-${post._id}`}>
                <h4 className="card-title">
                  <Link href={`/post/${post._id}`} as={`/post/${post._id}`}>
                    <a className="text-fiord-blue">{trimmedPostBody(post.title, 50)}</a>
                  </Link>
                </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: trimmedPostBody(post.body, 120),
                  }}
                />
              </CardBody>
              <Tooltip
                style={{
                  minWidth: "320px",
                  fontSize: "20px",
                }}
                // placement="bottom"
                open={postToggleOpen[idx].tooltipOpen}
                target={`#post-${post._id}`}
                toggle={() => toggleUniqueTooltip(idx)}
              >
                {post.title}
              </Tooltip>
              <CardFooter>
                <span className="text-muted">
                  {new Date(post.updatedAt).toDateString()}
                </span>
              </CardFooter>
            </Card>
          </Col>
        ))}
        </Row>
      </Col>
      <Col md="3" lg="3" className="my-2">
        <PageTitle
          sm="12"
          title="Blog Category"
          className="text-sm-left text-uppercase"
        />
        <hr />
        {category.map((item, idx) => (
          <Badge
            className="mx-1 my-1 text-uppercase font-weight-bold lead"
            href="#"
            key={idx}
            // outline
          >
              {item}
          </Badge>
        ))}
        <PageTitle
          sm="12"
          title="Tags"
          className="text-sm-left text-uppercase my-5"
        />
        <hr />
        {tags.map((item, idx) => (
          <Badge
            className="mx-1 my-1 text-uppercase"
            href="#" 
            theme="info" 
            key={idx} 
            outline
          >
              {item}
          </Badge>
        ))}
        <PageTitle
          sm="12"
          title="Popular Posts"
          className="text-sm-left text-uppercase my-5"
        />
        <hr />
        {popularPosts.map((post) => (
          <div key={post._id} className="mb-5">
            <img
              src={post.postImage}
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "100px"
              }}
              alt="post-image"
            />
            <h4 className="">
              <Link href={`/post/${post._id}`} as={`/post/${post._id}`}>
                <a className="text-decoration-none">{trimmedPostBody(post.title, 20)}</a>
              </Link>
            </h4>
            <span>{new Date(post.updatedAt).toDateString()}</span>
          </div>
        ))}
      </Col>
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
