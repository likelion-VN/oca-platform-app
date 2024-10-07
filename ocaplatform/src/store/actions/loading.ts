import { APP_FLOW_ACTIONS } from "../../constants/appFlowAction";

const loadingPage = (loadingText = "") => ({
  type: APP_FLOW_ACTIONS.LOADING_COMPLETED,
  loadingText,
});

export default loadingPage;
