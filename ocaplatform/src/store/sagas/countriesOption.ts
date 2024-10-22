import { call, put, takeLatest } from "redux-saga/effects";
import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import { CountryOption } from "../../interfaces";
import { fetchCountries } from "../../services/fetchCountries";

const fetchData = async () => {
  try {
    const result = await fetchCountries();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

function* fetchCountriesOption() {
  const countriesOptions: CountryOption[] = yield call(fetchData);
  if (countriesOptions) {
    yield put({
      type: APP_FLOW_ACTIONS.SET_COUNTRIES_OPTIONS_COMPLETED,
      data: countriesOptions,
    });
  }
  return null;
}

export default function* countriesOptionsFlow() {
  yield takeLatest(
    APP_FLOW_ACTIONS.SET_COUNTRIES_OPTIONS,
    fetchCountriesOption
  );
}
