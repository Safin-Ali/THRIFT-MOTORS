import React, { useState } from 'react';
import brandLogo from '../../images/brand-logo.png';
import {HiBars3BottomLeft} from 'react-icons/hi2';
import {ImUserPlus} from 'react-icons/im';
import {FiLogOut} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [expand,setCollapse] = useState(false);

    const expandCollapse = () => setCollapse(!expand);

    const resNavbarExpandStyle = {
    transition:'height 0.3s linear',
    height: `${expand ? '200px' : '0px'}`
    }

    return (
        <section>
            <nav className={`flex shadow-md justify-between items-center flex-wrap px-2 sm:container sm:mx-auto`}>

                {/* Brand Image / Text */}
                <div>
                    <img className={`w-11/12`} src={brandLogo} alt="Brand Logo" />
                </div>

                {/* Expand Bar Icon */}
                <div className={`lg:hidden order-3 lg:order-none`}>
                    <HiBars3BottomLeft onClick={expandCollapse} className={`text-3xl`}></HiBars3BottomLeft>
                </div>

                {/* Navlink */}
                <div style={resNavbarExpandStyle} className={`order-4 bg-white overflow-hidden lg:-order-none flex justify-center text-center flex-col basis-full`}>
                    <NavLink className={`text-blackSA border-b pb-2 my-2 block mx-2`}>Home</NavLink>
                    <NavLink className={`text-blackSA border-b pb-2 my-2 block mx-2`}>About</NavLink>
                    <NavLink className={`text-blackSA border-b pb-2 my-2 block mx-2`}>Advertise</NavLink>
                    <NavLink className={`text-blackSA border-b pb-2 my-2 block mx-2`}>Shop</NavLink>
                </div>

                {/* User Avatar */}
                <div className={`order-2 lg:order-none`}>
                    <ImUserPlus className={`text-2xl text-blackSA`}></ImUserPlus>
                    <FiLogOut className={`text-2xl hidden text-blackSA`}></FiLogOut>
                </div>

            </nav>
        </section>
    );
};

export default Navbar;