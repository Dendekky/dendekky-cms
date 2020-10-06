/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from "react"
import Link from "next/link"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  CardFooter,
  Tooltip,
  Form,
  FormGroup,
  FormInput,
  Alert,
} from "shards-react"
import PageTitle from "../components/common/PageTitle"
import PageMetadata from "../components/common/Helmet"
import http from "../services/Apicalls"

function BlogPosts({ posts }) {
  const [reader, setReader] = useState({
    email: "",
  })
  const [subscribedState, setSubscribedState] = useState({
    isSubmit: false,
    alert: false,
    alertMessage: "",
    alertColor: "",
  })

  const postIdList = posts.map((post) => ({
    id: post._id,
    tooltipOpen: false,
  }))

  const postsArray = [...posts]
  const category = postsArray
    .map((item) => item.category)
    .filter((v, i, self) => i == self.indexOf(v))
  const tags = postsArray
    .map((item) => item.tags)
    .flat()
    .filter((v, i, self) => i == self.indexOf(v))
  const popularPosts = postsArray
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 3)

  const [postToggleOpen, setPostToggleOpen] = useState(postIdList)
  const toggleUniqueTooltip = (tooltipId) => {
    const data = [...postToggleOpen]
    data[tooltipId] = {
      ...data[tooltipId],
      tooltipOpen: !data[tooltipId].tooltipOpen,
    }
    setPostToggleOpen(data)
  }

  const onChange = (e) => {
    setReader({
      ...reader,
      [e.target.name]: e.target.value,
    })
  }
  const addSubscriber = (e) => {
    setSubscribedState({
      ...subscribedState,
      isSubmit: true,
    })
    e.preventDefault()
    http
      .post("/api/subscribers", reader)
      .then((res) => {
        if (res.status === 201) {
          setSubscribedState({
            ...subscribedState,
            alert: true,
            alertColor: "success",
            alertMessage: res.data.message,
          })
          setReader({ email: "" })
        } else {
          let errorText = ""
          if (res.data.errors)
            res.data.errors.forEach((error) => {
              errorText += error.msg
            })
          const errorMessage = res.data.message || errorText
          setSubscribedState({
            ...subscribedState,
            alert: true,
            alertColor: "warning",
            alertMessage: errorMessage,
          })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          setSubscribedState({ alert: false })
        }, 5000)
      })
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
      <PageMetadata title="Home" />
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
              <Col lg="6" md="6" sm="12" className="mb-4" key={post._id}>
                <Link href={`/post/${post.slug}`} as={`/post/${post.slug}`}>
                  <a
                    className="text-fiord-blue"
                    style={{ textDecoration: "none" }}
                  >
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
                          {trimmedPostBody(post.title, 50)}
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
                  </a>
                </Link>
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
          {category.map((item) => (
            <Link
              key={item}
              href={`/category/${item}`}
              as={`/category/${item}`}
            >
              <a className="text-fiord-blue">
                <Badge
                  className="mx-1 my-1 text-uppercase font-weight-bold lead"
                  // href="#"
                  // key={idx}
                  // outline
                >
                  {item}
                </Badge>
              </a>
            </Link>
          ))}
          <PageTitle
            sm="12"
            title="Tags"
            className="text-sm-left text-uppercase my-5"
          />
          <hr />
          {tags.map((item) => (
            <Link key={item} href={`/tags/${item}`} as={`/tags/${item}`}>
              <a className="text-fiord-blue">
                {/* {trimmedPostBody(post.title, 50)} */}
                <Badge
                  className="mx-1 my-1 text-uppercase"
                  // href="#"
                  theme="info"
                  // key={idx}
                  outline
                >
                  {item}
                </Badge>
              </a>
            </Link>
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
                  height: "100px",
                }}
                alt="post"
              />
              <h4 className="">
                <Link href={`/post/${post.slug}`} as={`/post/${post.slug}`}>
                  <a className="text-decoration-none">
                    {trimmedPostBody(post.title, 20)}
                  </a>
                </Link>
              </h4>
              <span>{new Date(post.updatedAt).toDateString()}</span>
            </div>
          ))}
          <PageTitle
            sm="12"
            subtitle="Follow Meedah's Marbles via Email"
            className="text-sm-left text-uppercase my-5 mx-0 px-0"
          />
          <hr />
          <Form>
            {subscribedState.alert ? (
              <Alert theme={subscribedState.alertColor}>
                {subscribedState.alertMessage}
              </Alert>
            ) : null}
            <FormGroup>
              <label htmlFor="#username">Email</label>
              <FormInput
                id="#username"
                name="email"
                onChange={onChange}
                value={reader.email}
                required
                placeholder="ajayi@gmail.com"
              />
            </FormGroup>
            <Button
              outline
              theme="warning"
              onClick={addSubscriber}
              disabled={subscribedState.isSubmit}
            >
              {subscribedState.isSubmit && <span>subscibing...</span>}
              {!subscribedState.isSubmit && <span>Subscribe!</span>}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps() {
  const res = await http.get("/api/post")
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
