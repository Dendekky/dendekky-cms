/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable linebreak-style */
import React, { useState } from "react"
import Link from "next/link"
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  // CardBody,
  // CardHeader,
  FormInput,
  Button,
  FormTextarea,
  Form,
} from "shards-react"
// import LoadingAnimation from "../components/common/Loading"
import http from "../../services/Apicalls"
import PageTitle from "../../components/common/PageTitle"
// import Errors from "../admin/views/Errors"
import Comment from "../../components/Comments"
import PageMetadata from "../../components/common/Helmet"

function ViewPost({ post }) {
  // if (!post) {
  //   return null
  // }
  const [item, setItem] = useState({
    name: "",
    comment: "",
  })
  const [postWithUpdatedComment, setPostWithUpdatedComment] = useState({})
  const [replyState, setReplyState] = useState({
    isSubmit: false,
    alert: false,
    alertMessage: "",
    alertColor: "",
  })
  const onChange = (e) => setItem({ ...item, [e.target.name]: e.target.value })

  const addComment = (
    e,
    replyComment = false,
    parentComment = null,
    name = null,
    message = null
  ) => {
    setReplyState({
      ...replyState,
      isSubmit: true,
    })
    if (replyComment === false && item.comment === "") {
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
          setReplyState({
            ...replyState,
            alert: true,
            alertColor: "success",
            alertMessage: res.data.message,
          })
          http
            .get(`/api/post/${post._id}`)
            .then((response) => {
              setPostWithUpdatedComment(response.data)
              setItem({ ...item, name: "", comment: "" })
            })
            .catch(() => {
              console.log("some error")
            })
        } else {
          let errorText = ""
          if (res.data.errors)
            res.data.errors.forEach((error) => {
              errorText += error.msg
            })
          const errorMessage = res.data.message || errorText
          setReplyState({
            ...replyState,
            alert: true,
            alertColor: "warning",
            alertMessage: errorMessage,
          })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          setReplyState({ alert: false })
        }, 5000)
      })
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

  const comments = displayComments(
    Object.entries(postWithUpdatedComment).length !== 0
      ? postWithUpdatedComment.comments
      : post.comments || []
  )

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
            <Row noGutters className="page-header py-4 mx-3 px-0">
              <Col lg="12" md="12">
                <PageTitle
                  sm="12"
                  title={post.title}
                  subtitle={post.category}
                  className="text-sm-left"
                />
                <Row className="ml-3 my-1 font-italic lead">
                  Published on: {new Date(post.updatedAt).toDateString()}
                </Row>
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
                  style={{
                    fontSize: "18px",
                    hyphens: "auto",
                    textAlign: "justify",
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
                <hr />
              </Col>
              <Col lg="12" md="12">
                <Row className="mx-0 px-0">
                  <Col className="mb-0 pb-0 lead discussions">Discussions</Col>
                  <Col sm="12" md="12" lg="12">
                    <div>
                      <div className="my-2 comments-number">
                        {Object.entries(postWithUpdatedComment).length !== 0
                          ? postWithUpdatedComment.commentsLength
                          : post.commentsLength || 0}{" "}
                        Comments on {post.title}
                      </div>
                      <div>{comments}</div>
                    </div>
                    <Form>
                      <Row className="reply-form">
                        <Col sm="12" md="12" lg="12">
                          <h4>Leave a Reply</h4>
                        </Col>
                        {replyState.alert ? (
                          <Alert theme={replyState.alertColor}>
                            {replyState.alertMessage}
                          </Alert>
                        ) : null}
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
                            size="lg"
                            placeholder="Type your comment..."
                            style={{ width: "100%" }}
                            onChange={onChange}
                          />
                        </Col>
                        <Col className="mt-2">
                          <Button
                            size="md"
                            theme="warning"
                            variant="contained"
                            disabled={replyState.isSubmit}
                            // outline
                            onClick={addComment}
                          >
                            {replyState.isSubmit && <span>submitting...</span>}
                            {!replyState.isSubmit && <span>Submit!</span>}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg="4" className="py-4 my-4 side-content">
            <div className="post-share">
              <PageTitle
                sm="12"
                title="Share Post"
                // subtitle={post.category}
                className="text-sm-left"
              />
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                // target="_blank"
                // rel="noopener noreferrer"
                data-show-count="true"
              >
                <img
                  alt="whatsapp"
                  src={require("../../assets/logo/twitter.svg")}
                />
              </a>
              <a
                href={`https://wa.me/?text=https://marblesofhameedah.rocks/post/${post._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="whatsapp"
                  src={require("../../assets/logo/whatsapp.svg")}
                />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://marblesofhameedah.rocks/post/${post._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="facebook"
                  src={require("../../assets/logo/facebook.svg")}
                />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://marblesofhameedah.rocks/post/${post._id}&title=${post.title}&summary=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="linkedin"
                  src={require("../../assets/logo/linkedin.svg")}
                />
              </a>
            </div>
            <div className="mt-5 mt-md-5 mt-lg-5 related-posts">
              <PageTitle
                sm="12"
                title="Related Posts"
                className="text-sm-left"
              />
              <Row className="mx-0">
                {post.relatedPosts.map((val) => (
                  <Link
                    key={val._id}
                    href={`/post/${val._id}`}
                    as={`/post/${val._id}`}
                  >
                    <a className="text-decoration-none text-fiord-blue">
                      <Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        className="mx-1 my-1 my-md-2 my-lg-2 single-post"
                      >
                        <Card>
                          <Row>
                            <Col
                              xs="3"
                              sm="3"
                              md="3"
                              lg="3"
                              className="px-0 mx-0"
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
                            <Col xs="9" sm="9" md="9" lg="9" className="py-2">
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
      {/* <div>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div> */}
    </div>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await http.get(`/api/post`)
  const posts = await res.data.posts

  // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => `/post/${post._id}`)
  const paths = posts.map((post) => ({
    params: { id: post._id },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await http.get(`/api/post/${params.id}`)
  // console.log(res.data)
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
