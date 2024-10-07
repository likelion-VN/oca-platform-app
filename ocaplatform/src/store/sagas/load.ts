import { fork, takeLatest } from "redux-saga/effects";
import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";

function* handleLoadPageRequest() {

}

function* loadPageRequest() {
    yield takeLatest(APP_FLOW_ACTIONS.LOADING_COMPLETED, handleLoadPageRequest)
}

export default function* loadFlow() {
    yield fork(loadPageRequest);
}