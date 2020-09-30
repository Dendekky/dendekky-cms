/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import Link from "next/link"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react"
import { userAvatar } from "../../../../user.json"
import { Power, User } from "react-feather"

export default class UserActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }

    this.toggleUserActions = this.toggleUserActions.bind(this)
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={userAvatar}
            // "https://res.cloudinary.com/dendekky/image/upload/c_scale,h_336,q_25,f_auto/v1595318921/0_uoa7bf.jpg"
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Beenah</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem>
            <Link href="user-profile" as="user-profile">
              <a>
                <User size={16} className="mr-3" />
                Profile
              </a>
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => {
              if (typeof window !== "undefined") localStorage.clear()
            }}
            className="text-danger"
          >
            <Link href="/" as="/">
              <a>
                <Power size={16} className="mr-3" />
                Logout
              </a>
            </Link>
          </DropdownItem>
        </Collapse>
      </NavItem>
    )
  }
}
