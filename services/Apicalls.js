import Axios from "axios"
import { getCookie } from "./Cookie"

export default new (class http {
  API_URL = "https://app.yahnnova.com"
  // API_URL = "http://localhost:5000"

  AUTHTOKEN = getCookie("token")

  AxiosSetup = () => {
    const axiosInstance = Axios.create({
      baseURL: this.API_URL,
    })
    axiosInstance.defaults.headers.common.Authorization = this.AUTHTOKEN
    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return error.response
      }
    )
    return axiosInstance
  }

  post = async (urlpath, data, config) => {
    const url = this.API_URL + urlpath
    try {
      const response = await this.AxiosSetup().post(url, data, config)
      return response
    } catch (err) {
      return err
    }
  }

  put = async (urlpath, data, config) => {
    const url = this.API_URL + urlpath
    try {
      const response = await this.AxiosSetup().put(url, data, config)
      return response
    } catch (err) {
      return err
    }
  }

  get = async (urlpath) => {
    const url = this.API_URL + urlpath
    try {
      const response = await this.AxiosSetup().get(url)
      return response
    } catch (err) {
      return err
    }
  }

  delete = async (urlpath, data) => {
    const url = this.API_URL + urlpath
    try {
      const response = await this.AxiosSetup().delete(url, data)
      return response
    } catch (err) {
      return err
    }
  }
})()
