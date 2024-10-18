import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoadingPage from "./components/loading/loading";
import ApplicationForm from "./pages/applicationForm/applicationForm";
import ApplicationFormRevise from "./pages/applicationForm/applicationFormRevise";
import CreateUser from "./pages/createUser/createUser";
import Dashboard from "./pages/dashboard/dashboard";
import AuthCallback from "./pages/signIn/authCallback";
import SignIn from "./pages/signIn/signIn";
import { setNavigate } from "./utils/helper";

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <LoadingPage />
      <div className="App">
        <Routes>
          <Route path="/*" element={<Navigate to="/sign-in" />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="dash-board" element={<Dashboard />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="application-form" element={<ApplicationForm />} />
          <Route
            path="application-form-revise"
            element={<ApplicationFormRevise />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
