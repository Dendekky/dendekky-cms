import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "shards-react"

import MainNavbar from "./layout/MainNavbar/MainNavbar"
import AdminSidebar from "./layout/AdminSidebar/MainSidebar"
import AdminNavbar from "./layout/AdminNavbar/MainNavbar"
import MainFooter from "./layout/MainFooter"
import PageMetadata from "./common/Helmet"

export const MainLayout = ({ children, noNavbar, noFooter }) => {
  const target = React.createRef()

  return (
    <Container fluid>
      <PageMetadata title="Welcome" />
      <Row>
        <Col className="main-content p-0" sm="12" tag="main">
          {!noNavbar && <MainNavbar readingBarRef={target} />}
          <div ref={target}>{children}</div>
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  )
}

export const AdminLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <PageMetadata title="Admin" />
    <Row>
      <AdminSidebar />
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {/* <Col className="main-content p-0" sm="12" tag="main"> */}
        {!noNavbar && <AdminNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
)

MainLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
}

AdminLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
}

AdminLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
}

MainLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
}
