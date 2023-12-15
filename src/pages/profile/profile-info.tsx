//styles
import styles from './profile.module.css'
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from 'react';

//components
import { Input, EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//actions
import { changeUserDataThunk } from '../../services/actions/profile/change-user-data';
//types

//custom hook
import { useForm } from '../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';


const ProfileInfo: FC = () => {
    const [isBottonsOpen, setIsBottonsOpen] = useState(false);
    const [nameEditDisabled, setNameEditDisabled] = useState(true);
    const user = useAppSelector((state) => state.profile.user);
    const { values, handleChange, setValues } = useForm({
        name: user.name,
        email: user.email,
        password: '',
    });

    useEffect(() => {
        cancelInput();
    }, [user]);


    const dispatch = useAppDispatch();

    const cancelInput = () => {
        setValues({
            name: user.name,
            email: user.email,
            password: '',
        })
        setIsBottonsOpen(false);
        setNameEditDisabled(true);
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (values.email + values.name + values.password === '')
            return;

        dispatch(changeUserDataThunk(            
            values.email,
            values.password,
            values.name
        ) );
    }

    const changeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setIsBottonsOpen(true);
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.inputs} ml-15`}>
            <Input
                disabled={nameEditDisabled}
                name="name"
                value={values.name}
                onChange={changeInputs}
                placeholder="Имя"
                extraClass="mt-6"
                icon="EditIcon"
                onIconClick={e => setNameEditDisabled(!nameEditDisabled)}
            />
            <EmailInput
                name="email"
                value={values.email}
                onChange={changeInputs}
                placeholder={"E-Mail"}
                extraClass="mt-6"
                isIcon={true}
            />
            <PasswordInput
                name="password"
                value={values.password}
                onChange={changeInputs}
                placeholder="Пароль"
                extraClass="mt-6"
                icon="ShowIcon"
            />
            {isBottonsOpen &&
                <div className={`${styles.inner} mt-8`}>
                    <Button
                        onClick={cancelInput}
                        type="secondary"
                        htmlType="button"
                        size="medium"
                    >
                        Отмена
                    </Button>
                    <Button htmlType="submit" size="medium">
                        Coхранить
                    </Button>
                </div>
            }
        </form>
    )
}

export default ProfileInfo;