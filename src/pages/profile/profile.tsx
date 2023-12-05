//styles
import styles from "./profile.module.css";
//react, router, redux
import { NavLink, Outlet } from "react-router-dom";
import { FC, MouseEventHandler } from "react";
//constants
import { LOGIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH } from "../pages-paths";
//actions
import { userLogoutThunk } from "../../services/actions/profile/user-logout";
import { useAppDispatch } from "../../types/app-redux-thunk";


export const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();

    const logOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
        dispatch(userLogoutThunk() as any);
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