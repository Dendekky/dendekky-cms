import Axios from "axios"

const getWriterInfo = async () => {
  const res = await Axios.get(
    "https://marblesofhameedah.herokuapp.com/api/user"
  )
  return res.data
}

export default getWriterInfo
