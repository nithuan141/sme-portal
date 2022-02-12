import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {
    CoursePage,
    InvestorPage,
    LoginPage
} from './src/pages';
import { PrivateRoute } from './src/PrivateRoute';
import './src/public/css/aos.css'
import './src/public/css/bootstrap.min.css'
import './src/public/css/style.css'

const App = () => {
    return (
        <HashRouter>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/course" componet={CoursePage} />
            <PrivateRoute exact path="/investor" componet={InvestorPage} />
        </HashRouter>
    );
}
export default App