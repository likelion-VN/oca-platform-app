import { useEffect } from "react";
import loadingPage from "../../../store/actions/loading";
import auth from "../../../utils/auth";
import useActions from "../../../utils/customHook/useActions";
import ApplicationCandidatePage from "./candidate/applicationCandidate";
import ApplicationCompanyPage from "./company/applicationCompany";

const ApplicationPage = () => {
  const loadingPageAction = useActions(loadingPage);

  const isCompanyUser = auth.isCompanyUser();
  console.log(isCompanyUser);
  useEffect(() => {
    loadingPageAction();
  }, []);

  return (
    <div className="content-detail">
      {isCompanyUser ? (
        <ApplicationCandidatePage />
      ) : (
        <ApplicationCompanyPage />
      )}
    </div>
  );
};

export default ApplicationPage;
