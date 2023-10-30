import AppHeader from "../app-header/app-header";
import { Route, Routes, useLocation } from "react-router-dom";
import appStyles from './app.module.css';
import { ProtectedUserRoute } from "../protected-user-route/protected-user-route";
import { ProtectedRoute } from "../protected-route/protected-route";
import {
  FORGOT_PATH,
  ForgotPasswordPage,
  HOME_PATH,
  HomePage,
  LOGIN_PATH,
  LoginPage,
  PROFILE_PATH,
  REGISTER_PATH,
  RESET_PATH,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  FeedPage,
  FEED_PATH,
  ProfileOrdersPage,
  ORDER_PATH,
  PROFILE_ORDERS_PATH
} from "../../pages";
import ProfileInfo from "../../pages/profile/profile-info";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileData } from "../../services/actions/profile/get-profile-data";


function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getProfileData()), [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;
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

        <Route path="ingridients/:id" element={<IngredientDetails />} />

        <Route path={ORDER_PATH} element={<ProtectedRoute>
          <Modal>
            <OrderDetails />
          </Modal>
        </ProtectedRoute>} />

        <Route path={PROFILE_PATH} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
          <Route path={PROFILE_PATH} element={<ProfileInfo />} />
          <Route path={PROFILE_ORDERS_PATH} element={<ProfileOrdersPage />} />
        </Route>

        <Route path={FEED_PATH} element={<FeedPage />} />

      </Routes>

      {background &&
        <Routes>
          <Route path={ORDER_PATH} element={<ProtectedRoute><Modal>
            <OrderDetails />
          </Modal>
          </ProtectedRoute>} />
          <Route path="ingridients/:id" element={<Modal title={'Детали ингридиента'}>
            <IngredientDetails />
          </Modal>}
          />
        </Routes>
      }

    </div>
  );
}

export default App;
