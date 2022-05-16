/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const localURL = `http://localhost:3001/api/notes`;

const herokuURL = "https://fullstack-helsinki-learning.herokuapp.com/api/notes";

const baseUrl = localURL;

let token = null
const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

export default { getAll, create, update, remove, setToken }