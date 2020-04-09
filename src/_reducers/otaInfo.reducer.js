import { otaInfoConstants } from '../_constants';
import moment from 'moment';

export function otaInfo(state = {}, action) {
  switch (action.type) {
    case otaInfoConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case otaInfoConstants.GETALL_SUCCESS:
      action.items.map((item) => {
        item.created = moment(item.created).format('DD/MM/YYYY');
        return item;
      })
      return {
        items: action.items,
      };
    case otaInfoConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case otaInfoConstants.GETALL_FILTERED_ITEMS:
      return {
        ...state,
        items: [...state.items],
        filteredItems: action.items,
      };
    default:
      return state;
  }
}
