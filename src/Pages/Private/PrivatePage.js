import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { AuthUser } from '../../Context/AuthContext';

const PrivatePage = ({children}) => {

    // use AuthContext For User Data
    const {loading,userData,JWTToken} = useContext(AuthUser);

    // get current location Object data in this hook
    const location = useLocation();

    // if JWt Token Not then User Redirect to login page
    if(!JWTToken) return <Navigate state={location.pathname} to={`/login`}></Navigate>

    // waiting for user information
    if(loading) return <LoadingSpinner></LoadingSpinner>;

    // if the user not found
    if(!userData) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
        
    return children


};

export default PrivatePage;