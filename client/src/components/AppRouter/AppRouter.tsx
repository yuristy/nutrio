import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { IUserAuthInfo } from '../../interfaces';
import { publicRoutes, privateRoutes } from '../../router';
import { NotFound } from '../NotFound/NotFound';

export const AppRouter = () => {
    const isAuth = useSelector(
        (state: IUserAuthInfo) => state.authInfo.isAuthenticated
    );

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.element />}
                    key={route.path}
                />
            ))}
            <Route path='*' element={<NotFound/>} />
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
            <Route path='*' element={<NotFound/>} />
        </Routes>
    );
};
