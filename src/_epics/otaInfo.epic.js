import { Observable, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import axios from 'axios';
import { otaInfoConstants } from '_constants';
import { authHeader } from 'helpers';

// import 'rxjs';

export const otaInfoEpic = (action$) => {
  return action$.pipe(
    ofType(otaInfoConstants.GETALL_REQUEST),
    mergeMap(() => {
      const params = {
        url: `${process.env.REACT_APP_API_URL}/ota-infos`,
        method: 'GET',
        headers: authHeader(),
      };
      return from(axios(params)).pipe(
        mergeMap((response) => [
          { type: otaInfoConstants.GETALL_SUCCESS, items: response.data },
          { type: otaInfoConstants.GETALL_FILTERED_ITEMS, items: response.data },
        ]),
        // map((response) => ({ type: otaInfoConstants.GETALL_SUCCESS, items: response.data })),
        // map((response) => ({ type: otaInfoConstants.GETALL_FILTERED_ITEMS, items: response.data })),
        catchError((error) => Observable.ofType(otaInfoConstants.GETALL_FAILURE, error)),
      );
    }),
  );
};
