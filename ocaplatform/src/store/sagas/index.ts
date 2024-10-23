import { fork } from "redux-saga/effects";
import countriesOptionsFlow from "./countriesOption";
import loadFlow from "./load";
import timezonesOptionsFlow from "./timezonesOption";

export default function* rootSaga() {
  yield fork(loadFlow);
  yield fork(countriesOptionsFlow);
  yield fork(timezonesOptionsFlow);
}
