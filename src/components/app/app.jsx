import AppHeader from "../app-header/app-header";
import { Route, Routes } from "react-router-dom";
import { FORGOT_PATH, ForgotPasswordPage, HOME_PATH, HomePage, LOGIN_PATH, LoginPage, REGISTER_PATH, RESET_PATH, RegisterPage, ResetPasswordPage } from "../../pages";
import appStyles from './app.module.css';
import { ProtectedUserRoute } from "../protected-user-route/protected-user-route";

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <Routes>
        <Route path={HOME_PATH} element={<HomePage />} />

        {/*  Protected user pages  */}
        <Route path={LOGIN_PATH} element={<ProtectedUserRoute><LoginPage /></ProtectedUserRoute>} />
        <Route path={REGISTER_PATH} element={<ProtectedUserRoute><RegisterPage /></ProtectedUserRoute>} />
        <Route path={FORGOT_PATH} element={<ProtectedUserRoute><ForgotPasswordPage /></ProtectedUserRoute>} />
        <Route path={RESET_PATH} element={<ProtectedUserRoute><ResetPasswordPage /></ProtectedUserRoute>} />
        
      </Routes>
    </div>
  );
}

export default App;
