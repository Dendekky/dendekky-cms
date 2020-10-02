import React, { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardHeader, CardBody, ListGroup, Button } from "shards-react"

import http from "../../services/Apicalls"

function SidebarCategories(prop) {
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const router = useRouter()

  const deletePost = async (event) => {
    event.preventDefault()

    http
      .delete(`/api/post/${prop.id}`)
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
          <Button outline theme="accent" size="sm" onClick={deletePost}>
            <i className="material-icons">Delete</i> Delete Post
          </Button>
        </ListGroup>
        {error && <p>some error</p>}
      </CardBody>
    </Card>
  )
}

export default SidebarCategories
