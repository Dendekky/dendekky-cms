import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  FormTextarea,
  FormInput,
  // Button,
  Container,
  Row,
  Col,
} from "shards-react"
import { useDropzone } from "react-dropzone"

import http from "../../../../services/Apicalls"
import PageTitle from "../../../../components/common/PageTitle"
import UpdateDraft from "../../../../components/add-new-post/UpdateDraft"
import DraftDeleteAction from "../../../../components/add-new-post/DraftDeleteAction"

const QuillWYSIWYG = dynamic(
  () => {
    return import("../../../../components/add-new-post/QuillEditor")
  },
  { ssr: false }
)

const EditDraft = ({ location, match }) => {
  const [item, setItem] = useState({})
  const [rawHtml, setRawHtml] = useState()
  const [postImage, setPostImage] = useState()
  const [loading, setLoading] = useState(true)

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

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const postData = await http.get(`/api/draft/${id}`)
        setItem(postData.data.draft)
        setRawHtml(postData.data.draft.body)
        setPostImage(postData.data.draft.postImage)
        setLoading(false)
      }
      fetchData()
    }
  }, [id])

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
      // Handles image upload to ensure the right file is submitted
      if (files) {
        setPostImage("")
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

  if (loading) {
    return <p>loading....</p>
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
                postImage && postImage.length > 0 ? postImage : files[0]
              }
            />
            <DraftDeleteAction id={id} editDraft={false} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditDraft
