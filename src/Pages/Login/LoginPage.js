import React, { useContext } from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { AuthUser } from '../../Context/AuthContext';

const LoginPage = ({children}) => {
    // use AuthContext For User Data
    const {userData,JWTToken} = useContext(AuthUser);

    // get current location Object data in this hook
    const location = useLocation();

    // get requested location
    const from = location.state?location.state : '/';

    // first verify JWT Token Availbale Or Not
    if(!JWTToken) return children;

    if(userData) return <Navigate to={from} ></Navigate>;

    return children;
};

export default LoginPage;