//styles
import appStyles from './app.module.css';
//react, redux, router
import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
//components
import AppHeader from "../app-header/app-header";
import ProtectedUserRoute from "../protected-user-route/protected-user-route";
import ProtectedRoute  from "../protected-route/protected-route";
import ProfileInfo from "../../pages/profile/profile-info";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
//constants, pages
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
  PROFILE_ORDERS_PATH,
  INGREDIENTS_DETAILS_PATH

} from "../../pages";
//actions
import { getProfileData } from "../../services/actions/profile/get-profile-data";
import { getIngredients, resetCurrentIngredientActionCreator } from "../../services/actions/burger-ingredients";


const App:FC = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseIngredientDetails = useCallback(() => {
    dispatch(resetCurrentIngredientActionCreator());
    navigate(-1);
  }, [dispatch]);

  const handleCloseOrderDetails = useCallback(() => {    
    navigate(-1);
  }, [dispatch]);


  useEffect(() => {
    dispatch(getProfileData() as any);
    dispatch(getIngredients() as any)
  }, [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={HOME_PATH} element={<HomePage />} />

        {/*  Protected user pages  */}
        <Route path={LOGIN_PATH} element={<ProtectedUserRoute><LoginPage /></ProtectedUserRoute>} />
        <Route path={REGISTER_PATH} element={<ProtectedUserRoute><RegisterPage /></ProtectedUserRoute>} />
        <Route path={FORGOT_PATH} element={<ProtectedUserRoute><ForgotPasswordPage /></ProtectedUserRoute>} />
        <Route path={RESET_PATH} element={<ProtectedUserRoute><ResetPasswordPage /></ProtectedUserRoute>} />

        <Route path={INGREDIENTS_DETAILS_PATH} element={<IngredientDetails />} />

        <Route path={ORDER_PATH} element={<ProtectedRoute>
          <Modal onClose={handleCloseOrderDetails}>
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
          <Route path={ORDER_PATH} element={<ProtectedRoute><Modal >
            <OrderDetails />
          </Modal>
          </ProtectedRoute>} />
          <Route path={INGREDIENTS_DETAILS_PATH} element={<Modal onClose={handleCloseIngredientDetails} title={'Детали ингредиента'}>
            <IngredientDetails />
          </Modal>}
          />
        </Routes>
      }

    </div>
  );
}

export default App;