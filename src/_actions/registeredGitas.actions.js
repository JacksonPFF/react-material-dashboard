import { registeredGitasConstants } from '../_constants';
import { registeredGitasService } from '../_services';

function getAll() {
  function request() { return { type: registeredGitasConstants.GETALL_REQUEST }; }
  function success(gitas) { return { type: registeredGitasConstants.GETALL_SUCCESS, gitas }; }
  function failure(error) { return { type: registeredGitasConstants.GETALL_FAILURE, error }; }
  function filter(results) {
    return { type: registeredGitasConstants.GETALL_FILTERED_ITEMS, results };
  }

  return (dispatch) => {
    dispatch(request());

    registeredGitasService.getAllRegistered()
      .then((gitas) => dispatch(success(gitas)))
      .then((gitas) => dispatch(filter(gitas)))
      .catch((error) => dispatch(failure(error)));
  };
}

function filterItems(results) {
  // eslint-disable-next-line no-shadow
  function filter(results) {
    return { type: registeredGitasConstants.GETALL_FILTERED_ITEMS, results };
  }

  return (dispatch) => {
    dispatch(filter(results));
  };
}

export const registeredGitasActions = {
  getAll,
  filterItems,
};
