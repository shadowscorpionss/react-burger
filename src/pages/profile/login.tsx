//styles
import styles from "./profile.module.css";
//react, redux
import { useDispatch, useSelector } from "react-redux";
import { FC, FormEventHandler } from "react";
//components
import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
//types
import { IProfileStorage } from "../../types/profile-types";
//constants
import { FORGOT_PATH, REGISTER_PATH } from "../pages-paths";
//actions
import { userLoginThunk } from "../../services/actions/profile/user-login";
//custom hook
import { useForm } from "../../hooks/useForm";

export const LoginPage: FC = () => {
    const { loginErrorMessage, hasLoginError } = useSelector<any, IProfileStorage>(store => store.profile);

    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const vals = Object.values(values);
        if (vals.some(el => el === ""))
            return;

        dispatch(userLoginThunk(values.email, values.password) as any);
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Вход</h1>
            <EmailInput
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder={"E-mail"}
                extraClass="mt-6"
            />
            <PasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder={"Пароль"}
                extraClass="mt-6"
                icon={"ShowIcon"}
            />

            {hasLoginError && (<p className="mt-4 " >  {loginErrorMessage}</p>)}

            <Button htmlType="submit" size="medium" extraClass="mt-6">Войти</Button>

            <div className={styles.block}>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text} >Вы — новый пользователь?</p>
                    <Link to={REGISTER_PATH} className={styles.link2}>Зарегистрироваться</Link>
                </div>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text}>Забыли пароль?</p>
                    <Link to={FORGOT_PATH} className={styles.link2}>Восстановить пароль</Link>
                </div>
            </div>
        </form >
    )
}
