import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link, Navigate, Outlet,} from 'react-router-dom';
import LeftNav from '../../components/Dashboard/LeftNav';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { AuthUser } from '../../Context/AuthContext';
import AutoLogOut from '../../Hook/AutoLogOut';


const UserPage = () => {

    const {currUserInfo,userData,loading,} = useContext(AuthUser);

    if(loading) return <LoadingSpinner></LoadingSpinner>;

    if(!userData) return <Navigate to={'/'}></Navigate>;    

    if(!localStorage.getItem('jwt-token')) return AutoLogOut();

    if(!currUserInfo) return <LoadingSpinner></LoadingSpinner>;
    
    if(currUserInfo?.userRole !== 'user') return <Navigate to={'/*'}></Navigate>;

    return(
        <section>
            <div className={`grid grid-cols-1 lg:grid-cols-5`}>

                {/* Side Nav */}
                <LeftNav className={`lg:w-full text-center border-r`}>
                    <section className={`my-5 border-b pb-3`}>
                            <Link className={`col-span-2`} to={`/dashboard/my-orders`}>
                                <AiOutlineShoppingCart className={`text-xl inline-block mr-1`}></AiOutlineShoppingCart> My Orders
                            </Link>
                    </section>
                </LeftNav>

                {/* Dashboard Content */}
                <div className={`lg:col-span-4`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    )
};

export default UserPage;