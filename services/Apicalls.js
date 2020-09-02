import Axios from "axios"
// import { history } from "../history"

export default new (class http {
  API_URL = "https://marblesofhameedah.herokuapp.com"

  AxiosSetup = () => {
    const axiosInstance = Axios.create({
      baseURL: this.API_URL,
    })

    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // if (
        //   error.config.url !== "/api/auth/login" &&
        //   error.response &&
        //   error.response.status === 401
        // ) {
        //   dispatch({
        //     type: "ERROR_401_TRUE",
        //     error: true,
        //   })
        //   return error
        // }
        if (error.response && error.response.status === 422) {
          return error.response
        }
        if (error.response && error.response.status === 500) {
          return error.response
        }
        return Promise.reject(error)
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
