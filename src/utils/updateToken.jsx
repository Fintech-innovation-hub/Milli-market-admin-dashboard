import axios from 'axios';
import { baseUrl } from '../constants';

function updateToken() {
  const refreshToken=JSON.parse(localStorage.getItem("refresh-token"))
  const refreshLogin = {
    refresh: refreshToken,
    
  };
  axios.post(`${baseUrl}/v1/user/token/refresh/`, refreshLogin).then((res) => {
    localStorage.setItem('access-token', JSON.stringify(res.data.access));
  });
}
export default updateToken;
