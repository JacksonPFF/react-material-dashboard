import { registeredGitasConstants } from '../_constants';
import moment from 'moment';

export function registeredGitas(state = {}, action) {
  switch (action.type) {
    case registeredGitasConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case registeredGitasConstants.GETALL_SUCCESS:
      action.gitas.map((item) => {
        item.created = moment(item.created).format('DD/MM/YYYY');
        return item;
      })
      return {
        items: action.gitas,
      };
    case registeredGitasConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case registeredGitasConstants.GETALL_FILTERED_ITEMS:
      return {
        ...state,
        items: [...state.items],
        filteredItems: action.results.gitas,
      };
    default:
      return state;
  }
}
