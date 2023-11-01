import styles from "./profile.module.css";
import { forgotPassword } from "../../services/actions/profile/forgot-password";

import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH, RESET_PATH } from "../pages-paths";


export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "") {
            return;
        }

        dispatch(forgotPassword(email));
        navigate(RESET_PATH, { state: { resetPassword: true } });

    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Восстановление пароля</h1>
            <EmailInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={"Укажите e-mail"}
                extraClass="mt-6"
                isIcon={false}
            />
            <Button htmlType="submit" size="medium" extraClass="mt-6">Воccтановить</Button>
            <div className={styles.block}>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text} >Вспомнили пароль?</p>
                    <Link to={LOGIN_PATH} className={styles.link2}>Войти</Link>
                </div>
            </div>
        </form >
    )
}