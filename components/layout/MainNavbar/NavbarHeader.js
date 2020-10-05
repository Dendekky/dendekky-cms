import React from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import {
  blogTitle,
  blogSubtitle,
  // userAvatar,
  // welcomeMessage,
} from "../../../user.json"

const ReadingProgressBar = dynamic(
  () => {
    return import("../../ReadingProgress")
  },
  { ssr: false }
)

const Header = ({ readingBarRef }) => {
  const router = useRouter()
  // changed from using link to this custom funtion to prevent
  // rerendering causing Y position to revert to 0
  const handleNavChange = (href) => (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <>
      <div className="header-image">
        <h2 className="">{blogTitle}</h2>
        <p className="m-0">{blogSubtitle}</p>
      </div>
      <div className="sticky-top bg-white p-0">
        <ul className="navbar">
          <li className={router.pathname === "/" ? "active" : ""}>
            <div
              role="button"
              tabIndex="0"
              onKeyDown={handleNavChange("/")}
              onClick={handleNavChange("/")}
            >
              Home
            </div>
          </li>
          <li className={router.pathname === "/about" ? "active" : ""}>
            <div
              role="button"
              tabIndex="0"
              onKeyDown={handleNavChange("/about")}
              onClick={handleNavChange("/about")}
            >
              About
            </div>
          </li>
          <li className={router.pathname === "/contact" ? "active" : ""}>
            <div
              role="button"
              tabIndex="0"
              onKeyDown={handleNavChange("/contact")}
              onClick={handleNavChange("/contact")}
            >
              Contact
            </div>
          </li>
        </ul>
        <ReadingProgressBar target={readingBarRef} />
      </div>
    </>
  )
}

export default Header
