import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
    UserPage, LoginPage, DashBoard,
    CoursePage, InvetsmentPage, ProfitPage
} from './src/pages';
import PrivateRoute from './PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import './src/components/Shared/Table.css'

const App = () => {
    return (
        <HashRouter>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/users" component={UserPage} />
            <PrivateRoute exact path="/home" component={DashBoard} />
            <PrivateRoute exact path="/course" component={CoursePage} />
            <PrivateRoute exact path="/investment" component={InvetsmentPage} />
            <PrivateRoute exact path="/profit" component={ProfitPage} />
            <ToastContainer />
        </HashRouter>
    );
}
export default App