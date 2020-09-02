// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

import cookie from "js-cookie"
import Axios from "axios"

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const getCookie = (key, req) => {
  return process.browser ? getCookieFromBrowser(key) : null
  // getCookieFromServer(key, req);
}

const getCookieFromBrowser = (key) => {
  return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split("=")[1]
}

export const setAuthToken = () => {
  const token = localStorage.getItem("token")
  if (token) {
    // Apply authorization token to every request if logged in
    return (Axios.defaults.headers.common.Authorization = token)
  }
  // Delete auth header
  delete Axios.defaults.headers.common.Authorization
}
