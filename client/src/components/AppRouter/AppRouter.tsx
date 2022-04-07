import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { publicRoutes, privateRoutes } from '../../router';
import { NotFound } from '../NotFound/NotFound';

export const AppRouter: FC = () => {
    const isAuth = useAppSelector((state) => state.authInfo?.isAuthenticated);

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.element />}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.element />}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
