import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";

const updateGotoData = (key: string, data: any) => ({
  type: APP_FLOW_ACTIONS.UPDATE_GOTO,
  payload: { key, data },
});

export default updateGotoData;
