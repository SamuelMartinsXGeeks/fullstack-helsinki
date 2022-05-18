import axios from 'axios';

const localURL = 'http://localhost:3001/api/login';

const login = async credentials => {
  const response = await axios.post(localURL, credentials);
  return response.data;
};

export default { login };