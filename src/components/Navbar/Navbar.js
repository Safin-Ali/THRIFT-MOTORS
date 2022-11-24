import React, { useState } from 'react';
import brandLogo from '../../images/brand-logo.png';
import {HiMenuAlt3} from 'react-icons/hi';
import {ImUserPlus} from 'react-icons/im';
import {FiLogOut} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [expand,setCollapse] = useState(false);

    const expandCollapse = () => setCollapse(!expand);

    const resNavbarExpandStyle = {
    transition:'height 0.3s linear'
    }

    return (
        <section>
            <nav className={`flex shadow-md justify-between items-center flex-wrap px-2 md:px-[5%] lg:px-[4%]`}>

                {/* Brand Image / Text */}
                <div>
                    <img className={`w-11/12 md:w-full`} src={brandLogo} alt="Brand Logo" />
                </div>

                {/* Expand Bar Icon */}
                <div className={`md:hidden order-3 md:order-none`}>
                    <HiMenuAlt3 onClick={expandCollapse} className={`text-3xl`}></HiMenuAlt3>
                    
                </div>

                {/* Navlink */}
                <div style={resNavbarExpandStyle} className={`order-4 bg-white md:bg-inherit overflow-hidden md:order-none flex items-center justify-center ${expand ? 'h-[200px]' : 'h-0'} text-center flex-col md:h-fit md:flex-row basis-full md:basis-auto`}>
                    <NavLink className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Home</NavLink>
                    <NavLink className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>About</NavLink>
                    <NavLink className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block md:mx-2`}>Advertise</NavLink>
                    <NavLink className={`text-blackSA border-b md:border-b-0 pb-2 md:pb-0 my-2 md:my-0 block mx-2`}>Shop</NavLink>
                </div>

                {/* User Avatar */}
                <div className={`order-2 md:order-none`}>
                    <ImUserPlus className={`text-2xl text-blackSA`}></ImUserPlus>
                    <FiLogOut className={`text-2xl hidden text-blackSA`}></FiLogOut>
                </div>

            </nav>
        </section>
    );
};

export default Navbar;