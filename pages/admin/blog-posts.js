/* eslint jsx-a11y/anchor-is-valid: 0 */
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
} from "shards-react"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import LoadingAnimation from "../../components/common/Loading"
import http from "../../services/Apicalls"
import PageTitle from "../../components/common/PageTitle"

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res1 = await http.get("/api/draft")
//   const res2 = await http.get("/api/post")
//   // const res = await fetch('https://.../posts')
//   const BlogDraft = await res1.data.drafts.reverse()
//   const BlogPost = await res2.data.posts.reverse()

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       BlogDraft,
//       BlogPost,
//     },
//   }
// }

function BlogPosts() {
  const [blogPost, setBlogPosts] = useState([])
  const [blogDraft, setBlogDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await http.get("/api/post")
      const allDrafts = await http.get("/api/draft")
      setBlogPosts(allPosts.data.posts.reverse())
      setBlogDrafts(allDrafts.data.drafts.reverse())
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <LoadingAnimation />
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Blog Posts"
          subtitle="Components"
          className="text-sm-left"
        />
      </Row>

      {/* Posts */}
      <Row>
        {blogPost.map((post, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${post.postImage})` }}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${post.categoryTheme}`}
                >
                  {post.category}
                </Badge>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <Link href={`/admin/post/${post.slug}`}>
                    <a className="text-fiord-blue">{post.title}</a>
                  </Link>
                </h5>
                <p className="card-text d-inline-block mb-3">{post.metadata}</p>
                <span className="text-muted">{post.updatedAt}</span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drafts */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Blog Drafts"
          subtitle="Components"
          className="text-sm-left"
        />
      </Row>
      <Row>
        {blogDraft.map((post, idx) => (
          <Col lg="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--aside card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url('${post.postImage}')` }}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${post.categoryTheme}`}
                >
                  {post.category}
                </Badge>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <Link href={`/admin/draft/${post._id}`}>
                    <a>{post.title}</a>
                  </Link>
                </h5>
                <p className="card-text d-inline-block mb-3">{post.metadata}</p>
                <p className="text-muted">Date: {post.updatedAt}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default BlogPosts
