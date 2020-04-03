import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { registeredGitas } from './registeredGitas.reducer';
import { alert } from './alert.reducer';
import { skipCode } from './skipCode.reducer';
import { otaInfo } from './otaInfo.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  registeredGitas,
  alert,
  skipCode,
  otaInfo,
});

export default rootReducer;
