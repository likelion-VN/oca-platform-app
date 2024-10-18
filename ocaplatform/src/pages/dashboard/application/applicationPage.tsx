import React from "react";
import auth from "../../../utils/auth";
import ApplicationCompanyPage from "./company/applicationCompany";
import ApplicationCandidatePage from "./candidate/applicationCandidate";

type Props = {};

const ApplicationPage = (props: Props) => {
  const isCompanyUser = auth.isCompanyUser();

  return isCompanyUser ? (
    <ApplicationCompanyPage />
  ) : (
    <ApplicationCandidatePage />
  );
};

export default ApplicationPage;
