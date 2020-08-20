/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react"
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
import { Link } from "react-router-dom"
import Axios from "axios"
import PageTitle from "../components/common/PageTitle"

class BlogPosts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // First list of posts.
      BlogDraft: [],
      BlogPost: [],
    }
  }

  componentDidMount() {
    Axios.all([
      Axios.get("https://marblesofhameedah.herokuapp.com/api/draft"),
      Axios.get("https://marblesofhameedah.herokuapp.com/api/post"),
    ])
      .then((result) =>
        this.setState({
          BlogDraft: result[0].data.drafts,
          BlogPost: result[1].data.posts,
        })
      )
      .catch((error) => console.log(error))
  }

  render() {
    const { BlogDraft, BlogPost } = this.state

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
          {BlogPost.map((post, idx) => (
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
                    <Link
                      to={`/post/${post._id}`}
                      className="text-fiord-blue"
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                    {post.metadata}
                  </p>
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
          {BlogDraft.map((post, idx) => (
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
                    <Link
                      to={{
                        pathname: `/draft/${post._id}`,
                        state: {
                          post: { post },
                        },
                      }}
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                    {post.metadata}
                  </p>
                  <p className="text-muted">Date: {post.updatedAt}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}

export default BlogPosts
