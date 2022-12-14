import React, { useContext, useEffect,} from 'react';
import {useForm} from 'react-hook-form';
import {IoClose} from 'react-icons/io5'
import { AuthUser } from '../../Context/AuthContext';
import PrimaryButton from '../primary-button/PrimaryButton';

const BookProductModal = ({toggle,setToggle,modalDT,handleBooked}) => {
    
    const {userData} = useContext(AuthUser);

    const {postOwnerInfo,resalePrice,title} = modalDT;

    // reset form after the toggle boolean false
    useEffect(()=>{
        toggle || reset()
    },[toggle])

    // get form all value oin object
    const {register,handleSubmit,reset} = useForm();
    
    return (
        <div className={`text-white w-[90%] sm:w-[80%] lg:w-auto lg:p-[2%] ${toggle ? 'block' : 'hidden'} fixed rounded-md left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 top-1/2`}>
            <div className={`flex p-4 text-center justify-between items-center`}>
                <h5 className={`sm:text-3xl`}>{title}</h5>
                <IoClose onClick={()=> setToggle(!toggle)} className={`text-2xl cursor-pointer`}></IoClose>
            </div>

            {/* form page */}
            <form onSubmit={handleSubmit(handleBooked)}>
                <div className={`grid grid-cols-1 sm:grid-cols-2 justify-center gap-x-5`}>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="text" defaultValue={postOwnerInfo?.name || ''} readOnly/></div>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="email" defaultValue={postOwnerInfo?.email || ''} readOnly/></div>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="text"
                     value={`$${Math.ceil(resalePrice)}`} readOnly/></div>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="text" defaultValue={userData?.displayName} readOnly/></div>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="text" placeholder={`Your number`} {...register('contactNumber')} required/></div>
                    <div className={`my-2 col-span-1 mx-auto`}><input className={`p-1 sm:p-2 rounded-md focus:outline-none focus:border-2 focus:border-common text-blackSA`} type="text" placeholder={`your location`} {...register('location')} required/></div>
                    <div className={`my-2 col-span-1 mx-auto text-center sm:col-span-2`}><PrimaryButton>SUBMIT</PrimaryButton></div>
                </div>
            </form>
        </div>
    );
};

export default BookProductModal;