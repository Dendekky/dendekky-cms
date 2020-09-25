import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Nav, NavItem, NavLink } from "shards-react"
// import { Link } from "react-router-dom"

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer
    className="d-flex p-2 px-3 bg-white border-top"
    style={{
      // position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
    }}
  >
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink href={item.to} target="_blank" rel="noopener noreferrer">
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
        <span>
          <i className="fa fa-heart fa-2x beat" />
        </span>
      </Row>
    </Container>
  </footer>
)

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string,
}

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © Dendekky",
  menuItems: [
    {
      title: "Home",
      to: "/#",
    },
    {
      title: "Instagram",
      to: "https://instagram.com/thehameedah",
    },
    // {
    //   title: "Blog",
    //   to: "#",
    // },
  ],
}

export default MainFooter
