import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/auth/routes/Register";
import OtpHandler from "./pages/auth/routes/OtpHandler";
import { LoginForm } from "./pages/auth/routes/Login";
import AuthProtector from "./pages/auth/_components/AuthProtector";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthProtector />}>
        <Route path="register" element={<Register />} />
        <Route path="otpChecker" element={<OtpHandler />} />
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
}

export default App;
