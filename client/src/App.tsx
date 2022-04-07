import { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import { useAppSelector, useAppDispatch } from './hooks';
import { doCheckAuth } from './store/sagas/authSaga/actions';
import { AppRouter } from './components/AppRouter/AppRouter';
import './App.scss';

const App: FC = () => {
    const dispatcher = useAppDispatch();
    const { isUILoading } = useAppSelector((state) => state.uiInfo);

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
