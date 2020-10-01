/* eslint-disable linebreak-style */
import React, { Component } from "react"
import { useRouter } from "next/router"
import { getCookie } from "../services/Cookie"

export default function ProtectRoute(ComponentToProtect) {
  const router = useRouter()
  return class Auth extends Component {
    constructor() {
      super()
      this.state = {
        loading: true,
        redirect: false,
      }
    }

    componentDidMount() {
      const AuthToken = getCookie("token")

      if (!AuthToken) {
        this.setState({ loading: false, redirect: true })
      }
    }

    render() {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      if (redirect) {
        router.push("/login")
      }
      return <ComponentToProtect {...this.props} />
    }
  }
}
