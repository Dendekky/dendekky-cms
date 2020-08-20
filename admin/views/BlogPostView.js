/* eslint-disable linebreak-style */
import React from "react"
import Axios from "axios"

import { Container, Row, Col } from "shards-react"

import PageTitle from "../components/common/PageTitle"
import ViewDeleteAction from "../components/add-new-post/ViewDeleteAction"

class BlogInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true })

    const {
      match: { params },
    } = this.props
    Axios.get(
      `https://marblesofhameedah.herokuapp.com/api/post/${params.id}`
    ).then((result) => this.setState({ post: result.data, loading: false }))
    // , isLoading: false }));
  }

  render() {
    const { post, loading } = this.state

    if (loading) {
      return <p>loading....</p>
    }
    return (
      <div className="blogpost">
        <Container fluid className="main-content-container px-4 pb-4">
          <Row noGutters className="page-header py-4">
            <Col lg="9" md="9">
              <PageTitle
                sm="12"
                title={post.title}
                subtitle={post.category}
                className="text-sm-left"
              />
              <img
                alt="post"
                style={{ width: "100%", borderRadius: "2px", marginTop: "6px" }}
                className="my-2 py-2"
                src={post.postImage}
              />
              <div
                style={{ wordWrap: "break-word" }}
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
              {/* <p>{post.body}</p> */}
              <p>Published on: {new Date(post.updatedAt).toDateString()}</p>
              <h3>{post.comments ? post.comments.length : 0} Comments</h3>
            </Col>
            <Col lg="3" md="3">
              <ViewDeleteAction id={post._id} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default BlogInfo
