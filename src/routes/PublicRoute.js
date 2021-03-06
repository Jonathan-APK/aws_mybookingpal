import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            sessionStorage.getItem('isLogged') === 'true' && restricted ?
                sessionStorage.getItem('userRole') === "facility_owner" ? <Redirect to="/dashboard" /> : <Redirect to="/userdashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;