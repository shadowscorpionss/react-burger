import styles from "./profile.module.css";
import { userRegistration } from "../../services/actions/profile/user-registration";
import { useForm } from "../../hooks/useForm";

import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { LOGIN_PATH } from "../pages-paths";


export const RegisterPage = () => {
    const { formValues, handleInputsChange } = useForm({ name: "", email: "", password: "", });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const vals= Object.values(formValues);
        console.log(vals);
        if (vals.some(el=> el===""))
            return;

        
        dispatch(userRegistration(
            formValues.email,
            formValues.password,
            formValues.name
        ))

    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.wrapper} pl-2`}>
            <h1>Регистрация</h1>
            <Input
                name="name"
                value={formValues.name}
                onChange={(e) => handleInputsChange(e)}
                placeholder={"Имя"}
                extraClass="mt-6"
            />
            <EmailInput
                name="email"
                value={formValues.email}
                onChange={(e) => handleInputsChange(e)}
                placeholder={"E-mail"}
                extraClass="mt-6"
            />
            <PasswordInput
                name="password"
                value={formValues.password}
                onChange={(e) => handleInputsChange(e)}
                placeholder={"Пароль"}
                extraClass="mt-6"
                icon={"ShowIcon"}
            />
            <Button htmlType="submit" size="medium" extraClass="mt-6">Зарегистрироваться</Button>
            <div className={styles.block}>
                <div className={`${styles.inner} mt-4`} >
                    <p className={styles.text}>Уже зарегистрированы?</p>
                    <Link to={LOGIN_PATH} className={styles.link2}>Войти</Link>
                </div>
            </div>
        </form >
    )
}