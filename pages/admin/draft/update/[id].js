/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  // FormSelect,
  FormInput,
  // Button,
  Container,
  Row,
  Col,
} from "shards-react"
import { useDropzone } from "react-dropzone"
import "../../assets/scss/dropzone.scss"
import PageTitle from "../components/common/PageTitle"
import QuillWYSIWYG from "../components/add-new-post/QuillEditor"
import UpdateDraft from "../components/add-new-post/UpdateDraft"
import DraftDeleteAction from "../components/add-new-post/DraftDeleteAction"

const EditDraft = ({ location, match }) => {
  const [item, setItem] = useState({
    id: match.params.id,
    title: location.state.post.post.title,
    tags:  location.state.post.post.tags,
    category: location.state.post.post.category,
    metadata: location.state.post.post.metadata,
    postImage: location.state.post.post.postImage,
    errMessage: "",
  })
  const [rawHtml, setRawHtml] = useState(location.state.post.post.body)
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
      // Handles image upload to ensure the right file is submitted
      if (files) {
        setItem({ ...item, postImage: "" })
      }
    },
    [files]
  )

  const thumbs =
    files.length > 0 ? (
      files.map((file) => (
        <div className="dz-thumb" key={file.name}>
          <div className="dz-thumb-inner">
            <img src={file.preview} className="dz-img" alt={file.name} />
          </div>
        </div>
      ))
    ) : (
      <div className="dz-thumb">
        <div className="dz-thumb-inner">
          <img src={item.postImage} className="dz-img" alt="post-image" />
        </div>
      </div>
    )

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
  const actionInfo = {
    status: "Draft",
    visibility: "Admin",
  }

  return (
    <div>
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Update Draft"
            subtitle="Blog Post"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="9" md="12">
            <Card small className="mb-3">
              <CardBody>
                <Form className="add-new-post">
                  <FormGroup>
                    <label htmlFor="post-title">Post Title</label>
                    <FormInput
                      name="title"
                      value={item.title}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      id="post-title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-tags">Post Tags</label>
                    <FormInput
                      name="tags"
                      value={item.tags}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      id="post-tags"
                    />
                  </FormGroup>
                  <FormGroup>
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <div className="thumb-container">{thumbs}</div>
                        {files.length === 0 ? (
                          <p className="mx-1">
                            Drag 'n' drop image, or click to select replacement
                            image
                          </p>
                        ) : (
                          <p>Replace Image</p>
                        )}
                      </div>
                    </section>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="post-category">Category</label>
                    <FormInput
                      name="category"
                      value={item.category}
                      onChange={onChange}
                      className="mb-3"
                      placeholder="Category"
                      size="lg"
                      id="post-category"
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <FormInput
                      name="metadata"
                      value={item.metadata}
                      onChange={onChange}
                      size="lg"
                      className="mb-3"
                      placeholder="Blog Metadata"
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <label htmlFor="post-content">Post Content</label>
                    <QuillWYSIWYG
                      id="post-content"
                      setRawHtml={setRawHtml}
                      value={rawHtml}
                    />
                  </FormGroup>
                </Form>
                {/* <span>{item.errMessage}</span> */}
              </CardBody>
            </Card>
          </Col>
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <UpdateDraft
              info={actionInfo}
              post={item}
              postBody={rawHtml}
              postImage={
                item.postImage && item.postImage.length > 0
                  ? item.postImage
                  : files[0]
              }
            />
            <DraftDeleteAction id={match.params.id} editDraft={false} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditDraft
