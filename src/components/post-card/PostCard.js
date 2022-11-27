import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {GoUnverified,GoVerified} from 'react-icons/go';
import {BsBookmark} from 'react-icons/bs';
import {BiTime,BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';

const PostCard = ({data,setToggle,toggle,setModalDT}) => {

    const {carInfo,location,firstName,postOwnerInfo,postedTime,resalePrice,sellCarImg,usedTime,} = data;

    const shortlocation = location.roadNo+', '+location.area+', '+location.city;

    const bgImage = {
        backgroundImage: 
        `url(${sellCarImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div className={`border mx-[3%] sm:mx-[10%] pb-3 lg:pb-0 shadow-md bg-whiteCard rounded-t-md lg:rounded-l-md my-[3%] lg:mr-[5%] lg:mx-0`}>
            
            {/* Card Content Middle */}
            <div className={`grid grid-cols-1 lg:grid-cols-5 justify-center items-center`}>

                {/* Post Thumbnail */}
                <div style={bgImage} className={`object-cover col-span-2 rounded-t-md lg:rounded-r-none lg:rounded-l-md h-[300px] max-h-fit`}>

                </div>

                <section className={` px-3 lg:col-span-3`}>

                    {/* Time And Bookmark */}
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center p-1 lg:p-0`}>
                            <BiTime className={`text-2xl p-0.5 inline`}></BiTime>
                            <p>{postedTime}</p>
                        </div>
                        <BsBookmark className={`text-2xl p-1 cursor-pointer`}></BsBookmark>
                    </div>

                    {/* Post Info */}
                    <div>
                        <h3 className={`text-2xl font-medium text-center my-1.5`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>
                        <p className={`text-center`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    {/* Price */}
                    <ul className={`flex text-center justify-center gap-x-4 items-center my-2`}>
                        <li>Original ${carInfo.originalPrice}</li>
                        <li>resale ${resalePrice}</li>
                    </ul>

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
                    <div className={`text-center`}>
                        <PrimaryButton onClick={()=>{
                            setModalDT(data)
                            setToggle(!toggle)
                            }} className={''}>Book Now</PrimaryButton>
                    </div>

                    {/* Post owner Info */}
                    <div className={`flex justify-center border-t py-1 gap-x-4 items-center`}>
                        <div className={`w-[10%] rounded-[50%]`}>
                            <img className={`rounded-[50%]`} src={postOwnerInfo.photo} alt="Pisr Author Avatar" />
                        </div>
                        <div className={`flex flex-col justify-center`}>
                            <div className={`flex items-center justify-center gap-x-2`}>
                            <p>{postOwnerInfo.name}</p>
                                {
                                    postOwnerInfo.varified ?
                                    <GoVerified className={`text-blue-600`}></GoVerified>
                                    : <GoUnverified></GoUnverified>
                                }
                            </div>
                            <p>{postOwnerInfo.email}</p>
                            <p>{postOwnerInfo.phoneNumber}</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PostCard;