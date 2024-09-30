import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationForm from "./pages/applicationForm/applicationForm";
import CreateUser from "./pages/createUser/createUser";
import Dashboard from "./pages/dashboard/dashboard";
import SignIn from "./pages/signIn/signIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Dashboard/>}/>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="application-form" element={<ApplicationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
