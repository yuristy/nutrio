import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUserAuthInfo, IUiInfo } from '../../interfaces';
import { Button } from '@mantine/core';
import { doLogout } from '../../store/sagas/authSaga/actions';

import './Welcome.scss';

const Welcome: FC = () => {
    const dispatcher = useDispatch();
    const isAuthenticated = useSelector(
        (state: IUserAuthInfo) => state.authInfo.isAuthenticated
    );

    const handleClick = async () => {
        dispatcher(doLogout());
    };
    const isLogoutLoading = useSelector(
        (state: IUiInfo) => state.uiInfo.isLogoutLoading
    );

    if (!isAuthenticated) {
        return (
            <div className="wrapper__welcome">
                <div className="welcome__buttons">
                    <Link to="/login">
                        <Button color="violet">Войти</Button>
                    </Link>
                    <Link to="/registration">
                        <Button color="violet" variant="outline">
                            Регистрация
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="wrapper__welcome">
            {isAuthenticated && (
                <Button
                    color="violet"
                    loading={isLogoutLoading}
                    onClick={handleClick}
                >
                    Выйти
                </Button>
            )}
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
