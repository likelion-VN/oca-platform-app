import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/loading/loading";
import ApplicationForm from "./pages/applicationForm/applicationForm";
import ApplicationFormRevise from "./pages/applicationForm/applicationFormRevise";
import CreateUser from "./pages/createUser/createUser";
import Dashboard from "./pages/dashboard/dashboard";
import AuthCallback from "./pages/signIn/authCallback";
import GoogleAuthRedirect from "./pages/signIn/googleAuthRedirect";
import SignIn from "./pages/signIn/signIn";
import auth from "./utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    auth.isLogin() || auth.isLoginLocal()
  );

  useEffect(() => {
    setIsLoggedIn(auth.isLogin() || auth.isLoginLocal());

    const handleStorageChange = () => {
      setIsLoggedIn(auth.isLogin() || auth.isLoginLocal());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <LoadingPage />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="sign-in" element={<SignIn />} />
            <Route
              path="/"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
            />
            <Route
              path="*"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
            />
            <Route path="auth-callback" element={<AuthCallback />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="application-form" element={<ApplicationForm />} />
            <Route
              path="application-form-revise"
              element={<ApplicationFormRevise />}
            />
            <Route path="/login/auth2/code/google" element={<GoogleAuthRedirect />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
