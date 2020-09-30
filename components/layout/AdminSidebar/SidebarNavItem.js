import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { NavLink as RouteNavLink } from "react-router-dom"
// import { NavItem, NavLink } from "shards-react"

const SidebarNavItem = ({ item }) => {
  const router = useRouter()
  // changed from using link to this custom funtion to prevent
  // rerendering causing Y position to revert to 0
  const handleNavChange = (href) => (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <ul className="sidebar-items">
      <div
        role="button"
        tabIndex="0"
        onKeyDown={handleNavChange(item.to)}
        onClick={handleNavChange(item.to)}
        tag={RouteNavLink}
        to={item.to}
        className={router.pathname === item.to ? "active" : ""}
      >
        {item.htmlBefore && (
          <span
            className="mr-3"
            // style={{ color: "#f2f2" }}
          >
            {item.htmlBefore}
          </span>
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <span className="d-inline-block item-icon-wrapper">
            {item.htmlAfter}
          </span>
        )}
      </div>
    </ul>
  )
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object,
}

export default SidebarNavItem
