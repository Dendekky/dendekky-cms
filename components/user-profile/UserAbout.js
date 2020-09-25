import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Progress,
  // Form,
  // FormGroup,
  // FormInput,
  // FormSelect,
  // FormTextarea,
  // Button,
} from "shards-react"
import LoadingAnimation from "../common/Loading"
import http from "../../services/Apicalls"

const UserAccountDetails = (props) => {
  const [error, setError] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState({ about: "" })

  const [isLoading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    setIsloading(true)
    http
      .get("/api/user")
      .then((res) => {
        const info = res.data.userprofile[0]
        setUserDetails({
          firstname: info.firstname,
          lastname: info.lastname,
          email: info.email,
          profile: info.profile,
          about: info.about,
          energy: info.energy,
          twitter: info.twitter,
          instagram: info.instagram,
        })
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }
  if (error) {
    return <div>Some error occured</div>
  }

  return (
    <>
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src="https://res.cloudinary.com/dendekky/image/upload/c_scale,h_845,q_25/v1595318921/0_uoa7bf.jpg"
              // {require("../../../assets/images/UserAvatar.jpg")}
              alt={userDetails.firstname}
              width="110"
            />
          </div>
          <h4 className="mb-0">
            {userDetails.firstname} {userDetails.lastname}
          </h4>
          <span className="text-muted d-block mb-2">{userDetails.email}</span>
          <span className="d-flex mb-2">
            {/* <i className="material-icons mr-1">bird</i> */}
            <strong className="mr-1">Twitter:</strong>
            <strong className="ml-auto">
              <a
                className="d-block mb-2"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/${userDetails.twitter}`}
              >
                {userDetails.twitter}
              </a>
            </strong>
          </span>
          <span className="d-flex mb-2">
            {/* <i className="material-icons mr-1">twitter</i> */}
            <strong className="mr-1">Instagram:</strong>
            <strong className="ml-auto">
              <a
                className="d-block mb-2"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://instagram.com/${userDetails.instagram}`}
              >
                {userDetails.instagram}
              </a>
            </strong>
          </span>
          {/* <a className="text-muted d-block mb-2" href={`https://instagram.com/${userDetails.twitter}`}>{userDetails.twitter}</a>
        <a className="text-muted d-block mb-2" href={`https://instagram.com/${userDetails.instagram}`}>{userDetails.instagram}</a> */}
          {/* <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button> */}
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {/* {userDetails.performanceReportTitle} */}
                Energy
              </strong>
              <Progress
                className="progress-sm"
                value={userDetails.energy}
                // {userDetails.performanceReportValue}
              >
                <span className="progress-value">
                  {userDetails.energy}
                  {/* {userDetails.performanceReportValue}% */}
                </span>
              </Progress>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              {/* {userDetails.metaTitle} */}
              Profile
            </strong>
            <span>{userDetails.profile}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">About Me</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>{userDetails.about}</Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
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
