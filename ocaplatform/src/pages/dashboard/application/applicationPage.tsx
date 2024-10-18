import auth from "../../../utils/auth";
import ApplicationCompanyPage from "./company/applicationCompany";
import ApplicationCandidatePage from "./candidate/applicationCandidate";

const ApplicationPage = () => {
  const isCompanyUser = auth.isCompanyUser();

  return isCompanyUser ? (
    <ApplicationCompanyPage />
  ) : (
    <ApplicationCandidatePage />
  );
};

export default ApplicationPage;
