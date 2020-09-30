import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
// import { Redirect, Link } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  // InputGroup,
  // InputGroupAddon,
  // FormCheckbox,
  // FormInput,
} from "shards-react"
import http from "../../services/Apicalls"

// import PropTypes from "prop-types";

function DraftDeleteAction({ id, editDraft, post }) {
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const router = useRouter()

  const deletePost = async (event) => {
    event.preventDefault()
    http
      .delete(`/api/draft/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setRedirect(true)
        }
      })
      .catch((error) => {
        alert(error)
        setError(true)
      })
  }

  if (redirect) {
    router.push("/admin/blog-posts")
  }

  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Actions</h6>
      </CardHeader>
      <CardBody className="p-0">
        <ListGroup flush>
          <ListGroupItem className="d-flex px-3 pt-1 border-0">
            {editDraft ? (
              <Link tag={Link} href={`/admin/draft/update/${id}`}>
                Edit Draft
              </Link>
            ) : null}
            <Button
              outline
              theme="accent"
              size="sm"
              className="ml-auto"
              onClick={deletePost}
            >
              Delete Draft
            </Button>
          </ListGroupItem>
        </ListGroup>
        {error && <p>some error</p>}
      </CardBody>
    </Card>
  )
}

export default DraftDeleteAction
