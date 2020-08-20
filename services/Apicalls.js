import Axios from "axios"
// import { history } from "../history"

export default new (class http {
  API_URL = "https://marblesofhameedah.herokuapp.com"

  post = async (urlpath, data, config) => {
    const url = this.API_URL + urlpath
    try {
      const response = await Axios.post(url, data, config)
      return response
    } catch (err) {
      return err
    }
  }

  put = async (urlpath, data, config) => {
    const url = this.API_URL + urlpath
    try {
      const response = await Axios.put(url, data, config)
      return response
    } catch (err) {
      return err
    }
  }

  get = async (urlpath) => {
    const url = this.API_URL + urlpath
    try {
      const response = await Axios.get(url)
      return response
    } catch (err) {
      return err
    }
  }

  delete = async (urlpath, data) => {
    const url = this.API_URL + urlpath
    try {
      const response = await Axios.delete(url, data)
      return response
    } catch (err) {
      return err
    }
  }
})()
