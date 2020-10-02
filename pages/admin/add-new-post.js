import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
} from "shards-react"
import DropZone from "../../components/add-new-post/DropZone"
import PageTitle from "../../components/common/PageTitle"
import SaveNewDraft from "../../components/add-new-post/SaveNewDraft"
import PageMetadata from "../../components/common/Helmet"

const QuillWYSIWYG = dynamic(
  () => {
    return import("../../components/add-new-post/QuillEditor")
  },
  { ssr: false }
)

// const CKWYSIWYG = dynamic(
//   () => {
//     return import("../../components/add-new-post/QuillEditor").then(editor => editor.CKWYSIWYG)
//   },
//   { ssr: false }
// )

const AddNewPost = () => {
  const [rawHtml, setRawHtml] = useState("")
  const [item, setItem] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
  })
  const [files, setFiles] = useState([])

  const onChange = (e) => {
    e.persist()
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const actionInfo = {
    status: "Draft",
    visibility: "Admin",
  }

  return (
    <div>
      <PageMetadata title="Add new post" />
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Post"
            subtitle="Blog Posts"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="9" md="12">
            <Card small className="mb-3">
              <CardBody>
                <Form
                  encType="multipart/form-data"
                  method="post"
                  className="add-new-post"
                >
                  <FormGroup>
                    <label htmlFor="post-title">Post Title</label>
                    <FormInput
                      name="title"
                      value={item.title}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      id="post-title"
                      placeholder="Your Post Title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-excerpt">Post Excerpt</label>
                    <FormTextarea
                      name="excerpt"
                      value={item.excerpt}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      id="post-excerpt"
                      placeholder="Your Post Excerpt"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-tags">Tags</label>
                    <FormInput
                      name="tags"
                      value={item.tags}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      id="post-tags"
                      placeholder="tags"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-image">Post Image</label>
                    <DropZone files={files} setFiles={setFiles} />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-category">Post Category</label>
                    <FormInput
                      name="category"
                      value={item.category}
                      onChange={onChange}
                      className="mb-3"
                      placeholder="Category"
                      id="post-category"
                      size="lg"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-content">Post Content</label>
                    <QuillWYSIWYG
                      id="post-content"
                      setRawHtml={setRawHtml}
                      value={rawHtml}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <CKWYSIWYG />
                  </FormGroup> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <SaveNewDraft
              info={actionInfo}
              post={item}
              postBody={rawHtml}
              postImage={files[0]}
            />
            {/* <SidebarCategories /> */}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

// AddNewPost.View = "admin"

export default AddNewPost
