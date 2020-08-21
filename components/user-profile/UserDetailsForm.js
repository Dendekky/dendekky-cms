import React from "react"
import Axios from "axios"
import PropTypes from "prop-types"
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormTextarea,
  Button,
} from "shards-react"
import ErrorAlert from "../../components/common/Alert"
import LoadingAnimation from "../../components/common/Loading"
import getWriterInfo from "../../services/GetWriterInfo"

const UserAccountDetails = (props) => {
  const [error, setError] = React.useState(false)
  const [details, setDetails] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    profile: "",
    about: "",
    energy: "",
    twitter: "",
    instagram: "",
  })
  const [update, setUpdate] = React.useState(false)
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [isLoading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    setIsloading(true)
    getWriterInfo()
      .then((res) => {
        const info = res.userprofile[0]
        setDetails({
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
        console.log(err)
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [])

  const onChange = (e) => {
    e.persist()
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)
    Axios.put("https://marblesofhameedah.herokuapp.com/api/user", details)
      .then((res) => {
        if (res.status === 201) {
          setUpdate(true)
          setTimeout(() => {
            setUpdate(false)
            window.location.reload()
          }, 5000)
        }
      })
      .catch((error) => {
        console.log(error)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 5000)
      })
      .finally(() => {
        setIsSubmit(false)
      })
  }

  if (isLoading) {
    return <LoadingAnimation />
  }
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Information</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form className="form" onSubmit={onSubmit}>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="First Name"
                      name="firstname"
                      value={details.firstname}
                      onChange={onChange}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                      id="feLastName"
                      placeholder="Last Name"
                      name="lastname"
                      value={details.lastname}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      name="email"
                      value={details.email}
                      onChange={onChange}
                      autoComplete="email"
                    />
                  </Col>
                  {/* Energy */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEnergyl">Energy Level</label>
                    <FormInput
                      type="number"
                      id="feEnergyl"
                      max="100"
                      placeholder="78"
                      name="energy"
                      value={details.energy}
                      onChange={onChange}
                    />
                  </Col>
                  {/* Twitter */}
                  <Col md="6" className="form-group">
                    <label htmlFor="twitter">Twitter Username</label>
                    <FormInput
                      type="text"
                      id="twitter"
                      placeholder="hiya"
                      name="twitter"
                      value={details.twitter}
                      onChange={onChange}
                    />
                  </Col>
                  {/* Twitter */}
                  <Col md="6" className="form-group">
                    <label htmlFor="instagram">Instagram Username</label>
                    <FormInput
                      type="text"
                      id="instagram"
                      placeholder="hiya"
                      name="instagram"
                      value={details.instagram}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Profile */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Profile</label>
                    <FormTextarea
                      id="feDescription"
                      name="profile"
                      value={details.profile}
                      onChange={onChange}
                      rows="5"
                    />
                  </Col>
                  {/* About */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">About</label>
                    <FormTextarea
                      id="feDescription"
                      name="about"
                      value={details.about}
                      onChange={onChange}
                      rows="5"
                    />
                  </Col>
                </Row>
                {update && (
                  <ErrorAlert
                    theme="success"
                    message="Profile successfully <strong>updated</strong>."
                  />
                )}
                {error && (
                  <ErrorAlert
                    theme="warning"
                    message="Unable to <strong>update</strong> your profile at the moment"
                  />
                )}
                <Button theme="accent" disabled={isSubmit}>
                  {isSubmit && (
                    <svg
                      className="spinner"
                      width="20px"
                      height="20px"
                      viewBox="0 0 66 66"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="path"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30"
                      />
                    </svg>
                  )}
                  {isSubmit && <span>Updating Your Profile...</span>}
                  {!isSubmit && <span>Update Profile</span>}
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default UserAccountDetails
