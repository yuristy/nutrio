import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { doLogout } from '../../store/sagas/authSaga/actions';

import './Welcome.scss';

const Welcome: FC = () => {
    const dispatcher = useAppDispatch();
    const isAuthenticated = useAppSelector(
        (state) => state.authInfo?.isAuthenticated
    );

    const handleClick = async () => {
        dispatcher(doLogout());
    };
    const { isLogoutLoading } = useAppSelector((state) => state.uiInfo);

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
