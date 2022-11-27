import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {GoUnverified,GoVerified} from 'react-icons/go';
import {BsBookmark} from 'react-icons/bs';
import {BiTime,BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';

const MyProduct = ({data,handleDeleteProduct,advertiseProduct}) => {

    const {carInfo,location,paid,advertise,_id,postOwnerInfo,postedTime,resalePrice,sellCarImg,serviceId,usedTime} = data;

    const shortlocation = location.roadNo+', '+location.area+', '+location.city+', '+location.country;

    const bgImage = {
        backgroundImage: 
        `url(${sellCarImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }


    return (
        <div className={`border shadow-md rounded-t-md my-[3%]`}>
            
            {/* Card Content Middle */}
                <div>
                {/* Post Thumbnail */}
                <div style={bgImage} className={`object-cover col-span-2 rounded-t-md h-[300px] max-h-fit`}>
                </div>

                <section className={`p-5`}>                    
                    {/* Time And Bookmark */}
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center p-1 lg:p-0`}>
                            <BiTime className={`text-2xl p-0.5 inline`}></BiTime>
                            <p>{postedTime}</p>
                        </div>
                    </div>

                    {/* Post Info */}
                    <div>
                        <h3 className={`text-2xl font-medium text-center my-1.5`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>
                        <p className={`text-center`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    {/* Price */}
                    <div className={`flex text-center justify-center gap-x-4 items-center my-2`}>
                        <p className={`p-1 text-sm rounded-md bg-common hover:shadow-lg`}>Original price: ${carInfo.originalPrice}</p>
                        <p className={`p-1 text-sm rounded-md bg-primaryRed text-white hover:shadow-lg`}>Resale price: ${resalePrice}</p>
                    </div>

                    {/* Location */}
                    <div className={`flex capitalize gap-x-5 items-center justify-center`}>
                        <div className={`flex gap-x-2 items-center`}>
                            <GoLocation></GoLocation>
                            <p>{shortlocation}</p>
                        </div>
                        <div className={`flex gap-x-2 items-center`}>
                            <BiWorld></BiWorld>
                            <p>{location?.country}</p>
                        </div>
                    </div>
                    {/* Book Now Button */}
                    <div className={`flex gap-5`}>
                        <PrimaryButton onClick={()=>advertiseProduct(_id,postOwnerInfo.email)} className={'w-full'} disabled={advertise}>{advertise?'Advertised':'Advertise'}</PrimaryButton>
                        <PrimaryButton onClick={()=>handleDeleteProduct(_id,postOwnerInfo.email)} className={'w-full'}>DELETE</PrimaryButton>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default MyProduct;