import { fork } from "redux-saga/effects";
import loadFlow from "./load";

export default function* rootSaga() {
  yield fork(loadFlow);
}
