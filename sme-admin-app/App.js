import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {
    UserPage, LoginPage, DashBoard,
    CoursePage, InvetsmentPage, ProfitPage
} from './src/pages';
import './src/components/Shared/Table.css'

const App = () => {
    return (
        <HashRouter>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/users" component={UserPage} />
            <Route exact path="/home" component={DashBoard} />
            <Route exact path="/course" component={CoursePage} />
            <Route exact path="/investment" component={InvetsmentPage} />
            <Route exact path="/profit" component={ProfitPage} />
        </HashRouter>
    );
}
export default App