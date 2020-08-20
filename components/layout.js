import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "shards-react"

import MainNavbar from "./layout/MainNavbar/MainNavbar"
import MainFooter from "./layout/MainFooter"

export const Layout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col className="main-content p-0" sm="12" tag="main">
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
)

Layout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
}

Layout.defaultProps = {
  noNavbar: false,
  noFooter: false,
}
