/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react"
import Axios from "axios"
import { Redirect } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
} from "shards-react"
import http from "../../../services/Apicalls"
import ErrorAlert from "../../../components/common/Alert"

function SidebarActions({ post, postBody, postImage, info }) {
  const [draftError, setDraftError] = useState(false)
  const [postError, setPostError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const data = new FormData()
  data.append("title", post.title)
  data.append("category", post.category)
  data.append("tags", post.tags)
  data.append("body", postBody)
  data.append("postImage", postImage)

  const config = {
    headers: { "content-type": "multipart/form-data" },
  }

  const saveDraft = async (event) => {
    event.preventDefault()
    const contents = Array.from(data.entries())
    console.log(contents)
    http
      .put(`/api/draft/${post.id}`, data, config)
      .then((res) => {
        if (res.status === 201) {
          setRedirect(true)
        }
      })
      .catch((error) => {
        setDraftError(true)
        setTimeout(() => {
          setDraftError(false)
        }, 5000)
      })
  }

  const publishPost = async (event) => {
    event.preventDefault()
    http
      .post("/api/post", data, config)
      .then((res) => {
        if (res.status === 201) {
          setRedirect(true)
        }
      })
      .catch((error) => {
        setPostError(true)
        setTimeout(() => {
          setPostError(false)
        }, 5000)
      })
  }

  if (redirect) {
    return <Redirect to="/admin-blog-posts" />
  }
  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Actions</h6>
      </CardHeader>

      <CardBody className="p-0">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">flag</i>
              <strong className="mr-1">Status:</strong>
              <strong className="text-success ml-auto">{info.status}</strong>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">visibility</i>
              <strong className="mr-1">Visibility:</strong>{" "}
              <strong className="text-success ml-auto">
                {info.visibility}
              </strong>{" "}
            </span>
            {/* <a className="ml-auto" href="#">
                Edit
              </a>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">calendar_today</i>
              <strong className="mr-1">Schedule:</strong> Now{" "}
              <a className="ml-auto" href="#">
                Edit
              </a>
            </span>
            <span className="d-flex">
              <i className="material-icons mr-1">score</i>
              <strong className="mr-1">Readability:</strong>{" "}
              <strong className="text-warning">Ok</strong>
            </span> */}
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3 border-0">
            <Button outline theme="accent" size="sm" onClick={saveDraft}>
              <i className="material-icons">save</i> Update Draft
            </Button>
            <Button
              theme="accent"
              size="sm"
              className="ml-auto"
              onClick={publishPost}
            >
              <i className="material-icons">file_copy</i> Publish
            </Button>
          </ListGroupItem>
        </ListGroup>
        {draftError && (
          <ErrorAlert
            theme="warning"
            message="Unable to <strong>save</strong> draft"
          />
        )}
        {postError && (
          <ErrorAlert
            theme="warning"
            message="Unable to <strong>publish</strong> post"
          />
        )}
      </CardBody>
    </Card>
  )
}

// SidebarActions.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string
// };

// SidebarActions.defaultProps = {
//   title: "Actions"
// };

export default SidebarActions