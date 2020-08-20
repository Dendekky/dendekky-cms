import React, { useState } from "react"
import Axios from "axios"
import { Redirect, Link } from "react-router-dom"

// import PropTypes from "prop-types";
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

function DraftDeleteAction({ id, editDraft, post }) {
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const deletePost = async (event) => {
    event.preventDefault()
    Axios.delete(`https://marblesofhameedah.herokuapp.com/api/draft/${id}`)
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
    return <Redirect to="/blog-posts" />
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
              <Button
                outline
                theme="accent"
                size="sm"
                tag={Link}
                to={{
                  pathname: `/admin-draft/update/${id}`,
                  state: {
                    post: { post },
                  },
                }}
              >
                <i className="material-icons">edit</i> Edit Draft
              </Button>
            ) : null}
            <Button
              outline
              theme="accent"
              size="sm"
              className="ml-auto"
              onClick={deletePost}
            >
              <i className="material-icons">Delete</i> Delete Draft
            </Button>
          </ListGroupItem>
        </ListGroup>
        {error && <p>some error</p>}
      </CardBody>
    </Card>
  )
}

export default DraftDeleteAction
