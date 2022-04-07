import React, { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { At, Lock, Check } from 'tabler-icons-react';
import { doRegistration } from '../../../store/sagas/authSaga/actions';

import { IAuthInfo } from '../../../interfaces';

const AuthRegForm: FC = () => {
    const dispatcher = useAppDispatch();
    const isAuthenticated = useAppSelector(
        (state) => state.authInfo?.isAuthenticated
    );

    const [formValue, setFormValue] = useState<IAuthInfo>({
        email: '',
        password: '',
    });

    const { isRegLoading } = useAppSelector((state) => state.uiInfo);

    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatcher(doRegistration(formValue));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        icon={<At />}
                        placeholder="Ваша почта"
                        label="Ваша почта"
                        description="Мы ни с кем не поделимся Вашей почтой."
                        className="form-control"
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formValue.email}
                        mb={10}
                    />
                </div>
                <div>
                    <PasswordInput
                        icon={<Lock />}
                        placeholder="Пароль"
                        label="Пароль"
                        description="Должен быть больше 4 и меньше 10 символов"
                        className="form-control"
                        onChange={handleChange}
                        id="password"
                        name="password"
                        required
                        value={formValue.password}
                        mb={10}
                    />
                </div>
                <Button
                    leftIcon={<Check size={18} />}
                    loading={isRegLoading}
                    type="submit"
                    variant="gradient"
                    gradient={{ from: 'violet', to: 'grape', deg: 105 }}
                >
                    Регистрация
                </Button>
            </form>
        </div>
    );
};

export default AuthRegForm;
