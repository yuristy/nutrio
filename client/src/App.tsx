import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOverlay } from '@mantine/core';
import './App.scss';
import { doCheckAuth } from './store/sagas/authSaga/actions';
import { IUiInfo } from './interfaces';

import AuthRegForm from './components/AuthForm/AuthRegForm/AuthRegForm';
import AuthLoginForm from './components/AuthForm/AuthLoginForm/AuthLoginForm';
import Welcome from './components/Welcome/Welcome';

const App: FC = () => {
    const dispatcher = useDispatch();
    const isUILoading = useSelector((state: IUiInfo) => state.uiInfo.isUILoading)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatcher(doCheckAuth());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isUILoading) return (
        <LoadingOverlay visible={isUILoading}/>
    )

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/registration" element={<AuthRegForm />} />
                <Route path="/login" element={<AuthLoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;
