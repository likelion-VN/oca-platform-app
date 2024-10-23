import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import initialState from "./initialState";

const timezonesOptions = (
  state: any = initialState.timezonesOptions,
  action: any
) => {
  switch (action.type) {
    case APP_FLOW_ACTIONS.SET_TIMEZONES_OPTIONS_COMPLETED: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default timezonesOptions;
