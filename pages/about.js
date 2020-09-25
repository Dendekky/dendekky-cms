import React from "react"
import { Container, Row, Col } from "shards-react"

import { userAvatar } from "../user.json"
import PageMetadata from "../components/common/Helmet"
import PageTitle from "../components/common/PageTitle"
import UserAbout from "../components/user-profile/UserAbout"

const UserProfile = () => (
  <Container fluid className="main-content-container px-4">
    <PageMetadata title="About" image={userAvatar} />
    <Row noGutters className="page-header py-4">
      <PageTitle
        title="Writer Profile"
        subtitle="Overview"
        md="12"
        className="ml-sm-auto mr-sm-auto"
      />
    </Row>
    <Row>
      <Col>
        <UserAbout />
      </Col>
    </Row>
  </Container>
)

export default UserProfile
