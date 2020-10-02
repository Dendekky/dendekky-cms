import React, { useState } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import {
  Card,
  CardHeader,
  // ListGroup,
  // ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
  Container,
  CardBody,
} from "shards-react"
import Alert from "../components/common/Alert"
import { getCookie, setCookie } from "../services/Cookie"
import http from "../services/Apicalls"

const Login = () => {
  const router = useRouter()
  const loginToken = getCookie("token")
  const [user, setUser] = useState({ username: "", password: "" })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  // const [redirect, setRedirect] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false)

  const onChange = (e) => {
    e.persist()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)
    http
      .post("/api/login", user)
      .then((res) => {
        if (res.status === 200) {
          // Set token to cookie
          const { token } = res.data
          setCookie("token", token)
          router.push("/admin/blog-posts")
        } else {
          setError(true)
          if (res.data && res.data.errors) {
            let errText = ""
            res.data.errors.forEach((item) => {
              errText += `${item.param} ${item.msg}. `
            })
            setErrorMessage(errText)
          }
        }
      })
      .catch(() => {
        setError(true)
        setIsSubmit(false)
      })
      .finally(() => {
        setIsSubmit(false)
        setTimeout(() => {
          setError(false)
        }, 5000)
      })
  }

  if (loginToken) {
    router.push("/admin/blog-posts")
  }

  return (
    <Container>
      <Row>
        <Col
          sm={{ size: 6, offset: 3 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 6, offset: 3 }}
        >
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Login Credentials</h6>
              {error && (
                <div className="my-2">
                  <Alert
                    theme="warning"
                    message={
                      errorMessage ||
                      "Please enter the <strong>correct</strong> login credentials "
                    }
                  />
                </div>
              )}
            </CardHeader>
            <CardBody className="p-3">
              <Row>
                <Col className="align-center">
                  <Form className="form" onSubmit={onSubmit}>
                    <Row form>
                      {/* First Name */}
                      <Col md="12" className="form-group">
                        <label htmlFor="feUserName"> Username</label>
                        <FormInput
                          id="feUserName"
                          name="username"
                          type="text"
                          value={user.username}
                          placeholder="username"
                          onChange={onChange}
                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="12" className="form-group">
                        <label htmlFor="fePassWord">Password</label>
                        <FormInput
                          id="fePassWord"
                          name="password"
                          type="password"
                          value={user.password}
                          placeholder="password"
                          onChange={onChange}
                        />
                      </Col>
                    </Row>
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
                      {isSubmit && <span>Logging in...</span>}
                      {!isSubmit && <span>Log in to admin page</span>}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

Login.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
}

Login.defaultProps = {
  title: "Login Credentials",
}

export default Login
