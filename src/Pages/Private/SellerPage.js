import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link, Navigate, Outlet,} from 'react-router-dom';
import LeftNav from '../../components/Dashboard/LeftNav';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { AuthUser } from '../../Context/AuthContext';
import AutoLogOut from '../../Hook/AutoLogOut';


const SellerPage = () => {

    const {currUserInfo,userData,JWTToken,loading} = useContext(AuthUser);

    if(loading) return <LoadingSpinner></LoadingSpinner>

    if(!userData) return <Navigate to={'/'}></Navigate>

    if(!JWTToken) return AutoLogOut()

    if(!currUserInfo) return <LoadingSpinner></LoadingSpinner>;
    
    if(currUserInfo?.userRole !== 'seller') return <Navigate to={'/*'}></Navigate>

    return(
        <section>
            <div className={`grid grid-cols-5`}>

                {/* Side Nav */}
                <LeftNav className={`px-4 text-center border-r`}>
                    <section className={`my-5`}>
                            <Link className={`col-span-2`} to={`/dashboard/my-product/${currUserInfo.userEmail}`}>
                                <AiOutlineShoppingCart className={`text-xl inline-block mr-1`}></AiOutlineShoppingCart> My Product
                            </Link>
                    </section>

                    <section className={`my-5`}>
                            <Link className={`col-span-2`} to={`/dashboard/add-product`}><MdAddShoppingCart className={`text-xl inline-block mr-1`}></MdAddShoppingCart> Add Product</Link>
                    </section>

                    <section className={`my-5`}>
                            <Link className={`col-span-2`} to={`/dashboard/my-buyers`}>
                                <FaUserTie className={`text-xl inline-block mr-1`}></FaUserTie>My Buyers
                            </Link>
                    </section>
                </LeftNav>

                {/* Dashboard Content */}
                <div className={`col-span-4`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    )
};

export default SellerPage;