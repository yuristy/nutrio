import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doRegistration } from '../../store/sagas/authSaga/actions';

import './AuthForm.sass';
import { IAuthInfo } from '../../interfaces';

const AuthForm = () => {
    const dispatcher = useDispatch();

    const [formValue, setFormValue] = useState<IAuthInfo>({
        email: '',
        password: '',
    });

    // const {email, password} = formValue;
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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    className="form-control"
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formValue.email}
                    aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                    Мы ни с кем не поделимся вашей почтой.
                </small>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">
                    Пароль
                </label>
                <input
                    className="form-control"
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="on"
                    value={formValue.password}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Отправить
            </button>
        </form>
    );
};

export default AuthForm;
