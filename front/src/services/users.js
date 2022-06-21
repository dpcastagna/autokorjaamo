import axios from 'axios'
const baseUrl = '/api/users'
/*
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
*/
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  /*const config = {
    headers: { Authorization: token },
  }*/
  console.log('front newUser:', newObject)
  const response = await axios.post(baseUrl, newObject)//, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const remove = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}
export default { getAll, create, update,/* setToken,*/ remove }