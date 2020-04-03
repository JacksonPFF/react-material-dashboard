import { combineEpics } from 'redux-observable';
import { skipCodeEpic } from './skipCode.epic';
import { otaInfoEpic } from './otaInfo.epic';

const rootEpic = combineEpics(
  skipCodeEpic,
  otaInfoEpic,
);

export default rootEpic;
