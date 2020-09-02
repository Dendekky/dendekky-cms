import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from "shards-react"
import LoadingAnimation from "../common/Loading"
import getWriterInfo from "../../services/GetWriterInfo"

const UserAccountDetails = (props) => {
  const [error, setError] = React.useState(false)
  const [details, setDetails] = React.useState({ about: "" })

  const [isLoading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    setIsloading(true)
    getWriterInfo()
      .then((res) => {
        const info = res.userprofile[0]
        setDetails({
          about: info.about,
        })
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">About Me</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>{details.about}</Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
}

UserAccountDetails.defaultProps = {
  title: "About Me",
}

export default UserAccountDetails
