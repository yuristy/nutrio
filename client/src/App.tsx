import { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOverlay } from '@mantine/core';
import './App.scss';
import { doCheckAuth } from './store/sagas/authSaga/actions';
import { IUiInfo } from './interfaces';
import { AppRouter } from './components/AppRouter/AppRouter';

const App: FC = () => {
    const dispatcher = useDispatch();
    const isUILoading = useSelector(
        (state: IUiInfo) => state.uiInfo.isUILoading
    );

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatcher(doCheckAuth());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isUILoading) return <LoadingOverlay visible={isUILoading} />;

    return (
        <Router>
            <AppRouter />
        </Router>
    );
};

export default App;
