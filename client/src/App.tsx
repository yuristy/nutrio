import React, { FC } from 'react';
import './App.scss';

import AuthForm from './components/AuthForm/AuthForm';

const App: FC = () => {
    return (
        <div className="wrapper">
            <AuthForm />
        </div>
    );
};

export default App;
