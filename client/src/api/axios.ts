import axios from 'axios';
const instance = axios;
instance.defaults.baseURL = 'http://localhost:8080/api/v1/';

let refresh = false;

instance.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;
    const response = await axios.post('auth/refresh', {}, { withCredentials: true });
    
    if (response.status === 200) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

      return instance(error.config);
    }
  }
  refresh = false;
  return error;
});

export default instance;