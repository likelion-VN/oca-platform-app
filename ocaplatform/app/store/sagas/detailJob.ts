import { put, takeLatest } from 'redux-saga/effects';
import { setDetailJob } from '../reducers/detailJob';

function* handleSetDetailJob(action: ReturnType<typeof setDetailJob>) {
  try {
    const detailJob = action.payload;
    yield put(setDetailJob(detailJob));
  } catch (error) {
    console.error('Error setting detailJob:', error);
  }
}

export default function* detailJobSaga() {
  yield takeLatest(setDetailJob.type, handleSetDetailJob);
}