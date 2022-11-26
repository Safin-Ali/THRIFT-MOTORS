import React, { useContext,useState } from 'react';
import brandLogo from '../../images/brand-logo.png';
import {HiMenuAlt3} from 'react-icons/hi';
import {ImUserPlus} from 'react-icons/im';
import {FiLogOut} from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Navbar = () => {

    // use AuthContext For User Data
    const {logOut,userData} = useContext(AuthUser);

    // navbar expand small devices when "expand" is true
    const [expand,setCollapse] = useState(false);

    // toggle navbars expand and collapse in this function
    const expandCollapse = () => setCollapse(!expand);

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // get current location Object data in this hook
    const location = useLocation();

    const resNavbarExpandStyle = {
    transition:'height 0.3s linear'
    }

    // get current User role
    const {data:allUsersInfo} = useQuery({
        queryKey: ['User Information',userData?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/userInfo?email=${userData?.email}`);
            return res.data
        }
    })

    // intrigate login / signup page by this function
    const handleAuthDir = (path) => {
        
    // store route path when you req another route and goto next route path
    location['from'] = location.pathname;
    navigate(path);
    };

    // logout authuser by this function
    const handleLogout = () => {
        logOut()
        .then(() => {})
        .catch(e => console.log(e.message))
    }

    return (
        <>
            <nav className={`flex shadow-md justify-between items-center flex-wrap px-2 md:px-[5%] lg:px-[4%]`}>

                {/* Brand Image / Text */}
                <div>
                    <NavLink to={`/`}><img className={`w-11/12 md:w-full`} src={brandLogo} alt="Brand Logo" /></NavLink>
                </div>

                {/* Expand Bar Icon */}
                <div className={`md:hidden order-3 md:order-none`}>
                    <HiMenuAlt3 onClick={expandCollapse} className={`text-3xl`}></HiMenuAlt3>
                    
                </div>

                {/* Navlink */}
                <div style={resNavbarExpandStyle} className={`order-4 bg-white md:bg-inherit overflow-hidden md:order-none flex items-center justify-center ${expand ? 'h-[200px]' : 'h-0'} text-center flex-col md:h-fit md:flex-row basis-full md:basis-auto`}>
                    <NavLink to={'/'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Home</NavLink>

                    {/* show that when current user role "user" */}
                    {
                        allUsersInfo?.userRole === 'user'
                        && <NavLink to={'/myorders'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>My Orders</NavLink>
                    }

                     {/* show that when current user role only "seller" */}
                    {
                        allUsersInfo?.userRole === 'seller' 
                        && <>
                            <NavLink to={'/myorders'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>My Orders</NavLink>
                            <NavLink to={'/add-pruduct'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Add Product</NavLink>
                            <NavLink to={'/my-buyers'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>My Buyers</NavLink>
                        </>
                        
                    }

                    {/* show that when current user role only "seller" */}
                    {
                        allUsersInfo?.userRole === 'admin' 

                        && <>
                            <NavLink to={'/add-sellers'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>All Sellers</NavLink>
                            <NavLink to={'/my-buyers'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>All Buyers</NavLink>
                        </>
                    }
                    
                    <NavLink to={'/'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Advertise</NavLink>
                    <NavLink to={'/'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block mx-2`}>Shop</NavLink>
                </div>

                {/* User Avatar */}
                <div className={`order-2 md:order-none`}>
                    {
                        userData 
                        ? 
                        <FiLogOut onClick={handleLogout} className={`text-2xl text-blackSA cursor-pointer`}></FiLogOut>
                        :
                        <ImUserPlus onClick={()=>handleAuthDir('/login')} className={`text-2xl text-blackSA cursor-pointer`}></ImUserPlus>
                    }
                </div>

            </nav>
        </>
    );
};

export default Navbar;