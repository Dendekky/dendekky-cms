import React, { useState } from "react"
import Axios from "axios"
import { Redirect } from "react-router-dom"

import { Card, CardHeader, CardBody, ListGroup, Button } from "shards-react"

function SidebarCategories(prop) {
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const deletePost = async (event) => {
    event.preventDefault()

    Axios.delete(`https://marblesofhameedah.herokuapp.com/api/post/${prop.id}`)
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
    return <Redirect to="/admin-blog-posts" />
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
