import axios from 'axios';
import { errorHandler } from 'helpers';

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const login = (email, password) => {
  const requestOptions = {
    url: `${process.env.REACT_APP_API_URL}/auth`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password }),
  };

  return axios(requestOptions)
    .then((response) => {
      const { user } = response.data;
      user.token = response.data.token;
      // store user details and jwt token in local storage to
      // keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    })
    .catch((error) => errorHandler(error));
};

export const userService = {
  login,
  logout,
  errorHandler,
};
