import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

export default function* rootSagas() {
  return yield all([auth]);
}
