import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoadingPage from "./components/loading/loading";
import { APP_FLOW_ACTIONS } from "./constants/appFlowAction";
import ApplicationForm from "./pages/applicationForm/applicationForm";
import ApplicationFormReview from "./pages/applicationForm/applicationFormReview";
import ApplicationFormRevise from "./pages/applicationForm/applicationFormRevise";
import CreateUser from "./pages/createUser/createUser";
import ApplicationPage from "./pages/dashboard/application/applicationPage";
import HomePage from "./pages/dashboard/home/home";
// import Profile from "./pages/dashboard/profile/profile";
import AuthCallback from "./pages/signIn/authCallback";
import SignIn from "./pages/signIn/signIn";
import SidebarTemplate from "./template/sidebarTemplate/SidebarTemplate";
import { setNavigate } from "./utils/helper";
// import StudentViewCompany from "./pages/dashboard/profile/studentViewCompany/studentViewCompany";
import StudentProfile from "./pages/dashboard/profile/studentProfile/studentProfile";
// import StudentViewCompany from "./pages/dashboard/profile/studentViewCompany/studentViewCompany";
const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    dispatch({ type: APP_FLOW_ACTIONS.SET_COUNTRIES_OPTIONS });
  }, [dispatch]);

  return (
    <>
      <LoadingPage />
      <div className="App">
        <Routes>
          <Route path="/*" element={<Navigate to="/sign-in" />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/" element={<SidebarTemplate />}>
            <Route path="dash-board" element={<HomePage />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            {/* <Route path="profile" element={<StudentViewCompany />} /> */}
            <Route path="profile" element={<StudentProfile />} />
            <Route path="application" element={<ApplicationPage />} />
          </Route>

          <Route path="create-user" element={<CreateUser />} />
          <Route path="application-form" element={<ApplicationForm />} />
          <Route
            path="application-form-revise"
            element={<ApplicationFormRevise />}
          />
          <Route
            path="application-form-review"
            element={<ApplicationFormReview />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
