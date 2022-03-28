import React, { useState, FC, useCallback, useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { At, Key, Lock } from 'tabler-icons-react';

import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { doLogin } from '../../../store/sagas/authSaga/actions';

import { IAuthInfo, IUserAuthInfo, IUiInfo } from '../../../interfaces';

const AuthLoginForm: FC = () => {
    const dispatcher = useDispatch();
    const isAuthenticated = useSelector(
        (state: IUserAuthInfo) => state.authInfo.isAuthenticated
    );

    const isLoginLoading = useSelector(
        (state: IUiInfo) => state.uiInfo.isLoginLoading
    );
    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
    });

    const [formValue, setFormValue] = useState<IAuthInfo>({
        email: '',
        password: '',
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatcher(doLogin(formValue));
        },
        [dispatcher, formValue]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormValue((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                };
            });
        },
        []
    );

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        icon={<At />}
                        placeholder="Ваша почта"
                        label="Ваша почта"
                        className="form-control"
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formValue.email}
                        aria-describedby="emailHelp"
                        mb={10}
                    />
                </div>
                <div>
                    <PasswordInput
                        icon={<Lock />}
                        placeholder="Пароль"
                        label="Пароль"
                        className="form-control"
                        onChange={handleChange}
                        id="password"
                        name="password"
                        required
                        autoComplete="on"
                        value={formValue.password}
                        mb={10}
                    />
                </div>
                <Button
                    // leftIcon={<Key size={18} />}
                    loading={isLoginLoading}
                    type="submit"
                    variant="gradient"
                    gradient={{ from: 'violet', to: 'grape', deg: 105 }}
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};

// function mapStateToProps(state) {
// const {isAuthenticated} = state;
// return { isAuthenticated: true }
// }

export default AuthLoginForm;
// export default connect(mapStateToProps)(AuthLoginForm)
