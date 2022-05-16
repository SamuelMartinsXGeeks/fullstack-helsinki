import axios from 'axios'

const PORT = process.env.PORT

const localURL = `http://localhost:3001/api/login`;

const login = async credentials => {
  console.log(localURL);
  const response = await axios.post(localURL, credentials)
  return response.data
}

export default { login }