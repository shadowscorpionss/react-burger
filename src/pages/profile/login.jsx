import styles from "./profile.module.css";
import { userLogin } from "../../services/actions/profile/user-login";

import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PATH, REGISTER_PATH } from "../pages-paths";


export function LoginPage() {
    const { loginErrorMessage, hasLoginError } = useSelector(store => store.profile);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            return;
        }

        dispatch(userLogin(email, password));
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Вход</h1>
            <EmailInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={"E-mail"}
                extraClass="mt-6"
            />
            <PasswordInput
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={"Пароль"}
                extraClass="mt-6"
                icon={"ShowIcon"}
            />

            {hasLoginError && (<p className="mt-4 " >  {loginErrorMessage}</p>)}

            <Button htmlType="submit" size="medium" extraClass="mt-6">Войти</Button>

            <div className={styles.block}>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text} >Вы — новый пользователь?</p>
                    <Link to={REGISTER_PATH} className={styles.link}>Зарегистрироваться</Link>
                </div>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text}>Забыли пароль?</p>
                    <Link to={FORGOT_PATH} className={styles.link}>Восстановить пароль</Link>
                </div>
            </div>
        </form >
    )
}
