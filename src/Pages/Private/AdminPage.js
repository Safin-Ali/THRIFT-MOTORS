import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAddShoppingCart,MdReportProblem } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { Link, Navigate, Outlet,} from 'react-router-dom';
import LeftNav from '../../components/Dashboard/LeftNav';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { AuthUser } from '../../Context/AuthContext';
import AutoLogOut from '../../Hook/AutoLogOut';
import { useCurrUserInfo } from '../../Hook/useCurrUserInfo';


const AdminPage = () => {

    const {userData,loading} = useContext(AuthUser);

    const currUserInfo = useCurrUserInfo();

    if(loading) return <LoadingSpinner></LoadingSpinner>;

    if(!userData) return <Navigate to={'/'}></Navigate>;

    if(!localStorage.getItem('jwt-token')) {
        AutoLogOut()
        return <Navigate to={`/error401`}></Navigate>
    };

    if(!currUserInfo) return <LoadingSpinner></LoadingSpinner>;
    
    if(currUserInfo?.userRole !== 'admin') return <Navigate to={'/*'}></Navigate>;
    

    return(
        <section>
            <div className={`grid grid-cols-1 lg:grid-cols-5`}>

                {/* Side Nav */}
                <LeftNav className={`lg:w-full text-center border-r`}>
                    <section className={`my-5 border-b pb-3`}>
                            <Link className={`col-span-2`} to={`/dashboard/all-sellers`}>
                                <AiOutlineShoppingCart className={`text-xl inline-block mr-1`}></AiOutlineShoppingCart> All Seller
                            </Link>
                    </section>

                    <section className={`my-5 border-b pb-3`}>
                            <Link className={`col-span-2`} to={`/dashboard/all-buyers`}><FaUserTie className={`text-xl inline-block mr-1`}></FaUserTie> All Buyers</Link>
                    </section>

                    <section className={`my-5 border-b pb-3`}>
                            <Link className={`col-span-2`} to={`/dashboard/all-reported-post`}><MdReportProblem className={`text-xl inline-block mr-1`}></MdReportProblem> All Reported Post</Link>
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

export default AdminPage;