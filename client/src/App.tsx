import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { setUserInfo } from './store/reducers/authReducer/authActions';

import AuthRegForm from './components/AuthForm/AuthRegForm/AuthRegForm';
import AuthLoginForm from './components/AuthForm/AuthLoginForm/AuthLoginForm';
import Welcome from './components/Welcome/Welcome';

const App: FC = () => {
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
