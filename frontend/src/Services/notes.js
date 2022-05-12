/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const localURL = "http://localhost:3001/api/notes";
const herokuURL = "https://fullstack-helsinki-learning.herokuapp.com/api/notes";

const baseUrl = localURL;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  console.log(newObject);
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

export default { getAll, create, update, remove }