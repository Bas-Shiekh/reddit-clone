import axios from '../../api/axios';

const login = async () => {
  try {
    const response = await axios.get('auth/user', { withCredentials: true });
    console.log(`data from login middleware for redux ${response}`)
    if (response.status === 200) return response.data;
    else throw response;
  } catch (error) {
    return error;
  }
}

const authService = {
  login,
}

export default authService;