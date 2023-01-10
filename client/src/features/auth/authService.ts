import axios from '../../api/axios';

const login = async () => {
  const response = await axios.get('auth/user', { withCredentials: true });
  return response.data;
}

const authService = {
  login
}

export default authService;