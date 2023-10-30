import styles from "./profile.module.css";
import { userLogin } from "../../services/actions/profile/user-login";

import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PATH, REGISTER_PATH } from "../pages-paths";
import { useForm } from "../../hooks/useForm";


export function LoginPage() {
    const { loginErrorMessage, hasLoginError } = useSelector(store => store.profile);

    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const vals = Object.values(values);
        if (vals.some(el => el === ""))
            return;       

        dispatch(userLogin(values.email, values.password));
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Вход</h1>
            <EmailInput
                name="email"                
                value={values.email}
                onChange={(e) => handleChange(e)}
                placeholder={"E-mail"}
                extraClass="mt-6"
            />
            <PasswordInput
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
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
