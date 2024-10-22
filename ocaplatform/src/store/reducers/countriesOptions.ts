import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import initialState from "./initialState";

const countriesOptions = (
  state: any = initialState.countriesOptions,
  action: any
) => {
  switch (action.type) {
    case APP_FLOW_ACTIONS.SET_COUNTRIES_OPTIONS_COMPLETED: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default countriesOptions;
