import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../misc/AuthContext';

const PrivateRoute = (props) => {
    const contextType = React.useContext(AuthContext);

    return contextType.userIsAuthenticated() ? props.child : <Navigate to="/login" replace />;
}

export default PrivateRoute;