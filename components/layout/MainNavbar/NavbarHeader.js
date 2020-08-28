import React, { useState } from "react"
// import Link from 'next/link'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";
import classnames from "classnames"

const Header = () => {
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const toggleCollapse = () => setCollapseOpen(!collapseOpen)
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  return (
    <>
    <div className="header-image">
      <h2 className="">Meedah's Marbles</h2>
      <p className="m-0">A digital chest of my best thoughts and opinions. 
        Marbles, I call them. From Poetry, to Politics, to the everyday happenstances of life. 
        And of course, the occasional travel documentary. 
      </p>
    </div>
    <Navbar type="light" theme="" expand="xs" className="main-navbar sticky-top bg-white">
      <NavbarBrand href="/">
        <div className="d-flex">
          <img
            id="main-logo"
            style={{ borderRadius: "50%" }}
            src={require("../../../assets/images/mm-logo.jpg")}
            alt="MM"
          />
        </div>
      </NavbarBrand>
    <NavbarToggler onClick={toggleCollapse} />
    <Collapse open={collapseOpen} navbar>
      <Nav navbar className="ml-auto">
        <NavItem>
          <NavLink
            href="/"
            className={classnames({
              active: activeTab === "1",
            }, "font-weight-bolder lead")}
            onClick={() => {
              toggleTab("1")
            }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/about" 
            className={classnames({
              active: activeTab === "2",
            }, "font-weight-bolder lead")}
            onClick={() => {
              toggleTab("2")
            }}>
            About
          </NavLink>
        </NavItem>
      </Nav>

      <Nav navbar className="ml-auto">
        <img
          className="user-avatar rounded-circle mr-2"
          // src={require("../../../assets/images/UserAvatar.jpg")}
          className="d-none d-sm-inline-block"
          style={{
            height: "30px",
            borderRadius: "50%",
          }}
          src="https://res.cloudinary.com/dendekky/image/upload/c_scale,h_336,q_25,f_auto/v1595318921/0_uoa7bf.jpg"
          alt="User Avatar"
        />{" "}
        <span className="d-none d-sm-inline-block ml-1">Wlecome to Meedah's Marble</span>
      </Nav>
    </Collapse>
    <hr />
  </Navbar>
  </>
  )
}

export default Header