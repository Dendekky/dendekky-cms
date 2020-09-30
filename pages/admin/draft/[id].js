/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Row, Col } from "shards-react"

import http from "../../../services/Apicalls"
import PageTitle from "../../../components/common/PageTitle"
import DraftDeleteAction from "../../../components/add-new-post/DraftDeleteAction"

const DraftPreview = () => {
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const postData = await http.get(`/api/draft/${id}`)
        setPost(postData.data.draft)
        setLoading(false)
      }
      fetchData()
    }
  }, [id])

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
            <p>Created on: {new Date(post.updatedAt).toDateString()}</p>
          </Col>
          <Col lg="3" md="3">
            <DraftDeleteAction editDraft id={post._id} post={post} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DraftPreview
