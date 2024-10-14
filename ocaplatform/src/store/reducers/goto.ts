import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";
import initialState from "./initialState";

interface GotoSection {
  [key: string]: any;
}

interface GotoState {
  [key: string]: GotoSection;
}

interface GotoAction {
  type: string;
  payload?: {
    key?: string;
    data?: any;
  };
}

const goto = (
  state: GotoState = initialState.goto,
  action: GotoAction
): GotoState => {
  switch (action.type) {
    case APP_FLOW_ACTIONS.UPDATE_GOTO: {
      const { key, data } = action.payload || {};
      if (!key) {
        return state;
      }
      return {
        ...state,
        [key]: {
          ...state[key],
          ...data,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default goto;
