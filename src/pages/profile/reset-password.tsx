import styles from "./profile.module.css";

import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { resetPasswordThunk } from "../../services/actions/profile/reset-password"
import { useState, useEffect, FC, FormEventHandler } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FORGOT_PATH, LOGIN_PATH } from "../pages-paths";
import { ResetPasswordStatus } from "../../types/profile-types";
import { useAppDispatch, useAppSelector } from "../../types/app-redux-thunk";

export const ResetPasswordPage:FC = () => {
    const { user: { resetStatus: passwordReset } } = useAppSelector(store => store.profile);

    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (password === "" || token === "") {
            return;
        }

        dispatch(resetPasswordThunk(password, token)as any);
    }


    useEffect(() => {
        if (passwordReset === ResetPasswordStatus.Finish)
            navigate(LOGIN_PATH, { state: { resetPassword: false } });
        
    }, [passwordReset]);

    useEffect(() => {
        if (!location.state?.resetPassword) {
            navigate(FORGOT_PATH, { state: { resetPassword: false } })
        }

    }, [location.state, navigate])


    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Восстановление пароля</h1>
            <PasswordInput
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={"Введите новый пароль"}
                extraClass="mt-6"
                icon={"ShowIcon"}
            />
            <Input
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder={"Введите код из письма"}
                extraClass="mt-6"
            />
            <Button htmlType="submit" size="medium" extraClass="mt-6">Сохранить</Button>
            <div className={styles.block}>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text} >Вспомнили пароль?</p>
                    <Link to={LOGIN_PATH} className={styles.link2}>Войти</Link>
                </div>
            </div>
        </form >
    )
}