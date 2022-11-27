import React, { useContext,useState } from 'react';
import brandLogo from '../../images/brand-logo.png';
import {HiMenuAlt3} from 'react-icons/hi';
import {ImUserPlus} from 'react-icons/im';
import {FiLogOut} from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Context/AuthContext';

const Navbar = () => {

    // use AuthContext For User Data
    const {logOut,userData,currUserInfo} = useContext(AuthUser);

    console.log(currUserInfo)

    // navbar expand small devices when "expand" is true
    const [expand,setCollapse] = useState(false);

    // toggle navbars expand and collapse in this function
    const expandCollapse = () => setCollapse(!expand);

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // get current location Object data in this hook
    const location = useLocation();

    const resNavbarExpandStyle = {
        transition:'all 0.3s linear'
    }

    let dashPath;

    if(currUserInfo?.userRole === 'user') dashPath = '/my-orders';
    if(currUserInfo?.userRole === 'seller') dashPath = `/my-product/${userData?.email}`;
    if(currUserInfo?.userRole === 'admin') dashPath = '/all-sellers';

    // intrigate login / signup page by this function
    const handleAuthDir = (path) => {
        
    // store route path when you req another route and goto next route path
    location['from'] = location.pathname;
    navigate(path);
    };

    // logout authuser by this function
    const handleLogout = () => {
        logOut()
        .then(() => localStorage.removeItem('jwt-token'))
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
                <div style={resNavbarExpandStyle} className={`order-4 bg-white md:bg-inherit overflow-hidden md:order-none flex items-center justify-center ${expand ? 'min-h-[200px] max-h-fit' : 'h-0'} text-center flex-col md:h-fit md:flex-row basis-full md:basis-auto`}>
                    <NavLink to={'/'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Home</NavLink>

                    {/* show that when current user role "user" */}
                    {
                        currUserInfo?.userRole === 'user'
                        && <NavLink to={'/myorders'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>My Orders</NavLink>
                    }
                    { 

                    userData?.email
                     &&
                    <NavLink to={`/dashboard${dashPath}`} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Dashboard</NavLink>

                    }

                    <NavLink to={'/*'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>SHOP</NavLink>

                    <NavLink to={'/blogs'} className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block mx-2`}>Blogs</NavLink>
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