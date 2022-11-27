import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { AuthUser } from '../../Context/AuthContext';

const DashboardPage = ({children}) => {
    const {isLoading,currUserInfo,loading} = useContext(AuthUser);

    //  waiting for findout user info
    if(isLoading) return <LoadingSpinner></LoadingSpinner>;

    if(loading) return <LoadingSpinner></LoadingSpinner>;

    if(!currUserInfo) return <Navigate to={`/`}></Navigate>;

    // check user role and then send user req location with her role wise
    if (currUserInfo.userRole === 'admin') {
        return children
    }
    if (currUserInfo.userRole === 'seller') {
        return children
    }
};

export default DashboardPage;