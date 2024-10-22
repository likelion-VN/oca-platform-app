import { useEffect } from "react";
import loadingPage from "../../../store/actions/loading";
import auth from "../../../utils/auth";
import useActions from "../../../utils/customHook/useActions";
import ApplicationCandidatePage from "./candidate/applicationCandidate";
import ApplicationCompanyPage from "./company/applicationCompany";

const ApplicationPage = () => {
  const loadingPageAction = useActions(loadingPage);

  const isCompanyUser = auth.isCompanyUser();
  useEffect(() => {
    loadingPageAction();
  }, []);

  return (
    <div className="content-detail">
      {isCompanyUser ? (
        <ApplicationCompanyPage />
      ) : (
        <ApplicationCandidatePage />
      )}
    </div>
  );
};

export default ApplicationPage;
