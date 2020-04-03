import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

// consider renaming this module to "auth.actions"
function login(email, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/dashboard');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function logout() {
  history.push('/login'); // () => history.push('/')
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout,
};
