/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormInput,
  Button,
  FormTextarea,
} from "shards-react"
// import LoadingAnimation from "../components/common/Loading"
import http from "../../services/Apicalls"
import PageTitle from "../../components/common/PageTitle"
// import Errors from "../admin/views/Errors"
import Comment from "../../components/Comments"
import PageMetadata from "../../components/common/Helmet"

function ViewPost ({ post }) {
  const [item, setItem] = useState({
    name: "",
    comment: "",
  })
  const [postWithUpdatedComment, setPostWithUpdatedComment] = useState({})

  const onChange = (e) => setItem({ ...item, [e.target.name]: e.target.value})

  const addComment = (
    e,
    replyComment = false,
    parentComment = null,
    name = null,
    message = null
  ) => {
    if (replyComment === false && this.state.comment === "") {
      return
    }
    if (replyComment && message === "") {
      return
    }
    const data = {
      postId: post._id,
      name: replyComment === true ? name : item.name,
      message: replyComment === true ? message : item.comment,
    }
    if (replyComment === true) {
      data.parentId = parentComment._id
      data.depth = parentComment.depth + 1
    }
    http
      .post("/api/comment", data)
      .then((res) => {
        if (res.status === 201) {
          http
            .get(`/api/post/${post._id}`)
            .then((result) => {
              setPostWithUpdatedComment(result.data)
            })
            .catch(() => {
              console.log("some error")
            })
        } else {
          console.log("error performing task")
        }
      })
      .catch((error) => console.log(error))
  }

  const displayComments = (allComments) => {
    let comments = []
    for (const comment of Object.values(allComments)) {
      comments.push(
        <Comment
          loggedIn={null}
          commentData={comment}
          key={comment._id}
          refreshCommentsAfterEdit={null}
          addComment={addComment}
        />
      )
      if (comment.children && Object.keys(comment.children).length > 0) {
        const replies = displayComments(comment.children)
        comments = comments.concat(replies)
      }
    }
    return comments
  }

    const comments = displayComments(Object.entries(postWithUpdatedComment).length !== 0 ? postWithUpdatedComment.comments : post.comments || [])

    // if (isLoading) {
    //   return <LoadingAnimation />
    // }
    // if (isError) {
    //   return <Errors />
    // }
    return (
      <div className="blogpost">
        <PageMetadata title={post.title} id={post._id} image={post.postImage} />
        <Container fluid className="main-content-container px-4 pb-4">
          <Row>
            <Col md="12" lg="8">
              <Row noGutters className="page-header py-4 mx-3 px-3">
                <Col lg="12" md="12">
                  <PageTitle
                    sm="12"
                    title={post.title}
                    subtitle={post.category}
                    className="text-sm-left"
                  />
                  <Row className="ml-3 my-1 font-italic lead">Published on: {new Date(post.updatedAt).toDateString()}</Row>
                  <img
                    alt="post"
                    style={{
                      width: "100%",
                      borderRadius: "2px",
                      marginTop: "6px",
                    }}
                    className="my-2 py-2"
                    src={post.postImage}
                  />
                  <div
                    style={{ wordWrap: "break-word", fontSize: "18px" }}
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                </Col>
                <Col lg="12" md="12">
                  <Card className="mx-0 px-0">
                    <CardHeader className="mb-0 pb-0 font-weight-bolder lead">
                      Discussions
                    </CardHeader>
                    <CardBody>
                      <Row className="">
                        <Col sm="12" md="6" lg="6">
                          <label htmlFor="name">Name</label>
                          <FormInput
                            value={item.name}
                            name="name"
                            type="text"
                            onChange={onChange}
                          />
                        </Col>
                        <Col sm="12" md="12" lg="12">
                          <label htmlFor="comment">Comment</label>
                          <FormTextarea
                            name="comment"
                            value={item.comment}
                            placeholder="Type your comment..."
                            style={{ width: "100%" }}
                            onChange={onChange}
                          />
                        </Col>
                      </Row>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: "#2196f3", marginTop: "1%" }}
                        onClick={addComment}
                      >
                        Submit
                      </Button>
                      <div>
                        <div className="mt-2 font-weight-bold">
                          {Object.entries(postWithUpdatedComment).length !== 0 ? postWithUpdatedComment.commentsLength : post.commentsLength || 0} Comments
                        </div>
                        <div>{comments}</div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg="4" className="py-4 px-3 my-4">
              <div>
              <PageTitle
                sm="12"
                title="Share Post"
                // subtitle={post.category}
                className="text-sm-left"
              />
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button px-3"
                data-show-count="true"
              >
                <img src="https://img.icons8.com/material/24/000000/twitter-squared.png" />
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              />
              </div>
              <div className="mt-5 mt-md-5 mt-lg-5 related-posts">
              <PageTitle
                sm="12"
                title="Related Posts"
                className="text-sm-left"
              />
              <Row>
                {post.relatedPosts.map((val) => (
                  <Link key={val._id} href={`/post/${val._id}`} as={`/post/${val._id}`}>
                    <a className="text-decoration-none text-fiord-blue">
                    <Col sm="12" md="12" lg="12" className="mx-1 my-1 my-md-2 my-lg-2 single-post">
                      <Card>
                        <Row>
                          <Col sm="3" md="3" lg="3" className="px-0 mx-0" 
                          >
                            <img
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "8px 0 0 8px",
                                objectFit: "cover",
                              }}
                              alt={`related-post-${val.title}`}
                              src={val.postImage}
                            />
                          </Col>
                          <Col sm="9" md="9" lg="9" className="py-1">
                            {val.title}
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    </a>
                  </Link>
                ))}
              </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await http.get(`/api/post`)
  const posts = await res.data.posts

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/post/${post._id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const res = await http.get(`/api/post/${params.id}`)
    const post = await res.data
  
    // By returning { props: posts }, the Blog component
    // will receive `post` as a prop at build time
    return {
      props: {
        post,
      },
    }
}

export default ViewPost
