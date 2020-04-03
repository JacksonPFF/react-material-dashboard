import { otaInfoConstants } from '../_constants';

export function otaInfo(state = {}, action) {
  switch (action.type) {
    case otaInfoConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case otaInfoConstants.GETALL_SUCCESS:
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
