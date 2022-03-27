import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUserAuthInfo } from '../../interfaces';
import { Button } from '@mantine/core';

import './Welcome.scss';

const Welcome: FC = () => {
    const isAuthenticated = useSelector(
        (state: IUserAuthInfo) => state.authInfo.isAuthenticated
    );

    if (!isAuthenticated) {
        return (
            <div className="wrapper__welcome">
                <div className="welcome__buttons">
                    <Link to="/login">
                        <Button color='violet'>Войти</Button>
                    </Link>
                    <Link to="/registration">
                        <Button color='violet' variant='outline' >Регистрация</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="wrapper__welcome">
            <h1 className="header__welcome header__welcome--bold">
                Добро пожаловать на Nutrio,
            </h1>
            <h2 className="header__welcome header__welcome--semibold">
                Ваш персональный счетчик нутриентов!
            </h2>
        </div>
    );
};

export default Welcome;
