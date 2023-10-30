import styles from "./profile.module.css";

import { NavLink, Outlet } from "react-router-dom";
import { userLogout } from "../../services/actions/profile/user-logout";

import { useDispatch } from "react-redux";
import { LOGIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH } from "../pages-paths";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const logOut = (e) => {
        dispatch(userLogout());
    }

    return (
        <div>
            <div className={`${styles.wrapperCol} pl-2`}>
                <div className={styles.menu}>
                    
                    <NavLink
                        end
                        to={PROFILE_PATH}
                        style={{ textDecoration: 'none' }}
                        className={({ isActive }) =>
                            `${styles.link} p-4 ${isActive ? styles.active : ''}`
                        }>
                        <p className="text text_type_main-medium">Профиль</p>
                    </NavLink>

                    <NavLink
                        end
                        to={PROFILE_ORDERS_PATH}
                        style={{ textDecoration: 'none' }}
                        className={({ isActive }) =>
                            `${styles.link} p-4 ${isActive ? styles.active : ''}`
                        }>
                        <p className="text text_type_main-medium">История заказов</p>
                    </NavLink>

                    <NavLink
                        end
                        onClick={logOut}
                        to={LOGIN_PATH}
                        style={{ textDecoration: 'none' }}
                        className={({ isActive }) =>
                            `${styles.link} p-4 ${isActive ? styles.active : ''}`
                        }>
                        <p className="text text_type_main-medium">Выход</p>
                    </NavLink>

                    <p className={`${styles.text} mt-30`}>
                        В этом разделе вы можете
                        <br />
                        изменить свои персональные данные
                    </p>
                </div>

                <Outlet />

            </div>
        </div >
    )
}