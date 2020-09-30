import React from "react"
import PropTypes from "prop-types"
import { Navbar, NavbarBrand } from "shards-react"
import { blogTitle } from "../../../user.json"

import { Dispatcher, Constants } from "../../../flux"

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    })
  }

  render() {
    const { hideLogoText } = this.props
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">{blogTitle}</span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <span
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </span>
        </Navbar>
      </div>
    )
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
}

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
}

export default SidebarMainNavbar
