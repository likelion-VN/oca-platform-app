import { all } from 'redux-saga/effects';
import detailJobSaga from './detailJob';

export default function* rootSaga() {
  yield all([
    detailJobSaga(),
    // Add more sagas here
  ]);
}
