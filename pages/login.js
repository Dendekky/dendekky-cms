import React from "react"
import PropTypes from "prop-types"
import { useRouter, Router } from 'next/router'
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from "shards-react"
import Alert from "../components/common/Alert"
import { getCookie, setCookie, setAuthToken } from '../services/cookie';
import http from '../services/Apicalls'

const Login = () => {
  const router = useRouter()
  const loginToken = getCookie("token")
  const [user, setUser] = React.useState({ username: "", password: "" })
  const [error, setError] = React.useState(false)
  // const [redirect, setRedirect] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false)

  const onChange = (e) => {
    e.persist()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)
    http.post("/api/login", user)
      .then((res) => {
        // Set token to cookie
        const { token } = res.data
        setCookie("token", token)
        setAuthToken()

        if (res.status === 200) {
          setIsSubmit(false)
          router.push("/admin/blog-posts")
        }
      })
      .catch(() => {
        setError(true)
        setIsSubmit(false)
        setTimeout(() => {
          setError(false)
        }, 5000)
      })
  }

  if (loginToken) {
    return router.push("/admin-blog-posts")
  }

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Login Credentials</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form className="form" onSubmit={onSubmit}>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feUserName"> Username</label>
                    <FormInput
                      id="feUserName"
                      name="username"
                      value={user.username}
                      placeholder="username"
                      onChange={onChange}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassWord">Password</label>
                    <FormInput
                      id="fePassWord"
                      name="password"
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
              {error && (
                <Alert
                  theme="warning"
                  message="Please enter the <strong>correct</strong> login credentials "
                />
              )}
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
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
