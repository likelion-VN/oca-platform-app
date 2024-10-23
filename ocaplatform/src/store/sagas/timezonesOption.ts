import { call, put, takeLatest } from "redux-saga/effects";
import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import { TimezoneOption } from "../../interfaces";
import { fetchTimezones } from "../../services/fetchTimezones";

const fetchData = async () => {
  try {
    const result = await fetchTimezones();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

function* fetchTimezonesOption() {
  const timezonesOptions: TimezoneOption[] = yield call(fetchData);
  if (timezonesOptions) {
    yield put({
      type: APP_FLOW_ACTIONS.SET_TIMEZONES_OPTIONS_COMPLETED,
      data: timezonesOptions,
    });
  }
  return null;
}

export default function* timezonesOptionsFlow() {
  yield takeLatest(
    APP_FLOW_ACTIONS.SET_TIMEZONES_OPTIONS,
    fetchTimezonesOption
  );
}
