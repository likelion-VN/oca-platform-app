import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import initialState from "./initialState";

const loading = (state: any = initialState.loading, action: any) => {
  switch (action.type) {
    case APP_FLOW_ACTIONS.LOADING_COMPLETED: {
      return {
        loadingText: action.loadingText,
      };
    }
    default: {
      return state;
    }
  }
};

export default loading;