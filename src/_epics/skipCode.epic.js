import { timer, from } from 'rxjs';
import { ofType } from 'redux-observable';
import {
  withLatestFrom,
  switchMap,
  takeUntil,
  // distinctUntilChanged,
  map,
  catchError,
} from 'rxjs/operators';
import axios from 'axios';
import { skipCodeConstants } from '_constants';
import { authHeader } from 'helpers';


export const skipCodeEpic = (action$, state$) => {
  const stopPolling$ = action$.pipe(
    ofType(skipCodeConstants.SKIPCODE_POLL_STOP),
  );
  return action$.pipe(
    ofType(skipCodeConstants.SKIPCODE_POLL_START),
    withLatestFrom(state$, (state) => {
      const params = {
        url: `${process.env.REACT_APP_API_URL}/skip-codes`,
        method: 'GET',
        headers: authHeader(),
      };
      return params;
    }),
    switchMap((params) => {
      // TODO: update interval?
      return timer(0, 15000).pipe(
        takeUntil(stopPolling$),
        switchMap(() => from(axios(params))),
        // distinctUntilChanged(isDeepEqual),
        map((response) => ({
          type: skipCodeConstants.SKIPCODE_POLL_SUCCESS,
          skipCode: response.data.skipCode,
        })),
      );
    }),
    // TODO: test this catchError() if not here then above
    catchError((err) => Promise.resolve({
      type: skipCodeConstants.SKIPCODE_POLL_FAILURE,
      message: err.message,
    })),
  );
};
