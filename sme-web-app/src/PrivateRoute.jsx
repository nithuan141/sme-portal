import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CoursePage, InvestorPage } from './pages';
import { getLoggedInUser } from './services/user.service';
import { INVESTOR_ROLE, USER_ROLE } from './utils/constants';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = getLoggedInUser();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }

        if(currentUser.role === INVESTOR_ROLE) {
            return <InvestorPage />
        } else if(currentUser.role === USER_ROLE) {
            return <CoursePage />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)