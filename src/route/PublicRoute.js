import React from 'react';
import { useNavigate, Route} from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PublicRoute = ({ component: Component, ...rest}) => {
    const navigate = useNavigate();
    
    return (
        <Route
            {...rest}
            render={props=>{
                return !getToken() ? <Component {...props} />
                : navigate('/dashboard')
            }}
        />
    );
}

export default PublicRoute;